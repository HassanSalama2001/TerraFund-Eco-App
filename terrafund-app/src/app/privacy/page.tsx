import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import styles from './page.module.css';

export default function PrivacyPolicy() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <h1>Privacy Policy</h1>
                    <p>Last updated: November 29, 2025</p>

                    <section>
                        <h2>1. Introduction</h2>
                        <p>Welcome to Plant With Ads. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section>
                        <h2>2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul>
                            <li><strong>Identity Data:</strong> includes username or similar identifier.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul>
                            <li>To provide the service of tracking your contributions to tree planting.</li>
                            <li>To improve our website and user experience.</li>
                            <li>To display personalized advertisements via Google AdSense.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Cookies and Advertising</h2>
                        <p>We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
                        <p><strong>Google AdSense:</strong> We use Google AdSense to display ads. Google uses cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
                        <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</p>
                    </section>

                    <section>
                        <h2>5. Contact Us</h2>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: community@plantwithads.com</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
