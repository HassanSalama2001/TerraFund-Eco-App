import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import styles from './VideoAdModal.module.css';

interface VideoAdModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export const VideoAdModal = ({ isOpen, onClose, onComplete }: VideoAdModalProps) => {
    const [timeLeft, setTimeLeft] = useState(15); // 15 second timer
    const [canSkip, setCanSkip] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeLeft(15);
            setCanSkip(false);
            setIsCompleted(false);
        }
    }, [isOpen]);

    // Timer logic
    useEffect(() => {
        if (!isOpen || isCompleted) return;

        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsCompleted(true);
            setCanSkip(true);
            onComplete(); // Trigger reward
        }
    }, [timeLeft, isOpen, isCompleted, onComplete]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <div className={styles.videoContainer}>
                        {/* Placeholder for Real Video Ad or Content */}
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/vBqJ8x0N9W8?autoplay=1&mute=1&controls=0&start=10"
                            title="Impact Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.iframe}
                        ></iframe>

                        {/* Ad Label Overlay */}
                        <div className={styles.adLabel}>Sponsored Video</div>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.timer}>
                            {isCompleted ? (
                                <span className={styles.success}>Tree Funded! 🌱</span>
                            ) : (
                                <span>Reward in: {timeLeft}s</span>
                            )}
                        </div>

                        {/* Placeholder for AdSense Banner (Future) */}
                        <div className={styles.adPlaceholder}>
                            <p className={styles.adText}>Ad Space (Google AdSense)</p>
                        </div>

                        <Button
                            variant={canSkip ? "primary" : "secondary"}
                            onClick={onClose}
                            disabled={!canSkip}
                            className={styles.closeButton}
                        >
                            {canSkip ? "Collect Reward & Close" : `Wait ${timeLeft}s`}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
