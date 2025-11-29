import { db } from '../lib/firebase';
import { doc, onSnapshot, runTransaction, getDoc, setDoc } from 'firebase/firestore';

export interface GlobalFundData {
    currentAmount: number;
    totalTreesPlanted: number;
    currentTreeNumber: number;
    lastUpdated: string;
}

const GLOBAL_DOC_REF = doc(db, 'global', 'fund');

export const FundService = {
    // Subscribe to real-time updates
    subscribeToFund: (callback: (data: GlobalFundData) => void) => {
        return onSnapshot(GLOBAL_DOC_REF, (docSnapshot) => {
            if (docSnapshot.exists()) {
                callback(docSnapshot.data() as GlobalFundData);
            } else {
                // Initialize if not exists
                const initialData: GlobalFundData = {
                    currentAmount: 0,
                    totalTreesPlanted: 1240, // Starting base
                    currentTreeNumber: 1241,
                    lastUpdated: new Date().toISOString()
                };
                setDoc(GLOBAL_DOC_REF, initialData);
                callback(initialData);
            }
        });
    },

    // Increment fund (called when ad is watched)
    addToFund: async (amount: number) => {
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(GLOBAL_DOC_REF);
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }

                const data = sfDoc.data() as GlobalFundData;
                const newAmount = data.currentAmount + amount;
                const treeCost = 0.50;

                let updates: Partial<GlobalFundData> = {
                    currentAmount: newAmount,
                    lastUpdated: new Date().toISOString()
                };

                // Check if tree funded
                if (newAmount >= treeCost) {
                    updates.currentAmount = newAmount - treeCost;
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
