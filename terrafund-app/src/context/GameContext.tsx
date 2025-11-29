"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PricingSource } from '../lib/pricing-sources';
import { User } from 'firebase/auth';
import { Badge } from '../lib/badges';

interface GlobalTreeFund {
    currentAdsGlobal: number;
    adsRequiredPerTree: number;
    currentTreeNumber: number;
    totalTreesPlanted: number;
    lastUpdated: string;
}

interface UserStats {
    totalAdsWatched: number;
    treesContributedTo: number;
    unlockedBadges: string[];
}

interface GameState extends GlobalTreeFund, UserStats {
    pricingSources: PricingSource[];
    lastPriceUpdate: string | null;
    isInitialized: boolean;
    user: User | null;
}

interface GameContextType extends GameState {
    watchAd: () => Promise<{ treePlanted: boolean; treeNumber?: number; newBadges?: Badge[] }>;
    refreshPricing: () => Promise<void>;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>({
        // Global Tree Fund
        currentAdsGlobal: 0,
        adsRequiredPerTree: 250,
        currentTreeNumber: 1,
        totalTreesPlanted: 0,
        lastUpdated: "2024-01-01T00:00:00.000Z",

        // User Stats
        totalAdsWatched: 0,
        treesContributedTo: 0,
        unlockedBadges: [],

        // Pricing
        pricingSources: [],
        lastPriceUpdate: null,
        isInitialized: false,
        user: null,
    });

    // 1. Load User State from Local Storage (Guest Mode)
    useEffect(() => {
        const savedState = localStorage.getItem('plantWithAdsState_v3');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setState(prev => ({
                    ...prev,
                    totalAdsWatched: parsed.totalAdsWatched || 0,
                    treesContributedTo: parsed.treesContributedTo || 0,
                    unlockedBadges: parsed.unlockedBadges || [],
                    isInitialized: true
                }));
            } catch (e) {
                console.error("Failed to parse saved state", e);
                setState(prev => ({ ...prev, isInitialized: true }));
            }
        } else {
            setState(prev => ({ ...prev, isInitialized: true }));
        }
    }, []);

    // 2. Save User State to Local Storage (Guest Mode Only)
    useEffect(() => {
        if (!state.isInitialized || state.user) return;

        const stateToSave = {
            totalAdsWatched: state.totalAdsWatched,
            treesContributedTo: state.treesContributedTo,
            unlockedBadges: state.unlockedBadges
        };
        localStorage.setItem('plantWithAdsState_v3', JSON.stringify(stateToSave));
    }, [state.totalAdsWatched, state.treesContributedTo, state.unlockedBadges, state.isInitialized, state.user]);

    // 3. Subscribe to Auth State
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/authService').then(({ AuthService }) => {
                const unsubscribe = AuthService.onAuthStateChanged(async (user) => {
                    if (user) {
                        // User Signed In: Merge Guest Stats
                        const guestAds = state.totalAdsWatched;
                        const guestTrees = state.treesContributedTo;

                        if (guestAds > 0) {
                            await AuthService.mergeGuestStats(user, {
                                totalAdsWatched: guestAds,
                                treesContributedTo: guestTrees
                            });
                            localStorage.removeItem('plantWithAdsState_v3');
                        }

                        // Load user badges
                        import('../services/achievementService').then(async ({ AchievementService }) => {
                            const badges = await AchievementService.getUserBadges(user);
                            setState(prev => ({ ...prev, user: user, unlockedBadges: badges }));
                        });

                        setState(prev => ({ ...prev, user: user }));
                    } else {
                        setState(prev => ({ ...prev, user: null, unlockedBadges: [] }));
                    }
                });
                return () => unsubscribe();
            });
        }
    }, [state.totalAdsWatched]);

    // 4. Subscribe to Real Global Fund
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/fundService').then(({ FundService }) => {
                const unsubscribe = FundService.subscribeToFund((data) => {
                    setState(prev => ({
                        ...prev,
                        currentAdsGlobal: data.currentAdsGlobal,
                        adsRequiredPerTree: data.adsRequiredPerTree,
                        totalTreesPlanted: data.totalTreesPlanted,
                        currentTreeNumber: data.currentTreeNumber,
                        lastUpdated: data.lastUpdated
                    }));
                });
                return () => unsubscribe();
            }).catch(err => console.error("Firebase not configured yet", err));
        }
    }, []);

    // Fetch pricing
    useEffect(() => { refreshPricing(); }, []);

    const refreshPricing = async () => {
        try {
            const response = await fetch('/api/tree-pricing');
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setState(prev => ({
                        ...prev,
                        pricingSources: data.data.sources,
                        lastPriceUpdate: data.data.lastUpdated,
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch pricing:', error);
        }
    };

    const signIn = async () => {
        const { AuthService } = await import('../services/authService');
        await AuthService.signInWithGoogle();
    };

    const signOut = async () => {
        const { AuthService } = await import('../services/authService');
        await AuthService.signOut();
        setState(prev => ({
            ...prev,
            user: null,
            totalAdsWatched: 0,
            treesContributedTo: 0,
            unlockedBadges: []
        }));
    };

    const watchAd = async () => {
        let treePlanted = false;
        let plantedTreeNumber: number | undefined;
        let newBadges: Badge[] = [];

        // Calculate new stats first
        const newAdsWatched = state.totalAdsWatched + 1;
        const potentialNewAds = state.currentAdsGlobal + 1;
        let newTreesContributed = state.treesContributedTo;

        if (potentialNewAds >= state.adsRequiredPerTree) {
            treePlanted = true;
            plantedTreeNumber = state.currentTreeNumber;
            newTreesContributed += 1;
        }

        // Check for achievements
        const { AchievementService } = await import('../services/achievementService');
        const unlocked = AchievementService.checkBadges(
            { totalAdsWatched: newAdsWatched, treesContributedTo: newTreesContributed },
            state.unlockedBadges
        );

        if (unlocked.length > 0) {
            newBadges = unlocked;
            const newBadgeIds = unlocked.map(b => b.id);

            // Update local state
            setState(prev => ({
                ...prev,
                unlockedBadges: [...prev.unlockedBadges, ...newBadgeIds]
            }));

            // Update Firestore if logged in
            if (state.user) {
                unlocked.forEach(badge => {
                    AchievementService.unlockBadge(state.user!, badge.id);
                });
            }
        }

        // Update main state
        setState(prev => ({
            ...prev,
            totalAdsWatched: newAdsWatched,
            treesContributedTo: newTreesContributed
        }));

        // Update Backend
        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/fundService').then(({ FundService }) => {
                FundService.addToFund(1);
            });
        }

        return { treePlanted, treeNumber: plantedTreeNumber, newBadges };
    };

    return (
        <GameContext.Provider value={{ ...state, watchAd, refreshPricing, signIn, signOut }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
