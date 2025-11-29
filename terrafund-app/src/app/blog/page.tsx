import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { blogPosts } from '../../lib/blog-data';
import Link from 'next/link';
import styles from './page.module.css';

export default function BlogListing() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>Learn & Grow</h1>
                <p className={styles.subtitle}>Insights on reforestation, digital impact, and our journey.</p>

                <div className={styles.grid}>
                    {blogPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                            <div className={styles.icon}>{post.image}</div>
                            <div className={styles.content}>
                                <span className={styles.date}>{post.date}</span>
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <span className={styles.readMore}>Read Article &rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
