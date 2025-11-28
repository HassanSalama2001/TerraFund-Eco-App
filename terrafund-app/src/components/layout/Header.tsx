import Link from 'next/link';
import { Button } from '../ui/Button';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    TerraFund<span className={styles.highlight}>Eco</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Button size="sm" variant="primary">Start Planting</Button>
                </nav>
            </div>
        </header>
    );
};
