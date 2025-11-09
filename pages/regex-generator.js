import Head from 'next/head';
import { useState } from 'react';

export default function RegexGenerator(){
  const [prompt,setPrompt] = useState('regex for valid Indian mobile number');
  const [out,setOut] = useState(null);
  const [loading,setLoading] = useState(false);

  async function submit(){
    setLoading(true); setOut(null);
    try{
      const res = await fetch('/api/regex',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
      const j = await res.json();
      setOut(j);
    }catch(e){ setOut({error: e.message}); }
    setLoading(false);
  }

  return (
    <div className="container">
      <Head>
        <title>Regex Generator — AI Dev Tools</title>
        <meta name="description" content="Convert plain English to Regular Expressions using open AI models. Examples, explanations, and copy-to-clipboard." />
      </Head>

      <h1>Regex Generator</h1>
      <p className="small">Enter a natural-language description (e.g., "match email addresses") and get a regex with a short explanation.</p>

      <div className="card">
        <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
        <div style={{marginTop:10}}>
          <button onClick={submit} disabled={loading}>{loading?'Generating...':'Generate Regex'}</button>
        </div>
        {out && <div style={{marginTop:12}}>
          <h4>Result</h4>
          <pre>{JSON.stringify(out,null,2)}</pre>
        </div>}
      </div>

      <div className="card">
        <h4>Examples</h4>
        <ul>
          <li>Regex for email addresses</li>
          <li>Regex to match dates in DD-MM-YYYY</li>
          <li>Regex to validate IPv4 addresses</li>
        </ul>
      </div>
    </div>
  );
}