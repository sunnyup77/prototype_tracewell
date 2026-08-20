import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subscribeToInvestigationEvents, getInvestigation } from "../services/api";
import { motion } from "framer-motion";

export default function Investigating(){
  const { id } = useParams();
  const nav = useNavigate();
  const [meta, setMeta] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('queued');
  const mounted = useRef(true);

  useEffect(()=>{
    mounted.current = true;
    let unsub;
    async function init(){
      try{
        const info = await getInvestigation(id);
        if(!mounted.current) return;
        setMeta(info);
        setStatus(info.status || 'queued');
      }catch(e){ }

      unsub = subscribeToInvestigationEvents(id, (ev)=>{
        if(!mounted.current) return;
        setLogs(l=>[{ts: new Date().toISOString(), ev}, ...l].slice(0,50));
        if(ev.type === 'job_status_changed') setStatus(ev.payload && ev.payload.status);
      });
    }
    init();

    return ()=>{ mounted.current = false; if(typeof unsub === 'function') unsub(); };
  },[id]);

  function renderLine(ev){
    const t = new Date(ev.ts).toLocaleTimeString();
    const d = ev.ev;
    if(d.type === 'evidence_created'){
      return `${t} • EVIDENCE_CREATED ${d.payload && d.payload.evidence_id}`;
    }
    if(d.type === 'discovery'){
      return `${t} • DISCOVERY • ${d.payload && d.payload.summary}`;
    }
    if(d.type === 'contradiction'){
      return `${t} • CONTRADICTION • ${d.payload && d.payload.field}`;
    }
    if(d.type === 'observation_state_changed'){
      return `${t} • OBSERVATION • ${d.payload && d.payload.stage}`;
    }
    if(d.type === 'job_status_changed'){
      return `${t} • JOB • ${d.payload && d.payload.status}`;
    }
    return `${t} • ${d.type} ${JSON.stringify(d.payload || {})}`;
  }

  return (
    <div style={{width:'100%',display:'flex',gap:28}}>
      <aside style={{width:420,flexShrink:0}}>
        <div style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)'}}>INVESTIGATION</div>
        <h3 style={{fontFamily:'Cormorant Garamond',fontSize:22,marginTop:8}}>{meta && (meta.investigation_id || id)}</h3>
        <div style={{marginTop:12,fontFamily:'Space Mono'}}>
          <div>STATUS: <strong style={{letterSpacing:0.6}}>{status}</strong></div>
          <div style={{marginTop:10}}>TARGET: <span style={{color:'var(--muted)'}}>example.com/listing/123</span></div>
          <div style={{marginTop:8}}>SESSION: <span style={{color:'var(--muted)'}}>SESSION_A7F21</span></div>
        </div>

        <div style={{marginTop:20,borderTop:'1px solid var(--border)',paddingTop:12}}>
          <div style={{fontFamily:'Space Mono',fontSize:12,color:'var(--muted)'}}>LIVE ACTIVITY</div>
          <div style={{marginTop:10,display:'flex',flexDirection:'column',gap:8}}>
            {["BROWSER SESSION ACTIVE","PAGE LOADED","LISTING EXTRACTION","IMAGE COLLECTION","CROSS-WEB INVESTIGATION","TEMPORAL OBSERVATION","NETWORK ANALYSIS"].map((s,i)=> (
              <div key={s} style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:10,height:10,borderRadius:2,background: i<2? 'var(--accent-confirm)':'rgba(255,255,255,0.04)'}}></span>
                <div style={{fontFamily:'Space Mono',fontSize:13,color: i<2? 'var(--text)':'var(--muted)'}}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:20}}>
          <button onClick={()=>nav('/investigate')} className="arrow-btn" style={{height:38,width:140,fontFamily:'Space Mono'}}>← BACK</button>
        </div>
      </aside>

      <section style={{flex:1}}>
        <div style={{fontFamily:'Space Mono',color:'var(--muted)',marginBottom:10}}>LIVE LOG</div>
        <motion.div layout style={{background:'rgba(255,255,255,0.01)',padding:18,border:'1px solid var(--border)',minHeight:240,overflow:'auto'}}>
          {logs.length === 0 && <div style={{color:'var(--muted)'}}>No events yet — awaiting SSE or simulator.</div>}
          {logs.map(l=> (
            <div key={l.ts} style={{fontFamily:'Space Mono',fontSize:13,color:'var(--text)',padding:'8px 0',borderBottom:'1px dashed rgba(255,255,255,0.02)'}}>
              {renderLine(l)}
            </div>
          ))}
        </motion.div>

        <div style={{marginTop:20,fontFamily:'Space Mono',color:'var(--muted)'}}>The background and UI reflect investigation state: investigating → evidence → contradiction.
        </div>
      </section>
    </div>
  );
}
