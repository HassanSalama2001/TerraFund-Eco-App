"use client";

import { useGame } from '../../context/GameContext';
import styles from './StatsBoard.module.css';

export const StatsBoard = () => {
    const { totalTreesPlanted, currentTreeNumber, totalAdsWatched } = useGame();

    // Calculate environmental impact based on trees planted
    const co2Offset = totalTreesPlanted * 22; // 22kg CO2 per tree per year
    const oxygenProduced = totalTreesPlanted * 118; // 118kg oxygen per tree per year

    return (
        <div className={styles.container}>
            <div className={styles.statItem}>
                <span className={styles.label}>Ads Watched</span>
                <span className={styles.value}>{totalAdsWatched}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.label}>Trees Funded</span>
                <span className={styles.value}>{totalTreesPlanted}</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.label}>CO₂ Offset</span>
                <span className={styles.value}>{co2Offset} kg</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.label}>Oxygen</span>
                <span className={styles.value}>{oxygenProduced} kg</span>
            </div>
        </div>
    );
};
