// pages/blog/common-git-errors-and-how-to-fix-them.js
import Head from 'next/head';
import Link from 'next/link';

export default function CommonGitErrorsAndHowToFixThem() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Common Git Errors and How to Fix Them',
        item: 'https://dev-brains-ai.com/blog/common-git-errors-and-how-to-fix-them',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '7 Common Git Errors and How to Fix Them Fast',
    description:
      'Stuck on a Git error? Step-by-step fixes for merge conflicts, detached HEAD, unrelated histories, and failed pushes, with commands you can copy.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/common-git-errors-and-how-to-fix-them',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I resolve a Git merge conflict?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open each conflicted file, find the <<<<<<<, =======, >>>>>>> markers, manually edit the code to keep the correct version (or a combination), remove the markers, then run git add on the file and git commit to complete the merge.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does detached HEAD mean in Git?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Detached HEAD means you have checked out a specific commit instead of a branch. Any new commits you make will not belong to any branch and can be lost once you check out something else, unless you create a new branch to save them first.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fix "fatal: refusing to merge unrelated histories"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This happens when merging two branches or repositories that do not share a common commit ancestor, such as after re-initializing a repo. Fix it by adding the --allow-unrelated-histories flag to your git pull or git merge command.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>7 Common Git Errors and How to Fix Them Fast | Dev Brains AI</title>
        <meta
          name="description"
          content="Stuck on a Git error? Step-by-step fixes for merge conflicts, detached HEAD, unrelated histories, and failed pushes, with commands you can copy."
        />
        <meta
          name="keywords"
          content="git errors, git merge conflict fix, detached head git, refusing to merge unrelated histories, failed to push git, git error fixes"
        />
        <meta property="og:title" content="7 Common Git Errors and How to Fix Them Fast" />
        <meta property="og:description" content="Stuck on a Git error? Step-by-step fixes for merge conflicts, detached HEAD, unrelated histories, and failed pushes, with commands you can copy." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/common-git-errors-and-how-to-fix-them" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/common-git-errors-and-how-to-fix-them" />
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
              <li aria-current="page">Common Git Errors</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Common Git Errors and How to Fix Them
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Git's error messages are precise but not always obvious to newcomers. This guide walks
            through four errors nearly every developer hits — merge conflicts, detached HEAD,
            unrelated histories, and failed pushes — with the exact commands to resolve each one
            safely.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Merge Conflict
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Auto-merging src/app.js
CONFLICT (content): Merge conflict in src/app.js
Automatic merge failed; fix conflicts and then commit the result.`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Git couldn't automatically combine changes because both branches edited the same lines.
            Open the file and look for conflict markers:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> feature/change-default-port`}
          </pre>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# 1. Edit the file, keep the correct code, delete the <<<, ===, >>> markers
# 2. Stage the resolved file
git add src/app.js
# 3. Complete the merge
git commit
# (or if mid-rebase)
git rebase --continue`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Detached HEAD
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Note: switching to 'a1b2c3d'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This happens after <code>git checkout &lt;commit-hash&gt;</code> instead of a branch
            name. Any commits made here are not attached to a branch and can be lost.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# If you haven't made new commits yet, just go back:
git checkout main

# If you already made commits you want to keep,
# create a branch right now to save them:
git checkout -b recovered-work
git checkout main
git merge recovered-work`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Refusing to Merge Unrelated Histories
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`fatal: refusing to merge unrelated histories`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This happens when the two branches (or your local repo and a remote) don't share a
            common ancestor commit — common when you initialize a new local repo and then try to
            pull from a remote that already has its own history (like a fresh GitHub repo created
            with a README).
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`git pull origin main --allow-unrelated-histories

# or for a merge directly
git merge other-branch --allow-unrelated-histories`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Expect to resolve merge conflicts afterward since Git now has to reconcile two
            completely separate commit trees.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Failed to Push
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/you/repo.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref.`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The remote branch has commits your local branch doesn't have — typically a teammate
            pushed first. Pull and integrate before pushing again.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Safest: pull with rebase to keep history linear
git pull --rebase origin main
# resolve any conflicts, then:
git push origin main

# Never use --force on a shared branch to "solve" this —
# it overwrites your teammate's commits on the remote.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            General Prevention Tips
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Pull before you start working and before you push, to reduce the odds of a conflict</li>
            <li>Commit small, focused changes — smaller diffs conflict less often and are easier to resolve when they do</li>
            <li>Always check <code>git status</code> before switching branches or pulling, so you know if you have uncommitted work</li>
            <li>Never use <code>git push --force</code> on a shared branch; use <code>--force-with-lease</code> if you must force-push your own feature branch</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I resolve a Git merge conflict?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Open each conflicted file, find the &lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======,
              &gt;&gt;&gt;&gt;&gt;&gt;&gt; markers, manually edit the code to keep the correct
              version (or a combination), remove the markers, then run git add on the file and git
              commit to complete the merge.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does detached HEAD mean in Git?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Detached HEAD means you have checked out a specific commit instead of a branch. Any
              new commits you make will not belong to any branch and can be lost once you check
              out something else, unless you create a new branch to save them first.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I fix "fatal: refusing to merge unrelated histories"?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This happens when merging two branches or repositories that do not share a common
              commit ancestor, such as after re-initializing a repo. Fix it by adding the
              --allow-unrelated-histories flag to your git pull or git merge command.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Debug Errors Faster with AI</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Stuck on a Git error message that doesn't match anything here? Paste it into our
              free AI Error Explainer for an instant, plain-English fix.
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
              <li><Link href="/blog/docker-errors-for-beginners-explained">Docker Errors for Beginners Explained</Link></li>
              <li><Link href="/blog/fix-nodejs-errors-beginners-india">Fix Node.js Errors — Beginners India</Link></li>
              <li><Link href="/blog/common-nodejs-npm-errors-and-fixes">Common Node.js and npm Errors and Fixes</Link></li>
              <li><Link href="/blog/how-to-debug-rest-api-errors-using-ai">How to Debug REST API Errors Using AI</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
