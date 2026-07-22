// pages/blog/docker-errors-for-beginners-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function DockerErrorsForBeginnersExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Docker Errors for Beginners Explained',
        item: 'https://dev-brains-ai.com/blog/docker-errors-for-beginners-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '5 Common Docker Errors and How to Fix Them Fast',
    description:
      'Stuck on a Docker error? Get fast fixes for the 5 most common beginner issues — port already in use, daemon not connecting, no space left, and image not found.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/docker-errors-for-beginners-explained',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does Docker say "port is already allocated"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This means another container, or a process on your host machine, is already using that port. Stop the conflicting container with "docker ps" and "docker stop", or map your container to a different host port with -p.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fix "Cannot connect to the Docker daemon"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This means the Docker service is not running. On Linux, start it with "sudo systemctl start docker". On Windows and Mac, open Docker Desktop and wait for it to fully start before running docker commands.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fix "no space left on device" in Docker?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Docker images, containers, and volumes accumulate over time and fill disk space. Run "docker system prune -a" to remove unused containers, networks, and images, and "docker volume prune" to remove unused volumes.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>5 Common Docker Errors and How to Fix Them Fast | Dev Brains AI</title>
        <meta
          name="description"
          content="Stuck on a Docker error? Get fast fixes for the 5 most common beginner issues — port already in use, daemon not connecting, no space left, and image not found."
        />
        <meta
          name="keywords"
          content="docker errors, docker port already in use, cannot connect to docker daemon, docker no space left on device, docker image not found, docker beginner errors"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/docker-errors-for-beginners-explained" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Docker Errors for Beginners Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Docker Errors for Beginners Explained
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Docker is one of the most useful tools a developer can learn, but its error messages are
            often terse and confusing when you're just starting out. This guide walks through the
            Docker errors beginners hit most often — what causes each one and exactly how to fix it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. "Port is already allocated"
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This happens when you try to bind a container to a host port that's already in use by
            another container or a local process.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`docker: Error response from daemon: driver failed programming external
connectivity on endpoint web (...): Bind for 0.0.0.0:3000 failed:
port is already allocated.

# Find what's using the port
docker ps

# Stop the conflicting container
docker stop <container_id>

# Or just use a different host port
docker run -p 3001:3000 myapp`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. "Cannot connect to the Docker daemon"
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This means the Docker engine itself isn't running, or your user doesn't have permission
            to talk to it.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Cannot connect to the Docker daemon at unix:///var/run/docker.sock.
Is the docker daemon running?

# Linux — start the service
sudo systemctl start docker

# Linux — add your user to the docker group (avoids needing sudo)
sudo usermod -aG docker $USER
newgrp docker

# Windows / Mac — open Docker Desktop and wait for it to say "running"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. "No space left on device"
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Docker images, stopped containers, unused networks, and dangling volumes all consume
            disk space and are not cleaned up automatically.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# See how much space Docker is using
docker system df

# Remove stopped containers, unused networks, and dangling images
docker system prune

# Also remove unused images (not just dangling ones) and volumes
docker system prune -a --volumes`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Run <code>docker system prune -a --volumes</code> carefully — it deletes anything not
            currently used by a running container, including cached layers you may want to rebuild later.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. "Image not found" / "pull access denied"
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Typo in the image name or tag</strong> — check spelling and that the tag (e.g. <code>:latest</code>, <code>:18-alpine</code>) actually exists on Docker Hub</li>
            <li><strong>Private image, not logged in</strong> — run <code>docker login</code> before pulling from a private registry</li>
            <li><strong>Image only exists locally</strong> — if you built it with <code>docker build -t myapp .</code>, it won't exist on Docker Hub; reference the local tag directly</li>
            <li><strong>Wrong registry</strong> — if using a private registry, prefix the image name with the registry host, e.g. <code>registry.example.com/myapp:latest</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            5. Container Exits Immediately After Starting
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If <code>docker ps</code> shows nothing but <code>docker ps -a</code> shows your container
            with status "Exited", the main process inside the container finished or crashed.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# See what happened
docker ps -a
docker logs <container_id>

# Common causes:
# - CMD in Dockerfile runs a one-off script, not a long-running server
# - The app crashed on startup (missing env var, bad config)
# - Base image expects a foreground process, but CMD forks to background`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            6. Changes to Code Not Reflected in the Container
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A common beginner confusion: editing files locally but the running container still shows
            old behavior. This happens because the image was built once and files were copied in at
            build time — it doesn't watch your filesystem for changes.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Rebuild the image after code changes: <code>docker build -t myapp . && docker run myapp</code></li>
            <li>For local development, mount your source folder as a volume instead: <code>docker run -v $(pwd):/app myapp</code></li>
            <li>Use <code>docker-compose</code> with a <code>volumes:</code> entry so this is automatic every time you run <code>docker-compose up</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does Docker say "port is already allocated"?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This means another container, or a process on your host machine, is already using that port. Stop the conflicting container with <code>docker ps</code> and <code>docker stop</code>, or map your container to a different host port with <code>-p</code>.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I fix "Cannot connect to the Docker daemon"?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This means the Docker service is not running. On Linux, start it with <code>sudo systemctl start docker</code>. On Windows and Mac, open Docker Desktop and wait for it to fully start before running docker commands.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I fix "no space left on device" in Docker?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Docker images, containers, and volumes accumulate over time and fill disk space. Run <code>docker system prune -a</code> to remove unused containers, networks, and images, and <code>docker volume prune</code> to remove unused volumes.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any error message — Docker, Node.js, or API — and get a plain-English explanation
              and a suggested fix. No signup, no cost.
            </p>
            <Link href="/ai-error-explainer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Try AI Error Explainer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/common-api-errors-and-how-to-fix-them">Common API Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/fix-nodejs-errors-beginners-india">Fix Common Node.js Errors — Guide for Beginners in India</Link></li>
              <li><Link href="/blog/common-git-errors-and-how-to-fix-them">Common Git Errors and How to Fix Them</Link></li>
              <li><Link href="/blog/common-nodejs-npm-errors-and-fixes">Common Node.js and npm Errors and Fixes</Link></li>
              <li><Link href="/blog/debugging-memory-leaks-in-nodejs">Debugging Memory Leaks in Node.js</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
