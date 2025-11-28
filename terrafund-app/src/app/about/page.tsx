import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import styles from './page.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <h1 className={styles.title}>Our Mission: <br /><span className={styles.highlight}>Reforest the World, Together</span></h1>
                    <p className={styles.subtitle}>
                        We believe that environmental impact shouldn't be limited to those with money to spare.
                        Plant With Ads turns your time and attention into real trees.
                    </p>
                </section>

                {/* The Problem & Solution */}
                <section className={styles.contentSection}>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <span className={styles.icon}>🔥</span>
                            <h3>The Problem</h3>
                            <p>
                                Deforestation is accelerating climate change, destroying habitats, and threatening biodiversity.
                                While many want to help, donating money isn't always possible for everyone.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <span className={styles.icon}>💡</span>
                            <h3>The Solution</h3>
                            <p>
                                Advertisers pay billions for attention. We redirect that value to nature.
                                By watching ads on our platform, you generate revenue that we use to fund verified tree planting projects.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Transparency Section */}
                <section className={styles.transparency}>
                    <h2 className={styles.sectionTitle}>100% Transparency</h2>
                    <p className={styles.text}>
                        Trust is our currency. We believe you have the right to know exactly where the money goes.
                    </p>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>80%</span>
                            <span className={styles.statLabel}>Directly to Trees</span>
                            <p className={styles.statDesc}>Of profits go directly to planting partners.</p>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>20%</span>
                            <span className={styles.statLabel}>Operations & Growth</span>
                            <p className={styles.statDesc}>Server costs, development, and reaching more planters.</p>
                        </div>
                    </div>
                </section>

                {/* Partners Section */}
                <section className={styles.partners}>
                    <h2 className={styles.sectionTitle}>Our Planting Partners</h2>
                    <p className={styles.text}>
                        We don't plant the trees ourselves. We fund the experts who do it best.
                    </p>
                    <div className={styles.partnerGrid}>
                        <div className={styles.partnerCard}>
                            <h4>One Tree Planted</h4>
                            <p>Global reforestation across 43 countries.</p>
                        </div>
                        <div className={styles.partnerCard}>
                            <h4>Team Trees</h4>
                            <p>Arbor Day Foundation partnership.</p>
                        </div>
                        <div className={styles.partnerCard}>
                            <h4>Eden Reforestation</h4>
                            <p>Restoring mangroves and forests.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <h2>Ready to make an impact?</h2>
                    <p>It takes less than 5 minutes to help plant a tree.</p>
                    <Link href="/dashboard">
                        <Button size="lg">Start Planting Now</Button>
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
