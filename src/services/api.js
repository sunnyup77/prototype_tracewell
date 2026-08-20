// Mock API service to match the locked backend contract.
export async function createInvestigation(url){
  // Simulate network latency
  await new Promise(r=>setTimeout(r, 900 + Math.random()*600));
  return {
    investigation_id: 'inv_' + Math.random().toString(36).slice(2,10),
    root_target_id: 'target_' + Math.random().toString(36).slice(2,8),
    status: 'queued'
  };
}

export async function getInvestigation(id){
  // placeholder
  return { investigation_id: id, status: 'queued' };
}

export function subscribeToInvestigationEvents(id, onEvent){
  // Attempt to connect to a local SSE simulator (dev); otherwise fall back to a fake emitter.
  const url = `http://localhost:4000/events?investigation_id=${encodeURIComponent(id)}`;
  let es;
  let closed = false;

  function safeDispatch(ev){
    try{ onEvent(ev); }catch(e){ console.warn('onEvent handler error', e); }
    // also broadcast to background bus if present
    if(window.tracewellBus){
      if(ev.type === 'job_status_changed'){
        const mode = ev.payload && ev.payload.status === 'running' ? 'investigating' : 'idle';
        window.tracewellBus.dispatchEvent(new CustomEvent('mode',{detail:mode}));
      }
      if(ev.type === 'evidence_created' || ev.type === 'discovery'){
        window.tracewellBus.dispatchEvent(new CustomEvent('mode',{detail:'evidence'}));
      }
      if(ev.type === 'contradiction'){
        window.tracewellBus.dispatchEvent(new CustomEvent('mode',{detail:'contradiction'}));
      }
    }
  }

  if(typeof window !== 'undefined' && typeof window.EventSource !== 'undefined'){
    try{
      es = new EventSource(url);
      es.onmessage = (m)=>{
        // messages may be plain JSON or simple strings
        let data = m.data;
        try{ data = JSON.parse(m.data); }catch(e){}
        if(data && data.type){
          safeDispatch(data);
        } else {
          // generic message
          safeDispatch({type:'investigation_terminal', payload:{message: m.data}});
        }
      };
      es.addEventListener('error', (err)=>{
        // gracefully fallback
        // console.warn('SSE error', err);
      });

      return ()=>{ closed = true; if(es) es.close(); };
    }catch(e){
      // fall through to fake emitter
    }
  }

  // Fake emitter fallback
  let running = true;
  const timers = [];
  function emit(ev){ if(!running) return; safeDispatch(ev); }

  timers.push(setTimeout(()=>emit({type:'job_status_changed', payload:{status:'running'}}), 800));
  timers.push(setTimeout(()=>emit({type:'target_status_changed', payload:{status:'acquired'}}), 1400));
  timers.push(setTimeout(()=>emit({type:'observation_state_changed', payload:{stage:'page_observed'}}), 2000));
  timers.push(setTimeout(()=>emit({type:'observation_state_changed', payload:{stage:'data_extracted'}}), 2800));
  timers.push(setTimeout(()=>emit({type:'evidence_created', payload:{evidence_id:'e_'+Math.random().toString(36).slice(2,8)}}), 3600));
  timers.push(setTimeout(()=>emit({type:'discovery', payload:{summary:'IMAGE REUSE — HIGH'}}), 4200));
  timers.push(setTimeout(()=>emit({type:'observation_state_changed', payload:{stage:'network_inspected'}}), 5200));
  timers.push(setTimeout(()=>emit({type:'contradiction', payload:{field:'stock',observed:'ONLY 2 LEFT',network:47}}), 6800));
  timers.push(setTimeout(()=>emit({type:'investigation_terminal', payload:{message:'investigation queued -> running -> evidence'}}),7400));
  timers.push(setTimeout(()=>emit({type:'job_status_changed', payload:{status:'completed'}}),9000));

  return ()=>{ running=false; timers.forEach(t=>clearTimeout(t)); };
}
