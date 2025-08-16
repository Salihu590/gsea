import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 font-montserrat text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-800 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Please read these Terms of Service carefully before using the{" "}
            <span className="font-semibold">
              Etsu Baba Progressive Foundation
            </span>{" "}
            website. By accessing or using this site, you agree to be bound by
            these Terms.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Acceptance of Terms",
              text: "These Terms govern your access to and use of the website, services, and content provided by Etsu Baba Progressive Foundation. If you do not agree to these Terms, please do not use the site.",
            },
            {
              title: "Eligibility",
              text: "Membership, access to certain resources, and participation in community activities are intended exclusively for direct descendants of Etsu Baba. The foundation reserves the right to restrict access where necessary.",
            },
            {
              title: "Respectful Use",
              text: "You agree to use the website lawfully and respectfully. You must not post or share unlawful, defamatory, abusive, harassing, or otherwise inappropriate material.",
            },
            {
              title: "User Contributions",
              text: "If you submit content (such as text or images) to the site, you grant the foundation a non-exclusive license to use it for operating and improving the website. You confirm that you have the right to grant this license.",
            },
            {
              title: "Intellectual Property",
              text: "All site content, including design, graphics, logos, and text, are the intellectual property of Etsu Baba Progressive Foundation or used with permission. You may not copy, modify, or distribute content without written consent.",
            },
            {
              title: "Privacy",
              text: "Personal data collected through the site is handled in accordance with our Privacy Policy. By using the site, you consent to these practices.",
            },
            {
              title: "Communications",
              text: "Messages sent to the foundation will be handled by authorized representatives. We may use your contact details to respond and share relevant community information.",
            },
            {
              title: "Disclaimer & Limitation of Liability",
              text: "The site is provided 'as is' without warranties of any kind. The foundation is not responsible for any indirect or consequential damages from using the site.",
            },
            {
              title: "Indemnification",
              text: "By using this site, you agree to indemnify and hold harmless the Etsu Baba Progressive Foundation, its representatives, and members from any claims or liabilities resulting from misuse of the site or violation of these Terms.",
            },
            {
              title: "Governing Law",
              text: "These Terms are governed by the laws of Nigeria. Any disputes will be handled within Nigerian courts unless otherwise agreed in writing.",
            },
            {
              title: "Updates to Terms",
              text: "The foundation may update these Terms from time to time. Updated Terms will be posted with a 'last updated' date. Continued use of the site indicates acceptance.",
            },
            {
              title: "Contact",
              text: (
                <>
                  For questions about these Terms, please contact us at{" "}
                  <a
                    href="mailto:infoetsubaba@gmail.com"
                    className="text-yellow-800 font-semibold hover:underline"
                  >
                    infoetsubaba@gmail.com
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+2348065699101"
                    className="text-yellow-800 font-semibold hover:underline"
                  >
                    +234 806 569 9101
                  </a>
                  .
                </>
              ),
            },
          ].map((section, index) => (
            <section
              key={index}
              className="p-6 bg-gray-50 rounded-lg border-l-4 border-yellow-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                {section.title}
              </h2>
              <p className="leading-relaxed text-gray-700">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="text-sm text-gray-500 mt-10 text-center">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
