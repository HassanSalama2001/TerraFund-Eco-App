"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useGame } from '../../context/GameContext';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { signIn } = useGame();

    const handleGoogleLogin = async () => {
        try {
            await signIn();
            onClose();
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>🌱 Save Your Forest</h2>
                            <button onClick={onClose} className={styles.closeBtn}>×</button>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.illustration}>
                                🌍
                            </div>
                            <p className={styles.description}>
                                Don't lose your progress! Sign in to save your stats, earn badges, and track your impact across devices.
                            </p>

                            <div className={styles.benefits}>
                                <div className={styles.benefit}>
                                    <span>💾</span> Save your trees forever
                                </div>
                                <div className={styles.benefit}>
                                    <span>🏆</span> Unlock eco-badges
                                </div>
                                <div className={styles.benefit}>
                                    <span>📱</span> Sync across phone & laptop
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <Button
                                    onClick={handleGoogleLogin}
                                    size="lg"
                                    fullWidth
                                    className={styles.googleBtn}
                                >
                                    Sign in with Google
                                </Button>
                                <button onClick={onClose} className={styles.guestBtn}>
                                    Continue as Guest
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
