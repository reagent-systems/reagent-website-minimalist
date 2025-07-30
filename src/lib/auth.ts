import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

// Import Firebase SDK
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

// User type
interface User {
  email: string;
  uid: string;
}

// Debug: Check if environment variables are loaded
console.log('🔥 Environment check:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'LOADED' : 'MISSING',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'LOADED' : 'MISSING',
  hasEnvVars: !!import.meta.env.VITE_FIREBASE_API_KEY
});

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Validate that required config is present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration missing! Please check your .env file.');
  console.error('Expected .env format:', {
    'VITE_FIREBASE_API_KEY': 'your-api-key',
    'VITE_FIREBASE_PROJECT_ID': 'your-project-id'
  });
} else {
  console.log('✅ Firebase config loaded successfully');
}

// Initialize Firebase (only once to prevent duplicate app error)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app as firebaseApp };

// User store
export const user = writable<User | null>(null);
export const loading = writable(true);

// Initialize auth state
export function initAuth() {
  console.log('🔄 Initializing Firebase auth listener...');
  console.log('🔥 Connected to Firebase project:', firebaseConfig.projectId);
  
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      console.log('👤 Firebase user signed in:', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        projectId: firebaseConfig.projectId
      });
      user.set({
        email: firebaseUser.email || '',
        uid: firebaseUser.uid
      });
    } else {
      console.log('👤 No Firebase user signed in');
      user.set(null);
    }
    loading.set(false);
  });
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string): Promise<User> {
  console.log('🔐 Attempting Firebase sign-in with:', email);
  console.log('🔥 Using Firebase project:', firebaseConfig.projectId);
  
  const result = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = result.user;
  
  console.log('✅ Firebase sign-in successful:', {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    projectId: firebaseConfig.projectId
  });

  // Update last_login timestamp in Firestore
  try {
    await updateDoc(doc(db, 'users', firebaseUser.uid), {
      last_login: serverTimestamp()
    });
    console.log('✅ Updated last_login timestamp');
  } catch (error) {
    console.error('❌ Error updating last_login:', error);
    // Continue even if Firestore update fails
  }
  
  const userData: User = {
    email: firebaseUser.email || '',
    uid: firebaseUser.uid
  };
  return userData;
}

// Create account with email and password
export async function createAccount(email: string, password: string): Promise<User> {
  console.log('📝 Attempting Firebase account creation with:', email);
  console.log('🔥 Using Firebase project:', firebaseConfig.projectId);
  
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = result.user;
  
  console.log('✅ Firebase account created successfully:', {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    projectId: firebaseConfig.projectId
  });

  // Extract username from email (part before @)
  const username = email.split('@')[0];
  
  // Create user document in Firestore users collection
  try {
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      agent_usage_count: 0,
      created_at: serverTimestamp(),
      email: firebaseUser.email,
      is_active: true,
      last_login: serverTimestamp(),
      last_session_date: null,
      role: 'user', // Default role is 'user', not 'admin'
      total_sessions: 0,
      uid: firebaseUser.uid,
      username: username
    });
    
    console.log('✅ User document created in Firestore users collection');
  } catch (error) {
    console.error('❌ Error creating user document:', error);
    // Still return the user even if Firestore fails
  }
  
  const userData: User = {
    email: firebaseUser.email || '',
    uid: firebaseUser.uid
  };
  return userData;
}

// Sign in with Google
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const firebaseUser = result.user;
  
  // Update last_login timestamp in Firestore (or create user if first time)
  try {
    const username = firebaseUser.email?.split('@')[0] || 'user';
    
    // Try to update existing user, or create if new Google user
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      agent_usage_count: 0,
      created_at: serverTimestamp(),
      email: firebaseUser.email,
      is_active: true,
      last_login: serverTimestamp(),
      last_session_date: null,
      role: 'user',
      total_sessions: 0,
      uid: firebaseUser.uid,
      username: username
    }, { merge: true }); // merge: true will update existing or create new
    
    console.log('✅ Google user data updated/created in Firestore');
  } catch (error) {
    console.error('❌ Error updating/creating Google user:', error);
  }
  
  const userData: User = {
    email: firebaseUser.email || '',
    uid: firebaseUser.uid
  };
  return userData;
}

// Sign out
export async function signOutUser(): Promise<void> {
  await signOut(auth);
  goto('/');
} 