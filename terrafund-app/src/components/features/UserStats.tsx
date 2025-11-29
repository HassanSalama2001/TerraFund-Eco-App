'use client';

import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/Button';
import { LoginModal } from '../auth/LoginModal';
import styles from './UserStats.module.css';

export const UserStats = () => {
    const { totalAdsWatched, treesContributedTo, user } = useGame();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <>
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

                {/* Friendly Nudge for Guests */}
                {!user && totalAdsWatched > 0 && (
                    <div className={styles.saveProgress}>
                        <p className={styles.saveText}>Don't lose your progress!</p>
                        <Button
                            size="sm"
                            variant="outline"
                            fullWidth
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            💾 Save My Stats
                        </Button>
                    </div>
                )}
            </div>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
};
