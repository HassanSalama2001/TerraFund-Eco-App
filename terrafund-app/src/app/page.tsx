import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Watch Ads Together, <br />
          <span className={styles.highlight}>Plant Real Trees</span>
        </h1>
        <p className={styles.subtitle}>
          Join a global community where every ad watched adds real money to a shared tree fund.
          When we reach the goal together, we plant a real tree! 🌳
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/dashboard">
            <Button size="lg">Join the Movement</Button>
          </Link>
          <Button variant="outline" size="lg">How It Works</Button>
        </div>

        {/* Live stats preview */}
        <div className={styles.liveStats}>
          <div className={styles.statBadge}>
            <span className={styles.statNumber}>🌍</span>
            <span className={styles.statText}>Community-Powered</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statNumber}>💯</span>
            <span className={styles.statText}>100% Transparent</span>
          </div>
          <div className={styles.statBadge}>
            <span className={styles.statNumber}>🌳</span>
            <span className={styles.statText}>Real Trees</span>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>How TerraFund Works</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📺</div>
            <h3 className={styles.cardTitle}>1. Watch Ads</h3>
            <p className={styles.cardText}>
              Every ad you watch generates real revenue that goes directly into our shared tree fund.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌍</div>
            <h3 className={styles.cardTitle}>2. Community Fund Grows</h3>
            <p className={styles.cardText}>
              All users contribute together. Watch the fund grow in real-time as people watch ads worldwide.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌳</div>
            <h3 className={styles.cardTitle}>3. Trees Get Planted</h3>
            <p className={styles.cardText}>
              When we hit $0.50, we buy a real tree from verified organizations. Then the next tree starts!
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <h3 className={styles.cardTitle}>4. Track Your Impact</h3>
            <p className={styles.cardText}>
              See exactly how many trees you helped plant, your total contribution, and the global impact.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.whyDifferent}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why TerraFund is Different</h2>
          <div className={styles.differenceGrid}>
            <div className={styles.differenceCard}>
              <h4>💰 Real Money</h4>
              <p>Ads generate actual revenue, not virtual points. Every cent goes to trees.</p>
            </div>
            <div className={styles.differenceCard}>
              <h4>🔍 Full Transparency</h4>
              <p>See exactly where your contribution goes and which organizations plant the trees.</p>
            </div>
            <div className={styles.differenceCard}>
              <h4>🤝 Community Power</h4>
              <p>Together we're stronger! Everyone contributes to the same goal.</p>
            </div>
            <div className={styles.differenceCard}>
              <h4>⚡ Instant Impact</h4>
              <p>Every single ad matters. See the fund grow with each contribution.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Make a Difference?</h2>
        <p className={styles.ctaSubtitle}>
          Join thousands of people around the world planting real trees, one ad at a time.
        </p>
        <Link href="/dashboard">
          <Button size="lg">Start Watching Ads</Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
