import { db } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { BADGES, Badge } from '../lib/badges';

export const AchievementService = {
    // Check for new badges based on stats
    checkBadges: (
        currentStats: { totalAdsWatched: number; treesContributedTo: number },
        unlockedBadgeIds: string[]
    ): Badge[] => {
        const newBadges: Badge[] = [];

        BADGES.forEach(badge => {
            if (!unlockedBadgeIds.includes(badge.id) && badge.condition(currentStats)) {
                newBadges.push(badge);
            }
        });

        return newBadges;
    },

    // Unlock a badge for a user (persist to Firestore)
    unlockBadge: async (user: User, badgeId: string) => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, {
                badges: arrayUnion(badgeId)
            });
        } catch (error) {
            console.error("Error unlocking badge:", error);
            // If document doesn't exist (edge case), create it
            const docSnap = await getDoc(userRef);
            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    badges: [badgeId]
                }, { merge: true });
            }
        }
    },

    // Get user's unlocked badges from Firestore
    getUserBadges: async (user: User): Promise<string[]> => {
        if (!user) return [];

        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return docSnap.data().badges || [];
        }
        return [];
    }
};
