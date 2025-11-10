import Head from "next/head";

export default function RegexExamples() {
  return (
    <>
      <Head>
        <title>Top 5 Regex Examples for Everyday Use | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn the top 5 regular expression patterns every developer should know, plus generate your own with our AI Regex Generator."
        />
        <meta property="og:title" content="Top 5 Regex Examples for Everyday Use" />
        <meta
          property="og:description"
          content="Quick guide to useful regex patterns — from email validation to URL matching."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/regex-examples" />
        <meta property="og:type" content="article" />
      </Head>

      <main className="max-w-3xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Top 5 Regex Examples for Everyday Use
        </h1>
        <p className="mb-4">
          Regular expressions (regex) can look scary, but they’re incredibly powerful once you learn
          the basics. Here are a few examples that every developer should keep handy:
        </p>

        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <code>{`^\\d+$`}</code> — match only numbers.
          </li>
          <li>
            <code>{`^[A-Za-z]+$`}</code> — match only letters.
          </li>
          <li>
            <code>{`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$`}</code> — validate email.
          </li>
          <li>
            <code>{`https?:\\/\\/[^\\s]+`}</code> — find URLs in text.
          </li>
          <li>
            <code>{`\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b`}</code> — case-insensitive email match.
          </li>
        </ul>

        <p>
          Want to skip memorizing these patterns? Try our free{" "}
          <a href="/regex-generator" className="text-blue-600 underline">
            AI Regex Generator
          </a>{" "}
          and build custom regex instantly.
        </p>
      </main>
    </>
  );
}
