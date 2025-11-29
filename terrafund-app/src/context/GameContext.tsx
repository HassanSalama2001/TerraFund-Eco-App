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
        // Global Tree Fund (Simulated)
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
        const savedState = localStorage.getItem('plantWithAdsState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                // Only restore user-specific stats, not global ones
                setState(prev => ({
                    ...prev,
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

        const userStateToSave = {
            totalAdsWatched: state.totalAdsWatched,
            totalContribution: state.totalContribution,
            treesContributedTo: state.treesContributedTo
        };
        localStorage.setItem('plantWithAdsState', JSON.stringify(userStateToSave));
    }, [state.totalAdsWatched, state.totalContribution, state.treesContributedTo, state.isInitialized]);

    // 3. Simulate Global Tree Fund (Deterministic Growth)
    useEffect(() => {
        // Simulation Start: Nov 1, 2025
        const startDate = new Date('2025-11-01T00:00:00Z').getTime();
        const now = Date.now();
        const minutesElapsed = (now - startDate) / (1000 * 60);

        // Growth Rate: 1 tree every 10 minutes (approx)
        // $0.50 per tree -> $0.05 per minute
        const growthRatePerMinute = 0.05;
        const totalGlobalRevenue = minutesElapsed * growthRatePerMinute;

        const treeCost = 0.50;
        const totalTrees = Math.floor(totalGlobalRevenue / treeCost);
        const currentPool = totalGlobalRevenue % treeCost;

        setState(prev => ({
            ...prev,
            totalTreesPlanted: 1240 + totalTrees, // Base of 1240 trees
            currentTreeNumber: 1241 + totalTrees,
            currentAmount: currentPool
        }));

        // Update every minute to keep it "live"
        const interval = setInterval(() => {
            setState(prev => {
                const newPool = prev.currentAmount + (growthRatePerMinute / 60); // Add per second roughly
                if (newPool >= treeCost) {
                    return {
                        ...prev,
                        totalTreesPlanted: prev.totalTreesPlanted + 1,
                        currentTreeNumber: prev.currentTreeNumber + 1,
                        currentAmount: newPool - treeCost
                    };
                }
                return { ...prev, currentAmount: newPool };
            });
        }, 1000); // Update every second for smooth UI

        return () => clearInterval(interval);
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
