// pages/contact.js
import Head from 'next/head';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — AI Dev Tools</title>
        <meta name="description" content="Contact AI Dev Tools for feedback, bug reports, or partnership." />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <div className="card">
          <h1>Contact</h1>
          <p className="small">Have feedback, bug reports, or partnership inquiries? Use the email below.</p>

          <div style={{ marginTop: 12 }}>
            <strong>Email</strong>
            <div className="small"><a href="mailto:youremail@example.com">youremail@example.com</a></div>
          </div>

          <div style={{ marginTop: 12 }}>
            <strong>Bug reports</strong>
            <div className="small">Paste steps, expected behavior and actual behavior. A screenshot helps.</div>
          </div>

          <div style={{ marginTop: 18 }}>
            <Link href="/"><button>Back home</button></Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
