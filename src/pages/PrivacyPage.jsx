import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// NOTE: Before the first ad campaign goes live, confirm with counsel and fill in
// the registered legal entity name and address of the Türkiye / Dubai entities
// (and the VERBİS registration number if the Türkiye entity is required to register).
const CONTACT_EMAIL = "info@wienerlabs.xyz";
const LAST_UPDATED = "19 August 2026";

const sections = [
    {
        id: "who-we-are",
        title: "1. Who We Are",
        blocks: [
            "Wiener Labs (“Wiener Labs”, “we”, “us”, “our”) is a technology company operating under a software laboratory model. We build tokenization infrastructure, decentralized finance protocols, and AI-powered automation tools. We operate from Türkiye and Dubai, United Arab Emirates.",
            "This Privacy Policy explains what personal data we collect through wienerlabs.xyz (the “Site”) and our marketing activities, how we use it, who we share it with, and the rights you have over it. Wiener Labs is the data controller for the processing described here.",
            <p key="contact-line" className="font-[Funnel] text-base sm:text-lg leading-relaxed text-gray-700 mb-5">
                For any question or request relating to this policy, write to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-black font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity">
                    {CONTACT_EMAIL}
                </a>.
            </p>,
        ],
    },
    {
        id: "scope",
        title: "2. Scope",
        blocks: [
            "This policy covers the Site, our newsletter, and the advertising campaigns we run on platforms such as LinkedIn.",
            "It does not cover third-party platforms we link to — including GitHub, X, LinkedIn, Paragraph, and DoraHacks — or the independent products and protocols built by portfolio projects, each of which operates under its own terms and privacy policy.",
        ],
    },
    {
        id: "what-we-collect",
        title: "3. Information We Collect",
        blocks: [
            "Information you give us directly:",
            [
                { label: "Email address", text: "when you subscribe to our mailing list." },
                { label: "Contact details and message content", text: "when you email us or reach out through our social channels about partnerships, investment, careers, or general enquiries." },
            ],
            "Information collected automatically when you visit the Site:",
            [
                { label: "Technical and usage data", text: "recorded by our hosting provider and content delivery network: IP address, browser type and version, device and operating system, referring URL, pages viewed, and the date and time of access." },
                { label: "Cookie and tag data", text: "as described in Section 6 and Section 5." },
            ],
            "We do not ask for, and do not knowingly collect through this Site, government identification numbers, payment card details, wallet private keys or seed phrases, or special categories of personal data such as health, biometric, or political data.",
        ],
    },
    {
        id: "how-we-use",
        title: "4. How We Use Your Information",
        blocks: [
            "We process personal data for the following purposes, on the legal bases indicated (GDPR Art. 6 for visitors in the EEA and UK; KVKK Art. 5 for visitors in Türkiye):",
            [
                { label: "Operating and securing the Site", text: "— our legitimate interests in keeping the Site available, performant, and protected from abuse." },
                { label: "Sending our newsletter and product updates", text: "— your consent, which you can withdraw at any time." },
                { label: "Responding to enquiries and managing business relationships", text: "— our legitimate interests, or steps taken at your request before entering into a contract." },
                { label: "Measuring and improving our marketing", text: "including advertising campaigns — your consent where consent is required for non-essential cookies and tags, otherwise our legitimate interests in understanding campaign performance." },
                { label: "Meeting legal, accounting, and regulatory obligations", text: "— compliance with a legal obligation." },
            ],
            "We do not sell your personal data. We do not use it for automated decision-making that produces legal or similarly significant effects on you.",
        ],
    },
    {
        id: "advertising",
        title: "5. Advertising, LinkedIn, and Conversion Tracking",
        blocks: [
            "We advertise on LinkedIn and may advertise on other professional and social platforms.",
            [
                { label: "Advertising and conversion tags", text: "We may use the LinkedIn Insight Tag, or equivalent conversion-tracking and retargeting tags from other platforms, on the Site. When such a tag is active, it sets cookies and sends the platform technical data — IP address, user agent, timestamp, and the page URL — so that the platform can report on campaign performance and show our ads to people who have visited the Site." },
                { label: "Campaign reporting", text: "Performance reports we receive from advertising platforms are aggregated. They tell us how many people saw, clicked, or converted on a campaign, and the professional attributes of that audience in aggregate; they do not identify you personally to us." },
                { label: "Matched audiences", text: "We may upload business contact lists, such as the email addresses of newsletter subscribers, to build matched or excluded audiences — only where we have a lawful basis to do so, and never to reveal your details to another advertiser." },
                { label: "Independent processing by the platform", text: "LinkedIn and comparable platforms process the data these tags generate as controllers in their own right, under their own privacy policies and for their own purposes, including ad delivery and measurement." },
                { label: "Consent", text: "Where the law requires consent for non-essential cookies and tags, they are activated only after you have given it, and you can change your mind at any time." },
            ],
            <p key="linkedin-links" className="font-[Funnel] text-base sm:text-lg leading-relaxed text-gray-700 mb-5">
                You can read LinkedIn&apos;s own policy at{" "}
                <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-black font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity">
                    linkedin.com/legal/privacy-policy
                </a>{" "}
                and opt out of LinkedIn ad retargeting at{" "}
                <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer" className="text-black font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity">
                    linkedin.com/psettings/guest-controls/retargeting-opt-out
                </a>. LinkedIn members can also manage ad preferences in their account settings.
            </p>,
        ],
    },
    {
        id: "cookies",
        title: "6. Cookies and Similar Technologies",
        blocks: [
            "Cookies are small files stored on your device. We group them into three categories:",
            [
                { label: "Strictly necessary", text: "required for the Site to load, route pages, and stay secure. These cannot be switched off." },
                { label: "Analytics and performance", text: "help us understand which pages are read and where visitors come from, so we can improve the Site." },
                { label: "Advertising", text: "set by advertising platforms such as LinkedIn for conversion measurement and retargeting, as described in Section 5." },
            ],
            "You can block or delete cookies at any time in your browser settings, and most browsers let you refuse third-party cookies by default. Blocking strictly necessary cookies may break parts of the Site. Where a consent banner is displayed, the choices you make there govern all non-essential cookies.",
        ],
    },
    {
        id: "sharing",
        title: "7. Who We Share Data With",
        blocks: [
            "We do not sell or rent personal data. We share it only in these situations:",
            [
                { label: "Infrastructure providers", text: "that host the Site and deliver its content." },
                { label: "Email and newsletter providers", text: "that store our mailing list and deliver messages." },
                { label: "Analytics and advertising platforms", text: "including LinkedIn, as described in Section 5." },
                { label: "Professional advisers", text: "such as legal and accounting counsel, where necessary." },
                { label: "Public authorities and courts", text: "where disclosure is required by applicable law or needed to establish, exercise, or defend legal claims." },
            ],
            "Service providers act on our documented instructions under written agreements and may not use your data for their own unrelated purposes.",
        ],
    },
    {
        id: "transfers",
        title: "8. International Transfers",
        blocks: [
            "We operate from Türkiye and the United Arab Emirates and rely on service providers located in the European Union, the United Kingdom, and the United States. Your personal data may therefore be transferred to and processed in countries other than your own.",
            "For transfers from the EEA or the UK, we rely on an adequacy decision where one applies, or on Standard Contractual Clauses together with any additional safeguards the transfer requires. For transfers subject to KVKK, we rely on the grounds set out in Article 9 of the KVKK, including your explicit consent where no other ground is available. For transfers subject to UAE law, we rely on the transfer grounds permitted under the UAE Personal Data Protection Law.",
        ],
    },
    {
        id: "retention",
        title: "9. How Long We Keep Data",
        blocks: [
            "We keep personal data only as long as it serves the purpose it was collected for:",
            [
                { label: "Newsletter subscriptions", text: "until you unsubscribe, plus a minimal record of the opt-out so that we can honour it." },
                { label: "Enquiry correspondence", text: "up to three years after our last contact, or longer where a legal claim or statutory obligation requires it." },
                { label: "Server and CDN logs", text: "typically up to twelve months." },
                { label: "Advertising and analytics data", text: "for the retention period set by the platform; LinkedIn, for example, deletes Insight Tag event data within its published retention window." },
            ],
        ],
    },
    {
        id: "security",
        title: "10. Security",
        blocks: [
            "The Site is served over encrypted connections (TLS), access to our systems is limited to the people who need it, and we collect the minimum data required for each purpose. No method of transmission or storage is completely secure, so we cannot guarantee absolute security — but if a breach affecting your personal data occurs, we will notify you and the competent authority where the law requires it.",
        ],
    },
    {
        id: "your-rights",
        title: "11. Your Rights",
        blocks: [
            "Depending on where you live, you have some or all of the following rights over your personal data:",
            [
                { label: "Access", text: "to learn whether we process your data and to obtain a copy of it." },
                { label: "Rectification", text: "to have inaccurate or incomplete data corrected." },
                { label: "Erasure", text: "to have your data deleted where there is no valid ground to keep it." },
                { label: "Restriction and objection", text: "including the right to object to direct marketing at any time." },
                { label: "Portability", text: "to receive the data you gave us in a structured, machine-readable format." },
                { label: "Withdrawal of consent", text: "at any time, without affecting processing carried out before the withdrawal." },
                { label: "Non-discrimination", text: "for exercising any of these rights." },
            ],
            "Under Article 11 of the KVKK you may additionally request that we notify third parties to whom your data was transferred of any correction or deletion, object to a result produced solely by automated analysis of your data, and claim compensation for damage caused by unlawful processing.",
            <p key="rights-howto" className="font-[Funnel] text-base sm:text-lg leading-relaxed text-gray-700 mb-5">
                To exercise any of these rights, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20Request`} className="text-black font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity">
                    {CONTACT_EMAIL}
                </a>{" "}
                with the subject line &ldquo;Privacy Request&rdquo;. We respond within thirty days, and within one month for requests under the GDPR. We may ask for information to verify your identity before we act.
            </p>,
            "If you believe we have not handled your data lawfully, you may lodge a complaint with the Turkish Personal Data Protection Authority (KVKK), with the supervisory authority of your country of residence in the EEA or the UK, or with the competent UAE data protection office.",
        ],
    },
    {
        id: "children",
        title: "12. Children",
        blocks: [
            "The Site and our services are intended for professional and business audiences and are not directed at children. We do not knowingly collect personal data from anyone under 18. If you believe a child has given us personal data, contact us and we will delete it.",
        ],
    },
    {
        id: "third-party-and-blockchain",
        title: "13. Third-Party Links and Blockchain Data",
        blocks: [
            "The Site links to external platforms that we do not control. Once you follow such a link, that platform's own privacy policy governs how it handles your data.",
            "Some of the products we build interact with public blockchain networks. Data written to a public blockchain — including transaction records and wallet addresses — is public, permanent, and cannot be modified or erased by us or by anyone else. This Site itself does not collect wallet addresses, on-chain identifiers, or private keys.",
        ],
    },
    {
        id: "changes",
        title: "14. Changes to This Policy",
        blocks: [
            "We may update this policy as our services, our marketing, or the applicable law changes. The current version is always published on this page with a new “Last updated” date. If a change materially affects how we use your personal data, we will give notice through the Site or by email before it takes effect.",
        ],
    },
    {
        id: "contact",
        title: "15. Contact",
        blocks: [
            <p key="contact-block" className="font-[Funnel] text-base sm:text-lg leading-relaxed text-gray-700 mb-5">
                Wiener Labs — Türkiye and Dubai, United Arab Emirates.<br />
                Privacy enquiries and data subject requests:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-black font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity">
                    {CONTACT_EMAIL}
                </a>
            </p>,
        ],
    },
];

function Block({ block }) {
    if (typeof block === 'string') {
        return (
            <p className="font-[Funnel] text-base sm:text-lg leading-relaxed text-gray-700 mb-5">
                {block}
            </p>
        );
    }

    if (Array.isArray(block)) {
        return (
            <ul className="mb-6 space-y-3">
                {block.map((item, index) => (
                    <li key={index} className="flex gap-3 font-[Funnel] text-base sm:text-lg leading-relaxed text-gray-700">
                        <span className="mt-[0.7em] w-1.5 h-1.5 shrink-0 rounded-full bg-black" />
                        <span>
                            {typeof item === 'string' ? item : (
                                <>
                                    <span className="text-black font-semibold">{item.label}</span>
                                    {item.text ? ` ${item.text}` : null}
                                </>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        );
    }

    return block;
}

Block.propTypes = {
    block: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.node,
    ]).isRequired,
};

function PrivacyPage() {
    useEffect(() => {
        document.body.setAttribute("theme", "white");
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-container min-h-screen bg-[var(--light)] pb-24">
            <div className="page-header bg-black text-white pt-14 pb-16 px-6 sm:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white hover:-translate-x-1 transition-all mb-10 font-[Funnel] text-base"
                    >
                        <span className="text-xl leading-none">&larr;</span>
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="font-[Funnel] font-bold text-5xl sm:text-7xl leading-none mb-5">Privacy Policy</h1>
                    <p className="font-[Funnel] text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
                        How Wiener Labs collects, uses, and protects personal data on wienerlabs.xyz and across our marketing.
                    </p>
                    <span className="inline-block border border-white/25 rounded-2xl px-5 py-3 font-[Funnel] text-sm text-gray-400">
                        Last updated: <span className="text-white font-semibold">{LAST_UPDATED}</span>
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-12">
                <nav className="border-2 border-black rounded-2xl bg-white p-6 sm:p-8 mb-14">
                    <h2 className="font-[Funnel] font-bold text-lg mb-4">Contents</h2>
                    <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="font-[Funnel] text-base text-gray-600 hover:text-black transition-colors"
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-8 mb-12">
                        <h2 className="font-[Funnel] font-bold text-2xl sm:text-3xl leading-tight mb-5">
                            {section.title}
                        </h2>
                        {section.blocks.map((block, index) => (
                            <Block key={index} block={block} />
                        ))}
                    </section>
                ))}

                <div className="border-t border-black/10 pt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link to="/" className="font-[Funnel] text-base text-gray-600 hover:text-black transition-colors">
                        &larr; Back to Home
                    </Link>
                    <Link to="/projects" className="font-[Funnel] text-base text-gray-600 hover:text-black transition-colors">
                        View Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPage;
