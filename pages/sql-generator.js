import Head from 'next/head';
import { useState } from 'react';

export default function SQLGenerator(){
  const [prompt,setPrompt] = useState('select name, salary from employees where salary > 50000');
  const [out,setOut] = useState(null);
  const [loading,setLoading] = useState(false);

  async function submit(){
    setLoading(true); setOut(null);
    try{
      const res = await fetch('/api/sql',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
      const j = await res.json();
      setOut(j);
    }catch(e){ setOut({error: e.message}); }
    setLoading(false);
  }

  return (
    <div className="container">
      <Head>
        <title>SQL Generator — AI Dev Tools</title>
        <meta name="description" content="Convert plain English into SQL queries. Support for SELECT, JOIN, GROUP BY examples and safe output." />
      </Head>

      <h1>SQL Query Generator</h1>
      <p className="small">Describe the data you need and get a ready-to-run SQL query. (Always review generated queries before running.)</p>

      <div className="card">
        <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
        <div style={{marginTop:10}}>
          <button onClick={submit} disabled={loading}>{loading?'Generating...':'Generate SQL'}</button>
        </div>
        {out && <div style={{marginTop:12}}>
          <h4>Result</h4>
          <pre>{JSON.stringify(out,null,2)}</pre>
        </div>}
      </div>

      <div className="card">
        <h4>Safety</h4>
        <p className="small">Do not use generated SQL against production systems without review. The tool may produce syntactically-correct but unsafe queries (e.g., missing WHERE clause).</p>
      </div>
    </div>
  );
}