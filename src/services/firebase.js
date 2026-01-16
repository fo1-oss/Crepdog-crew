// Firebase Configuration for CDC Investor Data Room
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';

// Firebase configuration - Replace with your own config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCyxLtijhq50ZTAQsy0P1GIInHtmstc88o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dataroom-dash.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dataroom-dash",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dataroom-dash.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "492179105967",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:492179105967:web:8cf362026b856d7168cc5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Admin emails - these users get admin access
export const ADMIN_EMAILS = [
  'admin@crepdogcrew.com',
  'anchit@crepdogcrew.com',
  'fo1@crepdogcrew.com',
  'garvkapil15@gmail.com'
];

// Google Drive API Configuration
export const DRIVE_API_KEY = import.meta.env.VITE_DRIVE_API_KEY || "AIzaSyBZqCLdYagBqTKRlzfcZjkHvRiNPbc8jIU";

export const DRIVE_FOLDERS = {
  PITCH_DECK: "16dEnuE4Aml9asy6tmn3a8AqtRUn08PTE",
  MIS: "1hJVr0xzckP_iSMZekXmkAGm_IaGmyHNU",
  AUDITED_FINANCIALS: "138WYK9a_5kOLRkVCSllR8fD-peJ8JvrG"
};

// ==================== AUTH FUNCTIONS ====================

// Email/Password Login
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Google OAuth Login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Email/Password Registration
export const registerWithEmail = async (email, password, displayName) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(result.user, { displayName });
  }
  return result.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Check if user is admin
export const isUserAdmin = (email) => {
  return ADMIN_EMAILS.includes(email?.toLowerCase());
};

// ==================== FIRESTORE FUNCTIONS ====================

// Save user session
export const saveSession = async (userId, sessionData) => {
  try {
    const sessionRef = doc(collection(db, 'sessions'));
    await setDoc(sessionRef, {
      userId,
      ...sessionData,
      createdAt: serverTimestamp()
    });
    return sessionRef.id;
  } catch (error) {
    console.error('Error saving session:', error);
    return null;
  }
};

// Save user activity
export const saveActivity = async (userId, activityData) => {
  try {
    const activityRef = doc(collection(db, 'activities'));
    await setDoc(activityRef, {
      userId,
      ...activityData,
      timestamp: serverTimestamp()
    });
    return activityRef.id;
  } catch (error) {
    console.error('Error saving activity:', error);
    return null;
  }
};

// Get investor sessions (admin only)
export const getInvestorSessions = async (limitCount = 100) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
};

// Get activities (admin only)
export const getActivities = async (limitCount = 200) => {
  try {
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting activities:', error);
    return [];
  }
};

// Save user profile
export const saveUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Export onAuthStateChanged for use in hooks
export { onAuthStateChanged };

export default app;
