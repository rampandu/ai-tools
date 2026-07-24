
/** Minimal Next.js config. Adjust as needed for deployment. */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      // Consolidated into /blog/regex-for-indian-id-document-validation (2026-07-24)
      // to fix Google's "low value content" flag on near-duplicate, single-topic posts.
      { source: '/blog/regex-for-aadhaar-card-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-pan-card-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-gst-number-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-ifsc-code-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-indian-passport-number-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-indian-phone-number-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-indian-pin-code-validation', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },
      { source: '/blog/regex-for-driving-license-number-validation-india', destination: '/blog/regex-for-indian-id-document-validation', permanent: true },

      // Consolidated into /blog/sql-interview-questions-complete-guide (2026-07-24) —
      // 4 posts covering the same core SQL interview question pool, split only by
      // company/audience keyword (freshers, TCS/Infosys/Wipro, Accenture/Capgemini, JOIN-specific).
      { source: '/blog/sql-interview-questions-for-freshers-with-answers', destination: '/blog/sql-interview-questions-complete-guide', permanent: true },
      { source: '/blog/sql-join-interview-questions-with-examples', destination: '/blog/sql-interview-questions-complete-guide', permanent: true },
      { source: '/blog/sql-queries-asked-in-accenture-capgemini-interviews', destination: '/blog/sql-interview-questions-complete-guide', permanent: true },
      { source: '/blog/top-sql-interview-questions-tcs-infosys-wipro', destination: '/blog/sql-interview-questions-complete-guide', permanent: true },
    ];
  }
};
module.exports = nextConfig;


