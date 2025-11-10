import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use | Dev Brains AI</title>
        <meta
          name="description"
          content="Read the Terms of Use for Dev Brains AI — our policies for using the site and AI tools responsibly."
        />
        <meta property="og:title" content="Terms of Use – Dev Brains AI" />
        <meta
          property="og:description"
          content="Understand how you can use Dev Brains AI tools safely and responsibly."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/terms" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-3xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-semibold mb-4 text-center">Terms of Use</h1>
        <p className="mb-4">
          By using Dev Brains AI, you agree to use the tools and content on this site responsibly.
          We provide all AI-generated outputs “as is,” without any guarantee of accuracy or fitness
          for a particular purpose.
        </p>
        <p className="mb-4">
          You may use the site’s features for personal or commercial projects provided you do not
          resell or redistribute the tools themselves. All code and content belong to their
          respective owners.
        </p>
        <p>We reserve the right to update these terms and our privacy policy at any time.</p>
      </main>
    </>
  );
}
