import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './TermsOfService.module.css';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function TermsOfService() {
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

        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.intro}>
          These Terms of Service govern your use of <strong>BlockBazaar</strong>, a Minecraft
          Mods Marketplace operated by <strong>The NxT LvL</strong>. By accessing or using
          BlockBazaar, you agree to these terms. If you do not agree, please do not use the
          platform.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. About BlockBazaar</h2>
          <p className={styles.body}>
            BlockBazaar is a community-oriented discovery platform for Minecraft Bedrock Edition
            mods, add-ons, and worlds. We curate and list mod files created by the Minecraft
            community. BlockBazaar is not affiliated with, endorsed by, or connected to
            Mojang Studios or Microsoft Corporation in any way. Minecraft is a registered
            trademark of Mojang Studios.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Use of the Platform</h2>
          <p className={styles.body}>
            BlockBazaar is a read-only public marketplace. No account registration is required
            to browse or initiate downloads. You agree to use BlockBazaar only for lawful
            purposes and in a way that does not infringe the rights of others or restrict their
            use of the platform.
          </p>
          <p className={styles.body}>Prohibited uses include:</p>
          <ul className={styles.list}>
            <li>Attempting to circumvent, disable, or interfere with platform security features</li>
            <li>Scraping or harvesting data in a manner that places excessive load on our infrastructure</li>
            <li>Using BlockBazaar to distribute malware, phishing content, or any harmful software</li>
            <li>Misrepresenting the origin or nature of any mod listed on the platform</li>
            <li>Any use that violates applicable local, national, or international laws</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Mod Content and Intellectual Property</h2>
          <p className={styles.body}>
            All mods listed on BlockBazaar are created by independent community members. Mod
            authors retain ownership of their respective works. BlockBazaar does not claim
            ownership over any mod content listed on the platform.
          </p>
          <p className={styles.body}>
            Minecraft mods are derivative works that build on Mojang's intellectual property.
            By downloading and using any mod from BlockBazaar, you agree to comply with
            Mojang's{' '}
            <a
              href="https://www.minecraft.net/en-us/usage-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Usage Guidelines
            </a>
            . BlockBazaar is not responsible for any mod's compliance with those guidelines.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. No Warranties — Download at Your Own Risk</h2>
          <div className={styles.warningBox}>
            <p className={styles.body}>
              <strong>Mods are provided "as-is" with no warranties of any kind.</strong>
            </p>
          </div>
          <p className={styles.body}>
            BlockBazaar does not test, verify, or guarantee the safety, stability, or
            compatibility of any mod listed on the platform. By downloading a mod, you
            acknowledge and accept that:
          </p>
          <ul className={styles.list}>
            <li>
              Mods may be incompatible with your version of Minecraft or your device
            </li>
            <li>
              Mods may cause crashes, data loss, or unexpected behavior in your game
            </li>
            <li>
              BlockBazaar is not responsible for any damage to your game worlds, device, or data
              resulting from mod use
            </li>
            <li>
              You should always back up your Minecraft worlds before installing any mod
            </li>
          </ul>
          <p className={styles.body}>
            To the maximum extent permitted by applicable law, BlockBazaar and The NxT LvL
            expressly disclaim all warranties, express or implied, including but not limited to
            implied warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Downloads and Payments (Gumroad)</h2>
          <p className={styles.body}>
            Mod files are hosted on and delivered through <strong>Gumroad</strong>, a
            third-party e-commerce platform. When you click a download link on BlockBazaar, you
            are redirected to Gumroad's platform.
          </p>
          <p className={styles.body}>
            Many mods are offered on a "Pay What You Want" (PWYW) basis via Gumroad, meaning
            you may choose to pay any amount, including zero. Any payment you make goes directly
            to the mod author via Gumroad and is governed by{' '}
            <a
              href="https://gumroad.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Gumroad's Terms of Service
            </a>
            . BlockBazaar does not process, receive, or store any payment information.
          </p>
          <p className={styles.body}>
            All payment disputes, refund requests, and billing issues must be resolved directly
            with Gumroad and/or the mod author. BlockBazaar has no involvement in or
            responsibility for financial transactions on Gumroad.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Content Removal and Moderation</h2>
          <p className={styles.body}>
            BlockBazaar reserves the right to remove, delist, or modify any mod listing at any
            time, for any reason, without prior notice. Reasons for removal may include but are
            not limited to:
          </p>
          <ul className={styles.list}>
            <li>Reports of malware or harmful content within a mod file</li>
            <li>Copyright or intellectual property infringement claims</li>
            <li>Content that violates Mojang's usage guidelines or applicable law</li>
            <li>Content deemed inappropriate for BlockBazaar's audience (including minors)</li>
            <li>Technical issues or outdated listings</li>
          </ul>
          <p className={styles.body}>
            To report a mod, please contact us at{' '}
            <a href="mailto:mirfaizan8803@gmail.com" className={styles.link}>
              mirfaizan8803@gmail.com
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. User-Generated Content</h2>
          <p className={styles.body}>
            In the current version of BlockBazaar, there is no facility for visitors to submit
            mods, post reviews, or contribute any user-generated content directly through the
            platform. All content is curated and added by BlockBazaar administrators. This may
            change in future versions of the platform, at which point these Terms will be
            updated accordingly.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Limitation of Liability</h2>
          <p className={styles.body}>
            To the fullest extent permitted by applicable law, BlockBazaar and The NxT LvL
            shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of data, loss of game progress,
            or device damage arising from your use of the platform or any mods downloaded
            through it.
          </p>
          <p className={styles.body}>
            Our total liability to you for any claim arising out of or relating to these Terms
            or your use of BlockBazaar shall not exceed zero dollars ($0), as the platform is
            provided entirely free of charge.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Third-Party Links and Services</h2>
          <p className={styles.body}>
            BlockBazaar contains links to external websites and services, including Gumroad.
            These links are provided for convenience only. We do not endorse, control, or take
            responsibility for the content, privacy policies, or practices of any third-party
            sites. Accessing third-party sites is at your own risk.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Governing Law</h2>
          <p className={styles.body}>
            These Terms shall be governed by and construed in accordance with applicable law.
            Any disputes arising under or in connection with these Terms shall be subject to
            the exclusive jurisdiction of the courts of competent jurisdiction in the developer's
            country of residence. If any provision of these Terms is found to be unenforceable,
            the remaining provisions will continue to be valid and enforceable.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Changes to These Terms</h2>
          <p className={styles.body}>
            BlockBazaar reserves the right to modify these Terms at any time. Updated Terms
            will be posted on this page with a revised "Last updated" date. Your continued use
            of the platform after changes are posted constitutes your acceptance of the revised
            Terms. We encourage you to review this page periodically.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Contact</h2>
          <p className={styles.body}>
            If you have any questions about these Terms of Service, please reach out:
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
          <Link to="/privacy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link to="/" className={styles.footerLink}>
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
