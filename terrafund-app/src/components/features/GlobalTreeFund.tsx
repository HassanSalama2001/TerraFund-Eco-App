"use client";

import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import styles from './GlobalTreeFund.module.css';

export const GlobalTreeFund = () => {
    const { currentAmount, targetAmount, currentTreeNumber, totalTreesPlanted } = useGame();

    const progress = (currentAmount / targetAmount) * 100;
    const remaining = targetAmount - currentAmount;
    const percentageText = Math.min(Math.round(progress), 100);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>🌍 Global Tree Fund</h2>
                <div className={styles.badge}>
                    {totalTreesPlanted} tree{totalTreesPlanted !== 1 ? 's' : ''} planted
                </div>
            </div>

            <div className={styles.currentTree}>
                <span className={styles.treeLabel}>Current Goal:</span>
                <span className={styles.treeNumber}>Tree #{currentTreeNumber}</span>
            </div>

            <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
                <div className={styles.progressText}>
                    {percentageText}% Complete
                </div>
            </div>

            <div className={styles.amounts}>
                <div className={styles.amountItem}>
                    <span className={styles.amountLabel}>Raised</span>
                    <span className={styles.amountValue}>${currentAmount.toFixed(3)}</span>
                </div>
                <div className={styles.divider}>/</div>
                <div className={styles.amountItem}>
                    <span className={styles.amountLabel}>Goal</span>
                    <span className={styles.amountValue}>${targetAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className={styles.remaining}>
                {remaining > 0 ? (
                    <>
                        <span className={styles.remainingIcon}>🎯</span>
                        <span className={styles.remainingText}>
                            ${remaining.toFixed(3)} away from planting Tree #{currentTreeNumber}!
                        </span>
                    </>
                ) : (
                    <>
                        <span className={styles.remainingIcon}>🎉</span>
                        <span className={styles.remainingText}>
                            Ready to plant! Processing...
                        </span>
                    </>
                )}
            </div>

            <div className={styles.callToAction}>
                <p className={styles.ctaText}>
                    Every ad you watch helps the community plant real trees! 🌱
                </p>
            </div>
        </div>
    );
};
