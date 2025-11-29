import Link from 'next/link';
import { Button } from '../ui/Button';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Plant With Ads 🌳
                </Link>
                <nav className={styles.nav}>
                    <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Button size="sm" variant="primary">Start Planting</Button>
                </nav>
            </div>
        </header>
    );
};
