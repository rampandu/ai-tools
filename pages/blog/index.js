// pages/blog/index.js
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function BlogIndex({ posts }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dev-brains-ai.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://dev-brains-ai.com/blog",
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 22 }}>
      <Head>
        <title>Dev Brains AI Blog — Regex & SQL with AI</title>
        <meta
          name="description"
          content="Browse Dev Brains AI blog posts on regular expressions, SQL, and practical AI tools for developers."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Ads */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17753334820"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17753334820');
            `,
          }}
        />
      </Head>

      <div className="card" style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: "flex", flexWrap: "wrap", gap: 4, listStyle: "none", padding: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Blog</li>
          </ol>
        </nav>

        <h1>Dev Brains AI Blog</h1>
        <p className="small">
          Tutorials and practical guides on regular expressions, SQL, and AI-powered developer tools.
        </p>

        <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
          {posts.map((post) => (
            <li key={post.slug} className="card small" style={{ marginBottom: 12, padding: 12 }}>
              <h2 style={{ marginBottom: 4, fontSize: "1.1rem" }}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {post.description && (
                <p className="small" style={{ marginTop: 4 }}>
                  {post.description}
                </p>
              )}

              <Link href={`/blog/${post.slug}`} className="small">
                Read article →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// ✅ Auto-load ALL blogs
export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "pages", "blog");

  const files = fs.readdirSync(blogDir)
    .filter(
      (f) =>
        f.endsWith(".js") &&
        f !== "index.js" &&
        !f.startsWith("_")
    );

  const posts = files.map((file) => {
    const slug = file.replace(".js", "");

    return {
      slug,
      title: slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      description: "",
    };
  });

  return {
    props: { posts },
  };
}