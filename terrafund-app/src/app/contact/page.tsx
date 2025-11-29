'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Contact Us</h1>
                    <p className={styles.subtitle}>
                        Have questions about how we plant trees? Want to partner with us?
                        We'd love to hear from you.
                    </p>

                    <div className={styles.grid}>
                        <div className={styles.infoCard}>
                            <h3>Get in Touch</h3>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📧</span>
                                <div>
                                    <strong>Email</strong>
                                    <a href="mailto:community@plantwithads.com">community@plantwithads.com</a>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>💬</span>
                                <div>
                                    <strong>Social Media</strong>
                                    <p>@PlantWithAds</p>
                                </div>
                            </div>

                            <div className={styles.faq}>
                                <h3>Common Questions</h3>
                                <details>
                                    <summary>How do I know the trees are real?</summary>
                                    <p>We publish monthly receipts from our partners (One Tree Planted) on our blog.</p>
                                </details>
                                <details>
                                    <summary>Is this free?</summary>
                                    <p>Yes! Advertisers pay for the trees, not you.</p>
                                </details>
                            </div>
                        </div>

                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Your name" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="your@email.com" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows={5} placeholder="How can we help?" required></textarea>
                            </div>

                            <Button type="submit" fullWidth>Send Message</Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
