import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { AdSimulation } from '../../features/ads/AdSimulation';
import { GlobalTreeFund } from '../../components/features/GlobalTreeFund';
import { UserStats } from '../../components/features/UserStats';
import styles from './page.module.css';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <h1 className={styles.title}>Community Dashboard</h1>

                    {/* Global Tree Fund - Featured at top */}
                    <div className={styles.section}>
                        <GlobalTreeFund />
                    </div>

                    {/* Grid Layout for User Actions & Stats */}
                    <div className={styles.grid}>

                        {/* Left Column: Ad Watch & User Stats */}
                        <div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>Earn for the Fund</h2>
                                <AdSimulation />
                            </div>

                            <div style={{ marginTop: 'var(--spacing-xl)' }}>
                                <UserStats />
                            </div>
                        </div>

                        {/* Right Column: Information & Transparency */}
                        <div>
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>How It Works</h2>
                                <div className={styles.howItWorksGrid}>
                                    <div className={styles.step}>
                                        <div className={styles.stepIcon}>📺</div>
                                        <div className={styles.stepContent}>
                                            <h4>1. Watch Ads</h4>
                                            <p>Each ad you watch adds real money to the global fund</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepIcon}>🌍</div>
                                        <div className={styles.stepContent}>
                                            <h4>2. Community Fund</h4>
                                            <p>All users contribute together to reach the tree goal</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepIcon}>🌳</div>
                                        <div className={styles.stepContent}>
                                            <h4>3. Real Trees Planted</h4>
                                            <p>When we reach $0.50, a real tree gets planted!</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepIcon}>🔄</div>
                                        <div className={styles.stepContent}>
                                            <h4>4. Repeat</h4>
                                            <p>New tree fund starts immediately. Keep the momentum!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.didYouKnow} style={{ marginTop: 'var(--spacing-xl)' }}>
                                <h3 className={styles.didYouKnowTitle}>💡 Did You Know?</h3>
                                <p className={styles.didYouKnowText}>
                                    One tree absorbs approximately 22kg of CO₂ per year and produces 118kg of oxygen!
                                </p>
                                <p className={styles.didYouKnowText}>
                                    Together, we are making a real impact on our planet, one ad at a time. 🌍
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
