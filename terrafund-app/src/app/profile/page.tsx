'use client';

import { useGame } from '../../context/GameContext';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { UserStats } from '../../components/features/UserStats';
import { BadgeGrid } from '../../components/features/BadgeGrid';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProfilePage() {
    const { user, unlockedBadges } = useGame();

    return (
        <div className="page-wrapper">
            <Header />
            <main className={`container ${styles.main}`}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarSection}>
                        <img
                            src={user?.photoURL || '/default-avatar.png'}
                            alt="Profile"
                            className={styles.avatar}
                        />
                        <div className={styles.userInfo}>
                            <h1 className={styles.userName}>{user?.displayName || 'Guest Planter'}</h1>
                            <p className={styles.userEmail}>{user?.email || 'Sign in to save your progress!'}</p>
                        </div>
                    </div>

                    {!user && (
                        <Link href="/dashboard">
                            <Button variant="primary">Sign In on Dashboard</Button>
                        </Link>
                    )}
                </div>

                <div className={styles.contentGrid}>
                    <div className={styles.statsColumn}>
                        <UserStats />
                    </div>
                    <div className={styles.badgesColumn}>
                        <BadgeGrid unlockedBadgeIds={unlockedBadges} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
