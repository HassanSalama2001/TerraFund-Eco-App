"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PricingSource } from '../lib/pricing-sources';

interface GlobalTreeFund {
    currentAdsGlobal: number;   // Total ads watched in current batch
    adsRequiredPerTree: number; // Target ads to plant one tree
    currentTreeNumber: number;  // Tree #127
    totalTreesPlanted: number;  // 126 trees purchased so far
    lastUpdated: string;
}

interface UserStats {
    totalAdsWatched: number;
    treesContributedTo: number;    // Number of trees user helped plant
}

interface GameState extends GlobalTreeFund, UserStats {
    pricingSources: PricingSource[];
    lastPriceUpdate: string | null;
    isInitialized: boolean;
}

interface GameContextType extends GameState {
    watchAd: () => { treePlanted: boolean; treeNumber?: number };
    refreshPricing: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>({
        // Global Tree Fund (Real Backend)
        currentAdsGlobal: 0,
        adsRequiredPerTree: 250,
        currentTreeNumber: 1,
        totalTreesPlanted: 0,
        lastUpdated: new Date().toISOString(),

        // User Stats
        totalAdsWatched: 0,
        treesContributedTo: 0,

        // Pricing (kept for reference/transparency if needed later)
        pricingSources: [],
        lastPriceUpdate: null,
        isInitialized: false,
    });

    // 1. Load User State from Local Storage on Mount
    useEffect(() => {
        const savedState = localStorage.getItem('plantWithAdsState_v3');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setState(prev => ({
                    ...prev,
                    // Restore User Stats
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

    // 2. Save User State to Local Storage on Change
    useEffect(() => {
        if (!state.isInitialized) return;

        const stateToSave = {
            // User Stats Only
            totalAdsWatched: state.totalAdsWatched,
            treesContributedTo: state.treesContributedTo,
        };
        localStorage.setItem('plantWithAdsState_v3', JSON.stringify(stateToSave));
    }, [state.totalAdsWatched, state.treesContributedTo, state.isInitialized]);

    // 3. Subscribe to Real Global Fund (Firebase)
    useEffect(() => {
        // Only connect if API key is present (to avoid errors during setup)
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

    // Fetch pricing on mount (optional now, but good to keep for transparency)
    useEffect(() => {
        refreshPricing();
    }, []);

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

    const watchAd = () => {
        let treePlanted = false;
        let plantedTreeNumber: number | undefined;

        // 1. Update Local User Stats
        setState(prev => {
            const newAdsWatched = prev.totalAdsWatched + 1;

            // Optimistic UI Check
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

        // 2. Update Real Backend
        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/fundService').then(({ FundService }) => {
                FundService.addToFund(1); // Add 1 ad
            });
        }

        return { treePlanted, treeNumber: plantedTreeNumber };
    };

    return (
        <GameContext.Provider value={{ ...state, watchAd, refreshPricing }}>
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
