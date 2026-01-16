import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, query, orderBy, limit, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyxLtijhq50ZTAQsy0P1GIInHtmstc88o",
  authDomain: "dataroom-dash.firebaseapp.com",
  projectId: "dataroom-dash",
  storageBucket: "dataroom-dash.firebasestorage.app",
  messagingSenderId: "492179105967",
  appId: "1:492179105967:web:8cf362026b856d7168cc5a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Admin emails
export const ADMIN_EMAILS = [
  'admin@crepdogcrew.com',
  'anchit@crepdogcrew.com',
  'fo1@crepdogcrew.com'
];

// Google Drive API Key
export const DRIVE_API_KEY = "AIzaSyBZqCLdYagBqTKRlzfcZjkHvRiNPbc8jIU";

// Drive Folder IDs
export const DRIVE_FOLDERS = {
  PITCH_DECK: "16dEnuE4Aml9asy6tmn3a8AqtRUn08PTE",
  MIS: "1hJVr0xzckP_iSMZekXmkAGm_IaGmyHNU",
  AUDITED_FINANCIALS: "138WYK9a_5kOLRkVCSllR8fD-peJ8JvrG"
};

// Auth functions
export const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Firestore functions
export const saveSession = async (userId, sessionData) => {
  const sessionRef = doc(collection(db, 'sessions'));
  await setDoc(sessionRef, {
    userId,
    ...sessionData,
    createdAt: serverTimestamp()
  });
  return sessionRef.id;
};

export const saveActivity = async (userId, activityData) => {
  const activityRef = doc(collection(db, 'activities'));
  await setDoc(activityRef, {
    userId,
    ...activityData,
    timestamp: serverTimestamp()
  });
};

export const getInvestorSessions = async () => {
  const sessionsRef = collection(db, 'sessions');
  const q = query(sessionsRef, orderBy('createdAt', 'desc'), limit(100));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getActivities = async () => {
  const activitiesRef = collection(db, 'activities');
  const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(200));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Data Cards functions
export const saveDataCard = async (cardData) => {
  const cardRef = doc(collection(db, 'dataCards'));
  await setDoc(cardRef, {
    ...cardData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return cardRef.id;
};

export const updateDataCard = async (cardId, cardData) => {
  const cardRef = doc(db, 'dataCards', cardId);
  await updateDoc(cardRef, {
    ...cardData,
    updatedAt: serverTimestamp()
  });
};

export const deleteDataCard = async (cardId) => {
  const cardRef = doc(db, 'dataCards', cardId);
  await deleteDoc(cardRef);
};

export const getDataCards = async () => {
  const cardsRef = collection(db, 'dataCards');
  const q = query(cardsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { onAuthStateChanged };
