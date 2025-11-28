"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { PricingSource } from '../../lib/pricing-sources';
import styles from './PriceModal.module.css';

interface PriceModalProps {
    show: boolean;
    onClose: () => void;
    averagePrice: number;
    sources: PricingSource[];
    lastUpdated?: string;
}

export const PriceModal = ({ show, onClose, averagePrice, sources, lastUpdated }: PriceModalProps) => {
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
                        className={styles.modal}
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>🌳 Tree Pricing Transparency</h2>
                            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                                ✕
                            </button>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.summary}>
                                <div className={styles.summaryCard}>
                                    <span className={styles.label}>Average Cost</span>
                                    <span className={styles.bigPrice}>${averagePrice.toFixed(2)}</span>
                                    <span className={styles.perTree}>per tree</span>
                                </div>
                            </div>

                            <div className={styles.explanation}>
                                <h3>How We Calculate Pricing</h3>
                                <p>
                                    We partner with multiple verified tree-planting organizations to ensure transparency
                                    and fair pricing. Our cost is calculated as a weighted average from reputable NGOs,
                                    ensuring your contribution goes directly to real trees.
                                </p>
                            </div>

                            <div className={styles.sources}>
                                <h3>Our Partner Organizations</h3>
                                {sources.map((source) => (
                                    <div key={source.name} className={styles.sourceCard}>
                                        <div className={styles.sourceHeader}>
                                            <h4>{source.organization}</h4>
                                            <span className={styles.sourcePrice}>${source.priceUSD.toFixed(2)}</span>
                                        </div>
                                        <p className={styles.sourceDesc}>{source.description}</p>
                                        <div className={styles.sourceFooter}>
                                            <a
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.sourceLink}
                                            >
                                                Visit {source.name} →
                                            </a>
                                            <span className={styles.verified}>
                                                ✓ Verified {new Date(source.lastVerified).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {lastUpdated && (
                                <div className={styles.footer}>
                                    <small>Last updated: {new Date(lastUpdated).toLocaleString()}</small>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
