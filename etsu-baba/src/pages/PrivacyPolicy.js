import React from "react";
import { FiInfo, FiShield, FiShare2, FiMail, FiLock } from "react-icons/fi";
import { MdOutlinePolicy } from "react-icons/md";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 font-montserrat text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Etsu Baba Progressive Foundation values your privacy and is
            committed to protecting your personal information. This policy
            outlines how we collect, use, and safeguard the data you share with
            us.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Information We Collect",
              text: "We may collect personal information such as your name, email address, and message details when you contact us through our website. We also gather non-identifying data like browser type and usage patterns to help improve our services.",
            },
            {
              title: "How We Use Your Information",
              text: "Your information is used to respond to your inquiries, improve our website, and send updates related to our mission. We do not sell or rent your personal information to third parties.",
            },
            {
              title: "How We Protect Your Information",
              text: "We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, or disclosure.",
            },
            {
              title: "Sharing of Information",
              text: "We do not share your personal information with outside parties except when required by law or to protect our rights.",
            },
            {
              title: "Your Rights",
              text: "You have the right to request access to, correction of, or deletion of your personal information. Please contact us to exercise these rights.",
            },
            {
              title: "Changes to This Policy",
              text: "We may update this policy from time to time. Any changes will be posted on this page with an updated revision date.",
            },
            {
              title: "Contact",
              text: (
                <>
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:etsubabafoundation@gmail.com"
                    className="text-yellow-800 font-semibold hover:underline"
                  >
                    etsubabafoundation@gmail.com
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
}
