import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Page Not Found</h2>
                <p className={styles.text}>
                    Oops! It looks like you've wandered into the desert.
                    Let's get you back to planting trees.
                </p>
                <Link href="/">
                    <Button size="lg">Return Home</Button>
                </Link>
            </div>
        </div>
    );
}
