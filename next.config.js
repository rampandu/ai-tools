
/** Minimal Next.js config. Adjust as needed for deployment. */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      // www -> apex, permanent. Vercel's automatic domain-alias redirect for
      // the www subdomain was observed serving a 307 (temporary) instead of
      // a 301/308, which Google Search Console flagged as a failed
      // "Page with redirect" validation - a temporary redirect doesn't
      // reliably signal to transfer ranking/index status to the apex domain.
      // This app-level rule fires with permanent:true (308) if the request
      // reaches Next.js; if Vercel's platform-level alias redirect is what's
      // actually serving the 307, it happens before this code ever runs and
      // needs fixing in Vercel's dashboard (Project -> Settings -> Domains)
      // instead.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.dev-brains-ai.com' }],
        destination: 'https://dev-brains-ai.com/:path*',
        permanent: true,
      },

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

      // Consolidated into /blog/json-parsing-errors-common-causes-and-fixes (2026-07-28) —
      // ~80% content overlap (trailing commas, single quotes, unquoted keys, undefined values
      // covered in both). Google's own indexing system flagged this one as a Soft 404,
      // independently confirming the duplicate-content diagnosis.
      { source: '/blog/fix-invalid-json-error-in-nodejs', destination: '/blog/json-parsing-errors-common-causes-and-fixes', permanent: true },

      // Consolidated into /blog/ai-projects-for-engineering-students-india (2026-07-28) —
      // ~95% duplicate: same 20 project ideas with only cosmetic rewording, both from an
      // earlier low-quality batch (raw <b> tags, plain-text URLs, no Link components).
      { source: '/blog/best-ai-projects-for-final-year-btech', destination: '/blog/ai-projects-for-engineering-students-india', permanent: true },
    ];
  }
};
module.exports = nextConfig;


