"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './ParticleEffect.module.css';

interface Particle {
    id: number;
    x: number;
    y: number;
    emoji: string;
    delay: number;
}

interface ParticleEffectProps {
    trigger: boolean;
    onComplete?: () => void;
}

export const ParticleEffect = ({ trigger, onComplete }: ParticleEffectProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (trigger) {
            const emojis = ['🌿', '🍃', '✨', '🌱', '💚'];
            const newParticles = Array.from({ length: 15 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                delay: Math.random() * 0.2,
            }));

            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
                onComplete?.();
            }, 1500);
        }
    }, [trigger, onComplete]);

    return (
        <div className={styles.container}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={styles.particle}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                        x: particle.x,
                        y: particle.y,
                        opacity: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1,
                        delay: particle.delay,
                        ease: 'easeOut',
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    );
};
