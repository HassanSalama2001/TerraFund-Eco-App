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
          <Link href="#how-it-works">
            <Button variant="outline" size="lg">How It Works</Button>
          </Link>
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

      <section id="how-it-works" className={styles.features}>
        <h2 className={styles.sectionTitle}>How Plant With Ads Works</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📺</div>
            <h3 className={styles.cardTitle}>1. Watch Ads</h3>
            <p className={styles.cardText}>
              Every ad you watch adds to our shared tree fund. It's simple: watch ads, plant trees.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌍</div>
            <h3 className={styles.cardTitle}>2. Community Fund Grows</h3>
            <p className={styles.cardText}>
              All users contribute together. Watch the global ad counter grow in real-time.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🌳</div>
            <h3 className={styles.cardTitle}>3. Trees Get Planted</h3>
            <p className={styles.cardText}>
              When we reach the ad goal (e.g. 250 ads), we plant a real tree! Then the next tree starts!
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <h3 className={styles.cardTitle}>4. Track Your Impact</h3>
            <p className={styles.cardText}>
              See exactly how many trees you helped plant and your total ads watched.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.whyDifferent}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Plant With Ads is Different</h2>
          <div className={styles.differenceGrid}>
            <div className={styles.differenceCard}>
              <h4>💰 100% Free</h4>
              <p>You never pay a cent. The advertisers pay for the trees, you just provide the time.</p>
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
