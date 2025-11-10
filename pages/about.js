import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Dev Brains AI | Free AI Developer Tools</title>
        <meta
          name="description"
          content="Learn about Dev Brains AI — a platform offering free AI-powered developer tools like Regex and SQL Generators to boost productivity."
        />
        <meta property="og:title" content="About Dev Brains AI" />
        <meta
          property="og:description"
          content="Discover how Dev Brains AI helps developers save time with smart, free AI tools."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/about" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="max-w-3xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-semibold mb-4 text-center">About Dev Brains AI</h1>
        <p className="mb-4">
          Dev Brains AI is a free online toolkit built to help developers work faster using
          artificial intelligence. Our goal is to make complex technical tasks — like generating
          regular expressions or writing SQL queries — simple, accurate, and instant.
        </p>
        <p className="mb-4">
          We use open-source AI models and automation to bring practical, everyday tools for
          developers, students, and data analysts. Each tool on this site is designed to save you
          time and let you focus on solving real problems instead of memorizing syntax.
        </p>
        <p>
          Dev Brains AI is continuously evolving. We plan to add more tools, tutorials, and learning
          resources that make coding easier and more enjoyable.
        </p>
      </main>
    </>
  );
}
