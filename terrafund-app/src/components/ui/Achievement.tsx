"use client";

import { motion, AnimatePresence } from 'framer-motion';
import styles from './Achievement.module.css';

interface AchievementProps {
    show: boolean;
    title: string;
    description: string;
    icon: string;
    onClose: () => void;
}

export const Achievement = ({ show, title, description, icon, onClose }: AchievementProps) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.achievement}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.icon}>{icon}</div>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.description}>{description}</p>
                        <button className={styles.closeBtn} onClick={onClose}>
                            Awesome!
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
