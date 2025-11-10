import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Dev Brains AI</title>
        <meta
          name="description"
          content="Contact Dev Brains AI for feedback, feature requests, or support on our free AI developer tools."
        />
        <meta property="og:title" content="Contact Dev Brains AI" />
        <meta
          property="og:description"
          content="Get in touch with the Dev Brains AI team for help or suggestions."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/contact" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-3xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-semibold mb-4 text-center">Contact Us</h1>
        <p className="mb-4">
          Have feedback, questions, or suggestions for new tools? We’d love to hear from you!
        </p>
        <p className="mb-4">You can reach us directly at:</p>
        <p className="font-medium">📧 rampandu.cheti@gmail.com</p>
        <p className="mt-6">We usually reply within 24 hours on business days.</p>
      </main>
    </>
  );
}
