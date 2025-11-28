"use client";

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useGame } from '../../context/GameContext';
import { Achievement } from '../../components/ui/Achievement';
import { ParticleEffect } from '../../components/ui/ParticleEffect';
import styles from './AdSimulation.module.css';

export const AdSimulation = () => {
    const { watchAd } = useGame();
    const [isWatching, setIsWatching] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showParticles, setShowParticles] = useState(false);
    const [achievement, setAchievement] = useState<{ show: boolean; title: string; description: string; icon: string }>({
        show: false,
        title: '',
        description: '',
        icon: '',
    });

    const handleWatchAd = () => {
        setIsWatching(true);
        setProgress(0);

        const duration = 3000; // 3 seconds simulation
        const interval = 50;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);

            if (currentStep >= steps) {
                clearInterval(timer);
                setIsWatching(false);

                // Add to global fund (simulated $0.002 revenue per ad)
                const result = watchAd(0.002);

                // Show celebration if tree was planted
                if (result.treePlanted) {
                    setShowParticles(true);
                    setTimeout(() => setShowParticles(false), 100);

                    setAchievement({
                        show: true,
                        title: `Tree #${result.treeNumber} Planted! 🌳`,
                        description: `The community just planted Tree #${result.treeNumber}! You were part of it! A real tree will be planted with this funding.`,
                        icon: '🎉',
                    });
                }
            }
        }, interval);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.adBox}>
                    {isWatching ? (
                        <div className={styles.watching}>
                            <p className={styles.text}>Watching Ad...</p>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.idle}>
                            <p className={styles.text}>Watch an ad to support the tree fund</p>
                            <div className={styles.rewardBadge}>+$0.002 to fund</div>
                        </div>
                    )}
                </div>

                <Button
                    onClick={handleWatchAd}
                    disabled={isWatching}
                    className={styles.button}
                    variant="secondary"
                >
                    {isWatching ? 'Watching...' : 'Watch Ad'}
                </Button>

                {showParticles && <ParticleEffect trigger={showParticles} />}
            </div>

            {/* Tree planted celebration */}
            <Achievement
                show={achievement.show}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                onClose={() => setAchievement(prev => ({ ...prev, show: false }))}
            />
        </>
    );
};
