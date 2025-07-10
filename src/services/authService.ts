import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updatePassword
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types/user';

const INVITE_KEY = 'Welcome123';
const GUEST_INVITE_KEY = 'welcome123';

export const guestLogin = async (inviteCode: string): Promise<User> => {
  if (inviteCode.toLowerCase() !== GUEST_INVITE_KEY) {
    throw new Error('Invalid invite code');
  }

  // Generate a temporary guest ID
  const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Calculate trial dates (7 days from now)
  const trialStartDate = new Date().toISOString();
  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const guestUser: User = {
    uid: guestId,
    email: 'guest@themadrasmarketeer.com',
    name: 'Guest User',
    isGuest: true,
    subscriptionTier: 'free',
    quotesUsed: 0,
    quotesLimit: 3,
    trialStartDate,
    trialEndDate,
    isTrialActive: true,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };

  // Store guest data in localStorage
  localStorage.setItem('tmm_guest_user', JSON.stringify(guestUser));
  
  return guestUser;
};

export const getGuestUser = (): User | null => {
  const stored = localStorage.getItem('tmm_guest_user');
  if (!stored) return null;
  
  try {
    const guestUser = JSON.parse(stored) as User;
    
    // Check if trial has expired
    const now = new Date();
    const trialEnd = new Date(guestUser.trialEndDate || '');
    const isTrialActive = guestUser.isTrialActive && now < trialEnd;
    
    if (guestUser.isTrialActive && !isTrialActive) {
      guestUser.isTrialActive = false;
      localStorage.setItem('tmm_guest_user', JSON.stringify(guestUser));
    }
    
    return guestUser;
  } catch {
    return null;
  }
};

export const updateGuestUser = (updates: Partial<User>): void => {
  const guestUser = getGuestUser();
  if (!guestUser) return;
  
  const updatedUser = { ...guestUser, ...updates };
  localStorage.setItem('tmm_guest_user', JSON.stringify(updatedUser));
};

export const clearGuestSession = (): void => {
  localStorage.removeItem('tmm_guest_user');
  localStorage.removeItem('tmm_quotes');
};

export const signUp = async (email: string, password: string, name: string, inviteKey: string): Promise<User> => {
  if (inviteKey !== INVITE_KEY) {
    throw new Error('Please contact admin');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Calculate trial dates (7 days from now)
    const trialStartDate = new Date().toISOString();
    const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const userData: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      name,
      subscriptionTier: 'free',
      quotesUsed: 0,
      quotesLimit: 3,
      trialStartDate,
      trialEndDate,
      isTrialActive: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    // Save user data to Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    });

    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Update last login time
    await updateDoc(doc(db, 'users', firebaseUser.uid), {
      lastLoginAt: serverTimestamp()
    });

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    const userData = userDoc.data() as User;
    
    // Check if trial has expired
    const now = new Date();
    const trialEnd = new Date(userData.trialEndDate || '');
    const isTrialActive = userData.isTrialActive && now < trialEnd;

    if (userData.isTrialActive && !isTrialActive) {
      // Trial has expired, update user
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        isTrialActive: false
      });
      userData.isTrialActive = false;
    }

    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error('No user logged in');
    }
    await updatePassword(auth.currentUser, newPassword);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      return null;
    }
    return userDoc.data() as User;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const updateUserData = async (uid: string, data: Partial<User>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};