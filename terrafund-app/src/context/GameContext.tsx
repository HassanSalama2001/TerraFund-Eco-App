"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PricingSource } from '../lib/pricing-sources';

interface GlobalTreeFund {
    currentAmount: number;      // Current $ in fund
    targetAmount: number;       // $0.50 (from pricing API)
    currentTreeNumber: number;  // Tree #127
    totalTreesPlanted: number;  // 126 trees purchased so far
    lastUpdated: string;
}

interface UserStats {
    totalAdsWatched: number;
    totalContribution: number;     // Total $ contributed
    treesContributedTo: number;    // Number of trees user helped plant
}

interface GameState extends GlobalTreeFund, UserStats {
    treeCostUSD: number;
    pricingSources: PricingSource[];
    lastPriceUpdate: string | null;
    isInitialized: boolean;
}

interface GameContextType extends GameState {
    watchAd: (revenue: number) => { treePlanted: boolean; treeNumber?: number };
    refreshPricing: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>({
        // Global Tree Fund (Real Backend)
        currentAmount: 0,
        targetAmount: 0.50,
        currentTreeNumber: 1,
        totalTreesPlanted: 0,
        lastUpdated: new Date().toISOString(),

        // User Stats
        totalAdsWatched: 0,
        totalContribution: 0,
        treesContributedTo: 0,

        // Pricing
        treeCostUSD: 0.50,
        pricingSources: [],
        lastPriceUpdate: null,
        isInitialized: false,
    });

    // 1. Load User State from Local Storage on Mount
    useEffect(() => {
        const savedState = localStorage.getItem('plantWithAdsState_v2');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setState(prev => ({
                    ...prev,
                    // Restore User Stats
                    totalAdsWatched: parsed.totalAdsWatched || 0,
                    totalContribution: parsed.totalContribution || 0,
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
            // User Stats Only (Global comes from Firebase)
            totalAdsWatched: state.totalAdsWatched,
            totalContribution: state.totalContribution,
            treesContributedTo: state.treesContributedTo,
        };
        localStorage.setItem('plantWithAdsState_v2', JSON.stringify(stateToSave));
    }, [state.totalAdsWatched, state.totalContribution, state.treesContributedTo, state.isInitialized]);

    // 3. Subscribe to Real Global Fund (Firebase)
    useEffect(() => {
        // Only connect if API key is present (to avoid errors during setup)
        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/fundService').then(({ FundService }) => {
                const unsubscribe = FundService.subscribeToFund((data) => {
                    setState(prev => ({
                        ...prev,
                        currentAmount: data.currentAmount,
                        totalTreesPlanted: data.totalTreesPlanted,
                        currentTreeNumber: data.currentTreeNumber,
                        lastUpdated: data.lastUpdated
                    }));
                });
                return () => unsubscribe();
            }).catch(err => console.error("Firebase not configured yet", err));
        }
    }, []);

    // Fetch pricing on mount
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
                        targetAmount: data.data.averagePriceUSD,
                        treeCostUSD: data.data.averagePriceUSD,
                        pricingSources: data.data.sources,
                        lastPriceUpdate: data.data.lastUpdated,
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch pricing:', error);
        }
    };

    const watchAd = (revenue: number = 0.002) => {
        let treePlanted = false;
        let plantedTreeNumber: number | undefined;

        // 1. Update Local User Stats
        setState(prev => {
            const newTotalContribution = prev.totalContribution + revenue;
            const newAdsWatched = prev.totalAdsWatched + 1;

            // Check if this specific contribution "tipped over" the tree (optimistic UI)
            // In reality, the backend decides, but for UI feedback we can guess
            const potentialNewAmount = prev.currentAmount + revenue;
            if (potentialNewAmount >= prev.targetAmount) {
                treePlanted = true;
                plantedTreeNumber = prev.currentTreeNumber;
            }

            return {
                ...prev,
                totalAdsWatched: newAdsWatched,
                totalContribution: newTotalContribution,
                treesContributedTo: treePlanted ? prev.treesContributedTo + 1 : prev.treesContributedTo
            };
        });

        // 2. Update Real Backend
        if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            import('../services/fundService').then(({ FundService }) => {
                FundService.addToFund(revenue);
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
