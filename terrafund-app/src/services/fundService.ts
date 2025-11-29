import { db } from '../lib/firebase';
import { doc, onSnapshot, runTransaction, getDoc, setDoc } from 'firebase/firestore';

export interface GlobalFundData {
    currentAdsGlobal: number;   // Total ads watched in current batch
    adsRequiredPerTree: number; // Target ads to plant one tree (e.g., 250)
    totalTreesPlanted: number;
    currentTreeNumber: number;
    lastUpdated: string;
}

const GLOBAL_DOC_REF = doc(db, 'global', 'fund_v3');

export const FundService = {
    // Subscribe to real-time updates
    subscribeToFund: (callback: (data: GlobalFundData) => void) => {
        return onSnapshot(GLOBAL_DOC_REF, (docSnapshot) => {
            if (docSnapshot.exists()) {
                callback(docSnapshot.data() as GlobalFundData);
            } else {
                // Initialize if not exists
                const initialData: GlobalFundData = {
                    currentAdsGlobal: 0,
                    adsRequiredPerTree: 250, // Default: 250 ads = 1 tree
                    totalTreesPlanted: 0,
                    currentTreeNumber: 1,
                    lastUpdated: new Date().toISOString()
                };
                setDoc(GLOBAL_DOC_REF, initialData);
                callback(initialData);
            }
        });
    },

    // Increment fund (called when ad is watched)
    addToFund: async (adsCount: number = 1) => {
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(GLOBAL_DOC_REF);
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }

                const data = sfDoc.data() as GlobalFundData;
                const newAdsCount = data.currentAdsGlobal + adsCount;
                const target = data.adsRequiredPerTree || 250;

                let updates: Partial<GlobalFundData> = {
                    currentAdsGlobal: newAdsCount,
                    lastUpdated: new Date().toISOString()
                };

                // Check if tree funded
                if (newAdsCount >= target) {
                    updates.currentAdsGlobal = newAdsCount - target; // Carry over excess
                    updates.totalTreesPlanted = data.totalTreesPlanted + 1;
                    updates.currentTreeNumber = data.currentTreeNumber + 1;
                }

                transaction.update(GLOBAL_DOC_REF, updates);
            });
        } catch (e) {
            console.error("Transaction failed: ", e);
        }
    }
};
