'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { useGame } from '../../context/GameContext';
import { LoginModal } from '../auth/LoginModal';
import styles from './Header.module.css';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user, signOut } = useGame();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
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

                        {user ? (
                            <div className={styles.userProfile}>
                                <Link href="/profile">
                                    <img
                                        src={user.photoURL || '/default-avatar.png'}
                                        alt="Profile"
                                        className={styles.avatar}
                                        title={`Signed in as ${user.displayName}`}
                                    />
                                </Link>
                                <Button size="sm" variant="outline" onClick={() => signOut()}>
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                Sign In
                            </Button>
                        )}
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

                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {user ? (
                                <Button size="lg" variant="outline" fullWidth onClick={() => { signOut(); closeMenu(); }}>
                                    Sign Out
                                </Button>
                            ) : (
                                <Button size="lg" variant="primary" fullWidth onClick={() => { setIsLoginModalOpen(true); closeMenu(); }}>
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
};
