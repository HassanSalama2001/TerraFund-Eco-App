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
}

interface GameContextType extends GameState {
    watchAd: (revenue: number) => { treePlanted: boolean; treeNumber?: number };
    refreshPricing: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>({
        // Global Tree Fund
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
    });

    // Load state from local storage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('terraFundState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            setState(prev => ({ ...prev, ...parsed }));
        }
    }, []);

    // Save state to local storage on change
    useEffect(() => {
        localStorage.setItem('terraFundState', JSON.stringify(state));
    }, [state]);

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

        setState(prev => {
            const newAmount = prev.currentAmount + revenue;
            const newTotalContribution = prev.totalContribution + revenue;
            const newAdsWatched = prev.totalAdsWatched + 1;

            // Check if we reached the target
            if (newAmount >= prev.targetAmount) {
                treePlanted = true;
                plantedTreeNumber = prev.currentTreeNumber;

                return {
                    ...prev,
                    currentAmount: newAmount - prev.targetAmount, // Carry over excess
                    currentTreeNumber: prev.currentTreeNumber + 1,
                    totalTreesPlanted: prev.totalTreesPlanted + 1,
                    totalAdsWatched: newAdsWatched,
                    totalContribution: newTotalContribution,
                    treesContributedTo: prev.treesContributedTo + 1,
                    lastUpdated: new Date().toISOString(),
                };
            }

            return {
                ...prev,
                currentAmount: newAmount,
                totalAdsWatched: newAdsWatched,
                totalContribution: newTotalContribution,
                lastUpdated: new Date().toISOString(),
            };
        });

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
