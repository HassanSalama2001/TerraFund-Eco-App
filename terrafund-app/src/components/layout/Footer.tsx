import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <p className={styles.text}>&copy; {new Date().getFullYear()} Plant With Ads. All rights reserved.</p>
                <div className={styles.links}>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                    <Link href="/privacy" className={styles.link}>Privacy</Link>
                    <Link href="/terms" className={styles.link}>Terms</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                </div>
            </div>
        </footer>
    );
};
