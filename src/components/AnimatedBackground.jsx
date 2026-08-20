import React, { useEffect, useRef, useState } from "react";
import "./AnimatedBackground.css";

export default function AnimatedBackground(){
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('idle');

  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mq.matches) return; // disable

    // create global event bus if missing so other modules can influence background
    if(!window.tracewellBus) window.tracewellBus = new EventTarget();

    const particleRef = { count: 60 };
    const flashRef = { now: false };

    function setModeFromBus(mode){
      if(mode === 'idle'){
        particleRef.count = 60;
        document.documentElement.style.setProperty('--scan-duration','8s');
      }else if(mode === 'investigating'){
        particleRef.count = 110;
        document.documentElement.style.setProperty('--scan-duration','5.8s');
      }else if(mode === 'evidence'){
        particleRef.count = 140;
        document.documentElement.style.setProperty('--scan-duration','4.5s');
        flashRef.now = true;
      }else if(mode === 'contradiction'){
        particleRef.count = 100;
        document.documentElement.style.setProperty('--scan-duration','3.5s');
        flashRef.now = true;
      }
      setMode(mode);
    }

    window.tracewellBus.addEventListener('mode', (ev)=>{
      setModeFromBus(ev.detail);
    });

    let raf;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, t=0;

    function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function draw(){
      t += 0.9;
      ctx.clearRect(0,0,w,h);
      // film grain layer (light documentary texture)
      const imgData = ctx.createImageData(w, h);
      for(let i=0;i<imgData.data.length;i+=4){
        const v = (Math.random()*24)|0;
        imgData.data[i]=imgData.data[i+1]=imgData.data[i+2]=12+v;
        imgData.data[i+3]=6; // low alpha
      }
      ctx.putImageData(imgData,0,0);

      // subtle particles (data points)
      const pCount = Math.max(30, particleRef.count);
      for(let i=0;i<pCount;i++){
        const seed = i*73.13;
        const x = (Math.sin((t*0.0008+seed)*0.5)+1)*0.5*(w);
        const y = ( (seed*0.1 + t*0.12) % h );
        const alpha = 0.02 + (i%7)/700;
        ctx.fillStyle = `rgba(200,200,200,${alpha})`;
        ctx.beginPath();ctx.arc(x,y,1 + (i%5)*0.08,0,Math.PI*2);ctx.fill();
      }

      // occasional connecting lines when flashing
      if(flashRef.now || (Math.floor(t) % 300 < 90)){
        ctx.strokeStyle = 'rgba(180,190,180,0.035)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(w*0.18, h*0.23);
        ctx.lineTo(w*0.42, h*0.48);
        ctx.lineTo(w*0.68, h*0.31);
        ctx.stroke();
      }

      // transient flash burnout
      if(flashRef.now){
        flashRef.now = false; // one-shot then cool down
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  },[]);

  // Background state reaction stub
  useEffect(()=>{
    // placeholder: in future subscribe to investigation state and setMode
  },[]);

  return (
    <div className="animated-bg" aria-hidden>
      <canvas ref={canvasRef} className="bg-canvas" />
      <svg className="bg-grid" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <pattern id="tinyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f100f" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tinyGrid)" opacity="0.06" />
      </svg>

      <div className="scanline" />

      <div className="data-noise" aria-hidden>
        <span style={{left:'8%'}}>OBS_0184</span>
        <span style={{left:'22%', top:'40%'}}>TARGET_029</span>
        <span style={{left:'70%', top:'28%'}}>SESSION_A7F21</span>
        <span style={{left:'82%', top:'62%'}}>EXTRACTOR_V1.4</span>
      </div>
    </div>
  );
}
