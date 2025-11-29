import React from 'react';
import { BADGES } from '../../lib/badges';
import styles from './BadgeGrid.module.css';

interface BadgeGridProps {
    unlockedBadgeIds: string[];
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({ unlockedBadgeIds }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Your Trophy Room 🏆</h3>
            <div className={styles.grid}>
                {BADGES.map(badge => {
                    const isUnlocked = unlockedBadgeIds.includes(badge.id);
                    return (
                        <div
                            key={badge.id}
                            className={`${styles.badgeCard} ${isUnlocked ? styles.unlocked : styles.locked}`}
                            title={isUnlocked ? badge.description : "Locked"}
                        >
                            <div className={styles.icon}>{badge.icon}</div>
                            <div className={styles.name}>{badge.name}</div>
                            {isUnlocked && <div className={styles.description}>{badge.description}</div>}
                            {!isUnlocked && <div className={styles.lockedText}>Locked</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
