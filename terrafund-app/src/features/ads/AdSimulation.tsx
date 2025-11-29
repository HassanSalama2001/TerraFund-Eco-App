"use client";

import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../../components/ui/Button';
import { VideoAdModal } from '../../components/ui/VideoAdModal';
import { Achievement } from '../../components/ui/Achievement';
import { ParticleEffect } from '../../components/ui/ParticleEffect';
import styles from './AdSimulation.module.css';

export const AdSimulation = () => {
    const { watchAd } = useGame();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [achievement, setAchievement] = useState<{ show: boolean; title: string; description: string; icon: string }>({
        show: false,
        title: '',
        description: '',
        icon: '',
    });

    const handleWatchClick = () => {
        setIsModalOpen(true);
    };

    const handleAdComplete = () => {
        // Reward user (1 Ad Contribution)
        const result = watchAd();
        setIsModalOpen(false);

        // Show celebration if tree was planted
        if (result.treePlanted) {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 2000);

            setAchievement({
                show: true,
                title: `Tree #${result.treeNumber} Planted! 🌳`,
                description: `The community just planted Tree #${result.treeNumber}! You were part of it! A real tree will be planted with this funding.`,
                icon: '🎉',
            });
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Watch & Plant</h3>
                    <span className={styles.badge}>Live</span>
                </div>

                <p className={styles.description}>
                    Watch a short video to contribute to the community tree fund.
                </p>

                <div className={styles.actionArea}>
                    <Button
                        onClick={handleWatchClick}
                        className={styles.watchButton}
                        size="lg"
                        fullWidth
                    >
                        📺 Watch Video Ad
                    </Button>
                    <p className={styles.note}>+ 1 Ad Contribution</p>
                </div>

                <VideoAdModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onComplete={handleAdComplete}
                />

                {showParticles && <ParticleEffect trigger={showParticles} />}
            </div>

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
