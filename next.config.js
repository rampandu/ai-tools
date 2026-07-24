
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
    ];
  }
};
module.exports = nextConfig;


