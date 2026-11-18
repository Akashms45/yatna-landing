import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function PrivacyPolicy({ langIndex = 0, onBack }) {
  const containerRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F0E3] text-[#30251F] selection:bg-[#C79A45]/30"
    >
      <div className="w-full px-4 sm:px-6 py-6 sm:py-10 font-serif">
        {/* Simple Top Back Link (No Navbar) */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#742C25] font-semibold hover:text-[#C79A45] transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>
            {langIndex === 0 ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Home'}
          </span>
        </button>

        {/* Title & Metadata */}
        <header className="mb-10 pb-6 border-b border-[#D9C7AA]">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#742C25] mb-2">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-[#30251F] font-semibold mb-1">
            Yatna (ಯತ್ನ) – A Companion on the Path of Devotion
          </p>
          <p className="text-xs sm:text-sm text-[#76665A]">
            <strong>Last Updated:</strong> November 17, 2026
          </p>
        </header>

        {/* Pure Flowing Document Content (No Cards, Only Scroll) */}
        <div className="space-y-10 text-base sm:text-lg leading-relaxed text-[#30251F]">
          {/* 1. Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              1. Introduction
            </h2>
            <p>Welcome to Yatna (ಯತ್ನ).</p>
            <p>
              Yatna is a devotional platform created to help devotees access
              temple information, learn about poojas and sevas, follow spiritual
              practices, and stay connected with daily devotion.
            </p>
            <p>
              This Privacy Policy explains how Yatna collects, uses, stores, and
              protects information when you visit our website or use our mobile
              application.
            </p>
            <p>
              We respect your privacy and aim to keep your experience simple,
              transparent, and secure.
            </p>
            <p className="italic text-[#742C25]">
              By using our website or application, you acknowledge the practices
              described in this Privacy Policy.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              2. Information We Collect
            </h2>
            <p>
              Yatna is designed to work without requiring users to create an
              account or register.
            </p>

            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-semibold text-[#742C25]">
                2.1 Information You Provide
              </h3>
              <p>
                When you contact us through the website's contact or feedback
                form, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Message or feedback submitted by you</li>
              </ul>
              <p className="pt-1">
                This information is provided voluntarily and is used only for
                communication, responding to enquiries, and improving our
                services.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-semibold text-[#742C25]">
                2.2 Information Stored on Your Device
              </h3>
              <p>
                The Yatna application may store certain information locally on
                your device, including:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Mantra counting progress</li>
                <li>Poorna Phala Sadhana progress</li>
                <li>Daily practice records</li>
                <li>Application preferences and settings</li>
                <li>Language preferences</li>
              </ul>
              <p className="pt-1">
                This information is stored locally and is not uploaded to a Yatna
                account or server as part of the current local-storage design.
              </p>
              <p className="text-sm text-[#76665A] italic">
                Uninstalling the application or clearing its stored data may
                result in the loss of this information.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-semibold text-[#742C25]">
                2.3 Automatically Collected Information
              </h3>
              <p>
                Currently, Yatna has not implemented Google Analytics or
                similar website analytics services.
              </p>
              <p>
                However, the website's hosting provider or infrastructure may
                automatically process basic technical information, such as IP
                addresses, browser details, and server logs, as part of normal
                website operations.
              </p>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              3. How We Use Your Information
            </h2>
            <p>Information provided through our website may be used to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Respond to enquiries and feedback.</li>
              <li>Address questions or reported issues.</li>
              <li>Improve website content and user experience.</li>
              <li>Maintain and operate our services.</li>
              <li>Communicate about enquiries submitted by visitors.</li>
            </ul>
            <p className="font-semibold text-[#742C25]">
              We do not sell your personal information.
            </p>
          </section>

          {/* 4. Contact Forms and EmailJS */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              4. Contact Forms and EmailJS
            </h2>
            <p>
              Our website may use EmailJS to process contact and feedback form
              submissions.
            </p>
            <p>
              When you submit a form, the information you provide, such as your
              name, email address, and message, is transmitted through EmailJS
              so that we can receive and respond to your enquiry.
            </p>
            <p>
              EmailJS processes information according to its own privacy and
              security practices.
            </p>
            <p className="italic text-[#742C25]">
              Please avoid submitting passwords, financial information, or other
              sensitive personal information through our contact form.
            </p>
            <p className="text-sm pt-1">
              For more information, refer to the EmailJS Privacy Policy:{' '}
              <a
                href="https://www.emailjs.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#742C25] underline hover:text-[#C79A45] inline-flex items-center gap-1"
              >
                https://www.emailjs.com/legal/privacy-policy/
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </p>
          </section>

          {/* 5. Cookies and Analytics */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              5. Cookies and Analytics
            </h2>
            <p>
              At present, Yatna has not intentionally implemented Google
              Analytics or similar tracking and analytics services.
            </p>
            <p>
              Our website hosting infrastructure or essential website
              functionality may use technical storage or similar technologies
              where necessary.
            </p>
            <p>
              If analytics or additional tracking technologies are introduced in
              the future, this Privacy Policy will be updated to explain their
              purpose and use.
            </p>
            <p>
              Where required, appropriate consent and privacy controls will be
              provided.
            </p>
          </section>

          {/* 6. Advertising and Third-Party Services */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              6. Advertising and Third-Party Services
            </h2>
            <p>
              Yatna does not currently display third-party advertisements.
            </p>
            <p>
              We may consider introducing advertising services, such as Google
              AdSense, in the future to support website maintenance and
              development.
            </p>
            <p>If advertising is introduced:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                Advertising providers may use cookies or similar technologies.
              </li>
              <li>
                Certain information may be processed to display or measure
                advertisements.
              </li>
              <li>
                Advertising and personalization settings may be available
                through the relevant provider.
              </li>
              <li>
                Appropriate consent mechanisms will be implemented where
                legally required.
              </li>
            </ul>
            <p>
              Any advertising services introduced will be disclosed through an
              updated Privacy Policy.
            </p>
            <p className="text-sm pt-1">
              Google Privacy Policy:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#742C25] underline hover:text-[#C79A45] inline-flex items-center gap-1"
              >
                https://policies.google.com/privacy
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </p>
          </section>

          {/* 7. Data Sharing and Disclosure */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              7. Data Sharing and Disclosure
            </h2>
            <p className="font-semibold text-[#742C25]">
              Yatna does not sell or rent users' personal information.
            </p>
            <p>
              Information may be processed by third-party service providers when
              necessary to operate the website and provide requested services,
              such as:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>EmailJS for contact form submissions.</li>
              <li>Website hosting and infrastructure providers.</li>
              <li>Other service providers introduced in the future.</li>
            </ul>
            <p>
              Information may also be disclosed where required by applicable law
              or a valid legal request.
            </p>
          </section>

          {/* 8. Data Storage and Security */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              8. Data Storage and Security
            </h2>
            <p>
              We take reasonable measures to protect information handled
              through our website and application.
            </p>
            <p className="font-semibold">
              For the current mobile application design:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>No account or registration is required.</li>
              <li>
                Mantra and Sadhana progress is stored locally on the device.
              </li>
              <li>
                No Yatna user account database is used for this progress.
              </li>
              <li>
                Users remain responsible for maintaining their device and its
                stored data.
              </li>
            </ul>
            <p>
              Contact form submissions are processed through EmailJS and may be
              retained in the associated email or service account.
            </p>
            <p className="text-sm text-[#76665A] italic">
              Although we take reasonable precautions, no internet transmission
              or electronic storage method can be guaranteed to be completely
              secure.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              9. Children's Privacy
            </h2>
            <p>
              Yatna is intended to be a general devotional and informational
              platform.
            </p>
            <p>
              We do not intentionally request children to submit personal
              information.
            </p>
            <p>
              If a parent or legal guardian believes that a child has submitted
              personal information through our website, they may contact us to
              request its review and deletion where applicable.
            </p>
          </section>

          {/* 10. External Links */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              10. External Links
            </h2>
            <p>Our website may contain links to external websites, including:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Google Maps</li>
              <li>Google Play Store</li>
              <li>Temple-related information sources</li>
              <li>Other devotional or informational resources</li>
            </ul>
            <p>
              These external websites operate independently and have their own
              privacy policies.
            </p>
            <p>
              Yatna is not responsible for the privacy practices, content, or
              security of third-party websites.
            </p>
            <p>
              We encourage visitors to review the privacy policies of external
              services before using them.
            </p>
          </section>

          {/* 11. Your Privacy Rights */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              11. Your Privacy Rights
            </h2>
            <p>Depending on applicable law, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                Request information about personal data we hold about you.
              </li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of information where applicable.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Raise concerns about how your information is handled.</li>
            </ul>
            <p>
              For information submitted through our contact form, you may
              contact us using the details provided below.
            </p>
            <p>
              For information stored locally in the mobile application, you can
              manage or delete the application's stored data through the
              relevant device settings. Deleting the application may also remove
              locally stored progress.
            </p>
          </section>

          {/* 12. Future Updates and Features */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              12. Future Updates and Features
            </h2>
            <p>
              Yatna may introduce additional services in the future, such as:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Website analytics.</li>
              <li>Advertising services.</li>
              <li>Additional devotional features.</li>
              <li>Cloud backup or synchronization.</li>
              <li>Optional user accounts.</li>
              <li>Additional third-party integrations.</li>
            </ul>
            <p>
              These features are not necessarily available or active at present.
            </p>
            <p>
              If a future feature changes how personal information is collected,
              stored, or processed, this Privacy Policy will be updated
              accordingly.
            </p>
            <p>
              Where required, users will be provided with appropriate
              information and consent options before the relevant processing
              begins.
            </p>
          </section>

          {/* 13. Changes to This Privacy Policy */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              13. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our services, technology, or applicable legal
              requirements.
            </p>
            <p>
              Any updates will be published on this page along with a revised
              Last Updated date.
            </p>
            <p>We encourage visitors to review this page periodically.</p>
          </section>

          {/* 14. Contact Us */}
          <section className="space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#742C25]">
              14. Contact Us
            </h2>
            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy or the handling of your information, please contact
              us through our website's Contact & Feedback section.
            </p>
            <div className="pt-2 space-y-1 text-base">
              <p className="font-bold text-[#742C25]">Yatna (ಯತ್ನ)</p>
              <p>
                Website:{' '}
                <a
                  href="https://yatna.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#742C25] underline hover:text-[#C79A45]"
                >
                  https://yatna.org
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info@karyasiddhianjaneya.org"
                  className="text-[#742C25] underline hover:text-[#C79A45]"
                >
                  info@karyasiddhianjaneya.org
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Simple Bottom Return Link (No Footer) */}
        <div className="mt-14 pt-8 border-t border-[#D9C7AA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#76665A] italic text-center sm:text-left">
            Yatna is committed to respecting your privacy while providing a
            simple and meaningful devotional experience.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-[#742C25] font-semibold hover:text-[#C79A45] transition-colors cursor-pointer group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>
              {langIndex === 0 ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Home'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
