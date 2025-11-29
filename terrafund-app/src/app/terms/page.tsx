import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import styles from './page.module.css';

export default function TermsOfService() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <h1>Terms of Service</h1>
                    <p>Last updated: November 29, 2025</p>

                    <section>
                        <h2>1. Agreement to Terms</h2>
                        <p>By accessing our website at Plant With Ads, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                    </section>

                    <section>
                        <h2>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Plant With Ads' website for personal, non-commercial transitory viewing only.</p>
                    </section>

                    <section>
                        <h2>3. Disclaimer</h2>
                        <p>The materials on Plant With Ads' website are provided on an 'as is' basis. Plant With Ads makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </section>

                    <section>
                        <h2>4. Limitations</h2>
                        <p>In no event shall Plant With Ads or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Plant With Ads' website.</p>
                    </section>

                    <section>
                        <h2>5. Accuracy of Materials</h2>
                        <p>The materials appearing on Plant With Ads' website could include technical, typographical, or photographic errors. Plant With Ads does not warrant that any of the materials on its website are accurate, complete or current.</p>
                    </section>

                    <section>
                        <h2>6. Links</h2>
                        <p>Plant With Ads has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Plant With Ads of the site. Use of any such linked website is at the user's own risk.</p>
                    </section>

                    <section>
                        <h2>7. Modifications</h2>
                        <p>Plant With Ads may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
                    </section>

                    <section>
                        <h2>8. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
