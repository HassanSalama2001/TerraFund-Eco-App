import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

export const AuthService = {
    // Sign in with Google
    signInWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    },

    // Sign out
    signOut: async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
            throw error;
        }
    },

    // Merge Guest Stats into User Account
    mergeGuestStats: async (user: User, guestStats: { totalAdsWatched: number, treesContributedTo: number }) => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // User exists, just add the guest stats to their existing total
            await updateDoc(userRef, {
                totalAdsWatched: increment(guestStats.totalAdsWatched),
                treesContributedTo: increment(guestStats.treesContributedTo),
                lastActive: new Date().toISOString()
            });
        } else {
            // New user, create profile with initial guest stats
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                totalAdsWatched: guestStats.totalAdsWatched,
                treesContributedTo: guestStats.treesContributedTo,
                createdAt: new Date().toISOString(),
                lastActive: new Date().toISOString()
            });
        }
    },

    // Subscribe to Auth State
    onAuthStateChanged: (callback: (user: User | null) => void) => {
        return onAuthStateChanged(auth, callback);
    }
};
