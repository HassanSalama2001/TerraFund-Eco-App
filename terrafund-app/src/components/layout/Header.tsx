'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import styles from './Header.module.css';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    Plant With Ads 🌳
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/dashboard">
                        <Button size="sm" variant="primary">Start Planting</Button>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Nav Drawer */}
                <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                    <Link href="/dashboard" className={styles.mobileLink} onClick={closeMenu}>Dashboard</Link>
                    <Link href="/blog" className={styles.mobileLink} onClick={closeMenu}>Blog</Link>
                    <Link href="/about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
                    <Link href="/dashboard" onClick={closeMenu} style={{ marginTop: '1rem' }}>
                        <Button size="lg" variant="primary" fullWidth>Start Planting</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
