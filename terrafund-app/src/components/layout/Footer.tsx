import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <p className={styles.text}>&copy; {new Date().getFullYear()} Plant With Ads. All rights reserved.</p>
                <div className={styles.links}>
                    <a href="#" className={styles.link}>Privacy</a>
                    <a href="#" className={styles.link}>Terms</a>
                </div>
            </div>
        </footer>
    );
};
