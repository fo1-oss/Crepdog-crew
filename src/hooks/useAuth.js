import { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  loginWithEmail, 
  loginWithGoogle, 
  registerWithEmail,
  logout as firebaseLogout, 
  onAuthStateChanged,
  isUserAdmin,
  saveSession,
  saveUserProfile,
  getUserProfile
} from '../services/firebase';

const AuthContext = createContext(null);

// Get user location for session tracking
const getLocationData = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    return await res.json();
  } catch {
    return { city: 'Unknown', country: 'Unknown', ip: 'Unknown' };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(isUserAdmin(firebaseUser.email));

        // Save to localStorage for persistence
        localStorage.setItem('cdc_user', JSON.stringify(userData));

        // Track session
        try {
          const location = await getLocationData();
          await saveSession(firebaseUser.uid, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            location,
            userAgent: navigator.userAgent,
            startTime: new Date().toISOString()
          });
        } catch (err) {
          console.error('Session tracking error:', err);
        }
      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('cdc_user');
        localStorage.removeItem('cdc_token');
        localStorage.removeItem('cdc_refresh_token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/Password login
  const login = async (email, password) => {
    try {
      const firebaseUser = await loginWithEmail(email, password);
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Login failed. Please try again.';
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          message = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password.';
          break;
        case 'auth/invalid-credential':
          message = 'Invalid email or password.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Please try again later.';
          break;
      }
      
      return { success: false, message };
    }
  };

  // Google OAuth login
  const loginGoogle = async () => {
    try {
      const firebaseUser = await loginWithGoogle();
      
      // Save additional profile data to Firestore
      await saveUserProfile(firebaseUser.uid, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        provider: 'google',
        lastLogin: new Date().toISOString()
      });
      
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Google login error:', error);
      let message = 'Google sign-in failed. Please try again.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Pop-up blocked. Please allow pop-ups for this site.';
      }
      
      return { success: false, message };
    }
  };

  // Email/Password registration
  const register = async (data) => {
    try {
      const { email, password, firstName, lastName, company, phone, investorType, investmentSize } = data;
      const displayName = `${firstName} ${lastName}`.trim();
      
      const firebaseUser = await registerWithEmail(email, password, displayName);
      
      // Save user profile to Firestore
      await saveUserProfile(firebaseUser.uid, {
        email,
        displayName,
        firstName,
        lastName,
        company: company || null,
        phone: phone || null,
        investorType: investorType || null,
        investmentSize: investmentSize || null,
        provider: 'email',
        status: 'pending', // Requires admin approval
        createdAt: new Date().toISOString()
      });
      
      return { success: true, data: { user: firebaseUser } };
    } catch (error) {
      console.error('Registration error:', error);
      let message = 'Registration failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          message = 'Password is too weak. Please use a stronger password.';
          break;
      }
      
      return { success: false, message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      isAdmin,
      login,
      loginGoogle,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default useAuth;
