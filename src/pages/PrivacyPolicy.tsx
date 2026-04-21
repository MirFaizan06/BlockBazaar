import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './PrivacyPolicy.module.css';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function PrivacyPolicy() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.35 }}
      className={styles.wrapper}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.meta}>
          <span className={styles.badge}>Legal</span>
          <span className={styles.updated}>Last updated: April 2026</span>
        </div>

        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.intro}>
          BlockBazaar is operated by <strong>The NxT LvL</strong>. This policy explains what
          information is collected when you use our platform, how it is used, and your rights as
          a visitor. We are committed to keeping things simple and transparent — this is a
          read-only marketplace and we do not create user accounts or collect personal data
          directly.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Who We Are</h2>
          <p className={styles.body}>
            BlockBazaar is a Minecraft Mods Marketplace that lets anyone discover and download
            community-created Bedrock Edition mods (.mcaddon, .mcworld, etc.) for free. The
            platform is built and maintained by <strong>The NxT LvL</strong>. For any
            privacy-related questions, contact us at{' '}
            <a href="mailto:mirfaizan8803@gmail.com" className={styles.link}>
              mirfaizan8803@gmail.com
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Do NOT Collect</h2>
          <p className={styles.body}>
            BlockBazaar does <strong>not</strong> require you to create an account, log in, or
            provide any personal information. We do not collect:
          </p>
          <ul className={styles.list}>
            <li>Your name, email address, or contact details</li>
            <li>Payment information (all payments are handled by Gumroad)</li>
            <li>Profile data, preferences, or browsing history linked to you personally</li>
            <li>Location data beyond what your browser may expose to third-party SDKs</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Information Collected Automatically</h2>
          <p className={styles.body}>
            When you visit BlockBazaar, certain limited technical data may be collected
            automatically via the third-party services we use (see Section 5). This may include:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Anonymous download counts:</strong> When you initiate a mod download, we
              increment an anonymous counter stored in Firebase Firestore. No personal identifier
              is attached to this count.
            </li>
            <li>
              <strong>IP address and request metadata:</strong> Our hosting provider (Vercel) may
              log standard HTTP request data (IP address, user-agent, referrer, timestamp) for
              security and performance purposes. This is governed by{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Vercel's Privacy Policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Cookies</h2>
          <p className={styles.body}>
            BlockBazaar itself does not set any first-party cookies for tracking or advertising.
            However, the Firebase JavaScript SDK — used to read mod data from Firestore — may set
            session-level cookies or use browser local storage for internal SDK state management
            (e.g., caching, connection state). These are strictly functional and contain no
            personally identifiable information.
          </p>
          <p className={styles.body}>
            You can disable cookies in your browser settings; this will not prevent you from
            browsing mods, though some SDK behaviour may be affected.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
          <p className={styles.body}>
            BlockBazaar integrates the following third-party services. Each has its own privacy
            policy that governs how they handle data.
          </p>
          <div className={styles.thirdPartyGrid}>
            <div className={styles.thirdPartyCard}>
              <h3 className={styles.thirdPartyName}>Firebase (Google)</h3>
              <p className={styles.body}>
                We use Firebase Firestore to store mod metadata and anonymous download statistics.
                Firebase may process connection data as part of its service. Google's data
                practices are described in the{' '}
                <a
                  href="https://firebase.google.com/support/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Firebase Privacy and Security documentation
                </a>
                .
              </p>
            </div>
            <div className={styles.thirdPartyCard}>
              <h3 className={styles.thirdPartyName}>Gumroad</h3>
              <p className={styles.body}>
                Mod files are hosted on Gumroad. When you click a download link, you are
                redirected to Gumroad's platform. Gumroad may collect information about your
                visit and, if you choose to pay, your payment details. This is governed by{' '}
                <a
                  href="https://gumroad.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Gumroad's Privacy Policy
                </a>
                . BlockBazaar never receives your Gumroad payment or account data.
              </p>
            </div>
            <div className={styles.thirdPartyCard}>
              <h3 className={styles.thirdPartyName}>Vercel</h3>
              <p className={styles.body}>
                BlockBazaar is hosted on Vercel's global edge network. Vercel processes web
                requests to serve the application and may retain standard server logs. See{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Vercel's Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Children's Privacy (COPPA)</h2>
          <p className={styles.body}>
            BlockBazaar is a Minecraft mods platform and may be visited by users under the age
            of 13. In compliance with the Children's Online Privacy Protection Act (COPPA), we
            do <strong>not</strong> knowingly collect personal information from children under
            13. Because we do not collect personal data from any users, this requirement is met
            by design.
          </p>
          <p className={styles.body}>
            If you are a parent or guardian and believe your child has somehow submitted personal
            information to us, please contact us at{' '}
            <a href="mailto:mirfaizan8803@gmail.com" className={styles.link}>
              mirfaizan8803@gmail.com
            </a>{' '}
            and we will take appropriate action immediately.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Data Retention</h2>
          <p className={styles.body}>
            Anonymous download counts stored in Firestore are retained indefinitely as part of
            mod metadata for display purposes. They are not linked to any individual. Server
            logs held by Vercel are subject to Vercel's own retention schedule.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Links to External Sites</h2>
          <p className={styles.body}>
            BlockBazaar links out to Gumroad for file downloads and may reference external
            Minecraft community resources. We are not responsible for the privacy practices of
            any external websites. We encourage you to review the privacy policy of every site
            you visit.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Your Rights</h2>
          <p className={styles.body}>
            Because we do not collect or store personally identifiable information, there is
            generally no personal data for us to provide, correct, or delete on your behalf.
            If you have any concerns or requests related to data that may have been collected
            by our third-party providers, please contact those providers directly using the
            links in Section 5.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
          <p className={styles.body}>
            We may update this Privacy Policy from time to time to reflect changes in our
            practices or for legal reasons. The "Last updated" date at the top of this page
            will reflect the most recent revision. Continued use of BlockBazaar after any
            changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Contact</h2>
          <p className={styles.body}>
            For any questions or concerns about this Privacy Policy, reach us at:
          </p>
          <div className={styles.contactBox}>
            <p className={styles.body}>
              <strong>The NxT LvL — BlockBazaar</strong>
            </p>
            <a href="mailto:mirfaizan8803@gmail.com" className={styles.link}>
              mirfaizan8803@gmail.com
            </a>
          </div>
        </section>

        <div className={styles.footer}>
          <Link to="/terms" className={styles.footerLink}>
            Terms of Service
          </Link>
          <Link to="/" className={styles.footerLink}>
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
