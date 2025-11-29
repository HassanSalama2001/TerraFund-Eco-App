"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PricingSource } from '../lib/pricing-sources';
import { User } from 'firebase/auth';

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
}

interface GameState extends GlobalTreeFund, UserStats {
    pricingSources: PricingSource[];
    lastPriceUpdate: string | null;
    isInitialized: boolean;
    user: User | null; // Auth User
}

interface GameContextType extends GameState {
    watchAd: () => { treePlanted: boolean; treeNumber?: number };
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
        lastUpdated: new Date().toISOString(),

        // User Stats
        totalAdsWatched: 0,
        treesContributedTo: 0,

        // Pricing
        pricingSources: [],
        lastPriceUpdate: null,
        isInitialized: false,
        user: null,
    });

    // 1. Load User State from Local Storage on Mount (Guest Mode)
    useEffect(() => {
        const savedState = localStorage.getItem('plantWithAdsState_v3');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setState(prev => ({
                    ...prev,
                    totalAdsWatched: parsed.totalAdsWatched || 0,
                    treesContributedTo: parsed.treesContributedTo || 0,
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
        if (!state.isInitialized || state.user) return; // Don't save to local if logged in

        const stateToSave = {
            totalAdsWatched: state.totalAdsWatched,
            treesContributedTo: state.treesContributedTo,
        };
        localStorage.setItem('plantWithAdsState_v3', JSON.stringify(stateToSave));
    }, [state.totalAdsWatched, state.treesContributedTo, state.isInitialized, state.user]);

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
                            // Clear local storage after merge to avoid double counting if they logout
                            localStorage.removeItem('plantWithAdsState_v3');
                        }

                        setState(prev => ({ ...prev, user: user }));
                    } else {
                        // User Signed Out
                        setState(prev => ({ ...prev, user: null }));
                    }
                });
                return () => unsubscribe();
            });
        }
    }, [state.totalAdsWatched]); // Depend on stats to capture them for merge

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
        // Reset to empty guest state on logout
        setState(prev => ({
            ...prev,
            user: null,
            totalAdsWatched: 0,
            treesContributedTo: 0
        }));
    };

    const watchAd = () => {
        let treePlanted = false;
        let plantedTreeNumber: number | undefined;

        setState(prev => {
            const newAdsWatched = prev.totalAdsWatched + 1;
            const potentialNewAds = prev.currentAdsGlobal + 1;

            if (potentialNewAds >= prev.adsRequiredPerTree) {
                treePlanted = true;
                plantedTreeNumber = prev.currentTreeNumber;
            }

            return {
                ...prev,
                totalAdsWatched: newAdsWatched,
                treesContributedTo: treePlanted ? prev.treesContributedTo + 1 : prev.treesContributedTo
            };
        });

        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/fundService').then(({ FundService }) => {
                FundService.addToFund(1);
            });
        }

        return { treePlanted, treeNumber: plantedTreeNumber };
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
