// pages/terms.js
import Head from 'next/head';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — AI Dev Tools</title>
        <meta name="description" content="Terms of service for AI Dev Tools." />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <div className="card">
          <h1>Terms of Service</h1>
          <p className="small">By using AI Dev Tools you agree to the following terms. This is a simple demo and does not provide warranties.</p>

          <h3>Use at your own risk</h3>
          <p className="small">Generated regex and SQL should be reviewed before use. We are not responsible for losses due to incorrect or unsafe queries.</p>

          <h3>Privacy</h3>
          <p className="small">See the Privacy page for details on data storage and analytics.</p>

          <div style={{ marginTop: 18 }}>
            <Link href="/"><button>Back home</button></Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
