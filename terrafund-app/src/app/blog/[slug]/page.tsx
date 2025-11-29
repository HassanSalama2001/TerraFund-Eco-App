import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { blogPosts } from '../../../lib/blog-data';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Correctly type the params as a Promise
interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: PageProps) {
    // Await the params
    const { slug } = await params;

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <article className={styles.article}>
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            <span className={styles.date}>{post.date}</span>
                            <span className={styles.author}>By {post.author}</span>
                        </div>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.icon}>{post.image}</div>
                    </header>

                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
            <Footer />
        </div>
    );
}
