"use client";

import { useGame } from '../../context/GameContext';
import styles from './UserStats.module.css';

export const UserStats = () => {
    const { totalAdsWatched, totalContribution, treesContributedTo } = useGame();

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Your Impact</h3>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.statIcon}>🌱</span>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>{treesContributedTo}</span>
                        <span className={styles.statLabel}>
                            Tree{treesContributedTo !== 1 ? 's' : ''} helped plant
                        </span>
                    </div>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.statIcon}>💰</span>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>${totalContribution.toFixed(3)}</span>
                        <span className={styles.statLabel}>Total contribution</span>
                    </div>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.statIcon}>📺</span>
                    <div className={styles.statContent}>
                        <span className={styles.statValue}>{totalAdsWatched}</span>
                        <span className={styles.statLabel}>
                            Ad{totalAdsWatched !== 1 ? 's' : ''} watched
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.encouragement}>
                {treesContributedTo === 0 && (
                    <p>Watch your first ad to start making an impact! 🌍</p>
                )}
                {treesContributedTo > 0 && treesContributedTo < 5 && (
                    <p>Amazing start! You are making a difference! 💚</p>
                )}
                {treesContributedTo >= 5 && treesContributedTo < 10 && (
                    <p>You are a tree planting champion! Keep it up! 🏆</p>
                )}
                {treesContributedTo >= 10 && (
                    <p>Wow! You are an eco warrior! The planet thanks you! 🌎</p>
                )}
            </div>
        </div>
    );
};
