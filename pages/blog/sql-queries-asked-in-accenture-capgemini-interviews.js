
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>SQL Queries Asked in Accenture Capgemini Interviews</title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "SQL Queries Asked in Accenture Capgemini Interviews",
              author: { "@type": "Organization", name: "Dev-Brains-AI" },
              publisher: { "@type": "Organization", name: "Dev-Brains-AI" }
            })
          }}
        />
      </Head>

      <main style={{ padding: 20 }}>
        <h1>SQL Queries Asked in Accenture Capgemini Interviews</h1>

        <p>
          This guide is created for Indian developers using Node.js, Python, SQL,
          and AI tools.
        </p>

        <p>
          Try Dev-Brains-AI tools → https://dev-brains-ai.com/
        </p>
      </main>
    </>
  );
}
