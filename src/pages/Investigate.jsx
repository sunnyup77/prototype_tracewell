import React, { useState } from "react";
import { createInvestigation } from "../services/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Investigate(){
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e){
    e && e.preventDefault();
    if(!url) return setStatus({type:'error',text:'Please paste a URL.'});
    setBusy(true);
    setStatus(null);
    try{
      const res = await createInvestigation(url);
      setStatus({type:'ok',text:`Investigation queued — ${res.investigation_id}`});
      // cinematic pause then navigate to live investigating route (mocked)
      setTimeout(()=>{
        navigate(`/investigating/${res.investigation_id}`);
      }, 600);
    }catch(err){
      setStatus({type:'error',text:'Failed to queue investigation.'});
    }finally{ setBusy(false); }
  }

  return (
    <div style={{width:'100%'}}>
      <header className="header-nav">
        <div className="brand">TRACEWELL</div>
        <nav className="menu">
          <div>INVESTIGATE</div>
          <div>EVIDENCE</div>
          <div>ABOUT</div>
        </nav>
      </header>

      <section className="investigate-hero">
        <div className="kicker">QUARTER BY QUARTER FORENSICS</div>
        <h2 className="hero-title">THE WEB<br/>LEAVES<br/>EVIDENCE.</h2>
        <p className="hero-sub">Investigate suspicious listings and storefronts across sources, time, sessions, and underlying network data.</p>

        <form className="url-terminal" onSubmit={submit}>
          <div className="terminal-row">
            <div className="terminal-box" style={{flex:1}}>
              <input className="terminal-input" placeholder="PASTE SUSPICIOUS URL HERE..." value={url} onChange={e=>setUrl(e.target.value)} />
            </div>
            <button className="arrow-btn" style={{width:64,height:44}} type="submit" disabled={busy} aria-label="Investigate">
              <div className="arrow-icon" style={{borderColor:'var(--text)'}} />
            </button>
          </div>
        </form>

        {status && <div style={{marginTop:12}} className="status-chip">{status.text}</div>}
      </section>

      <div className="footer-note">SESSION: SESSION_A7F21 • EXTRACTOR_V1.4</div>
    </div>
  );
}
