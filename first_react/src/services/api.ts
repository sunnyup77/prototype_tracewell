export type SSEEvent = {
  id: number;
  event: string;
  data: any;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock internal database for the prototype
const MOCK_DB = {
  investigations: new Map<string, any>(),
  timelines: new Map<string, any>(),
};

export async function createInvestigation(url: string) {
  await delay(600);
  const id = crypto.randomUUID();
  const root_target_id = crypto.randomUUID();
  
  MOCK_DB.investigations.set(id, {
    investigation_id: id,
    root_target_id,
    status: "queued",
    hop_depth_limit: 2,
    created_at: new Date().toISOString(),
    idempotency_key: null,
  });

  // Initialize empty timeline
  MOCK_DB.timelines.set(id, {
    investigation_id: id,
    targets: [{
      target_id: root_target_id,
      claims: []
    }]
  });

  return MOCK_DB.investigations.get(id);
}

export async function getInvestigationTimeline(id: string) {
  await delay(200);
  return MOCK_DB.timelines.get(id);
}

// Simulates the SSE stream with strict contract compliance
export function subscribeToInvestigationEvents(
  id: string,
  onEvent: (event: SSEEvent) => void
): () => void {
  let isSubscribed = true;
  let seq = 1;
  const targetId = MOCK_DB.investigations.get(id)?.root_target_id || crypto.randomUUID();

  const emit = (event: string, data: any) => {
    if (!isSubscribed) return;
    onEvent({ id: seq++, event, data });
  };

  const updateTimeline = (claimType: string, label: string, state: string, value: any, failureReason: string | null = null) => {
    const timeline = MOCK_DB.timelines.get(id);
    if (!timeline) return null;
    
    const obsId = crypto.randomUUID();
    
    let claim = timeline.targets[0].claims.find((c: any) => c.claim_type === claimType);
    if (!claim) {
      claim = {
        claim_id: crypto.randomUUID(),
        claim_type: claimType,
        claim_key: label,
        history: []
      };
      timeline.targets[0].claims.push(claim);
    }
    
    claim.history.push({
      observation_id: obsId,
      value: value,
      captured_at: new Date().toISOString(),
      observation_state: state,
      failure_reason: failureReason,
      is_seeded: false
    });
    
    return obsId;
  };

  const runMockInvestigation = async () => {
    if (!isSubscribed) return;
    
    await delay(1000);
    emit("job_status_changed", { investigation_id: id, status: "running" });

    await delay(1500);
    let obsId = updateTimeline("title", "Title", "CONFIRMED", "Luxury Apartment — Riverside");
    emit("observation_state_changed", { observation_id: obsId, target_id: targetId, state: "CONFIRMED", is_seeded: false, failure_reason: null });

    await delay(1200);
    obsId = updateTimeline("price", "Price", "FAILED", null, "Selector .price-tag timeout; DOM structure changed");
    emit("observation_state_changed", { observation_id: obsId, target_id: targetId, state: "FAILED", is_seeded: false, failure_reason: "Selector .price-tag timeout; DOM structure changed" });
    
    await delay(1500);
    emit("repair_step", { triggering_observation_id: obsId, step: "repair_triggered", new_extractor_version_id: null });
    
    await delay(2000);
    obsId = updateTimeline("price", "Price", "UNVERIFIED", "$950 / night");
    emit("observation_state_changed", { observation_id: obsId, target_id: targetId, state: "UNVERIFIED", is_seeded: false, failure_reason: null });

    await delay(1800);
    obsId = updateTimeline("price", "Price", "CONFIRMED", "$950 / night");
    emit("observation_state_changed", { observation_id: obsId, target_id: targetId, state: "CONFIRMED", is_seeded: false, failure_reason: null });

    await delay(1000);
    obsId = updateTimeline("image", "Image", "CONFIRMED", "hero-01.jpg · 1280×960");
    emit("observation_state_changed", { observation_id: obsId, target_id: targetId, state: "CONFIRMED", is_seeded: false, failure_reason: null });

    await delay(800);
    emit("evidence_created", { evidence_id: crypto.randomUUID(), evidence_type: "image_match", target_ids: [targetId] });

    await delay(1200);
    obsId = updateTimeline("contact", "Contact", "CONFIRMED", "+1 555 XXX XXXX");
    emit("observation_state_changed", { observation_id: obsId, target_id: targetId, state: "CONFIRMED", is_seeded: false, failure_reason: null });

    await delay(1500);
    emit("investigation_terminal", { investigation_id: id, status: "completed" });
  };

  runMockInvestigation();

  return () => {
    isSubscribed = false;
  };
}

export async function getEvidenceGraph(id: string) {
  await delay(400);
  return {
    investigation_id: id,
    nodes: [
      { node_type: "target", id: "target-1", summary: { canonical_url: "listings.example.com/4471" } },
      { node_type: "image", id: "image-1", summary: { fingerprint: "phash 3f2a…" } },
      { node_type: "contact", id: "contact-1", summary: { phone: "+1 555 XXX" } },
      { node_type: "target", id: "target-2", summary: { canonical_url: "market-b.example" } },
      { node_type: "target", id: "target-3", summary: { canonical_url: "market-c.example" } },
    ],
    edges: [
      { evidence_id: crypto.randomUUID(), evidence_type: "image_match", connected_node_ids: ["target-1", "image-1"] },
      { evidence_id: crypto.randomUUID(), evidence_type: "contact_match", connected_node_ids: ["target-1", "contact-1"] },
      { evidence_id: crypto.randomUUID(), evidence_type: "image_match", connected_node_ids: ["image-1", "target-2"] },
      { evidence_id: crypto.randomUUID(), evidence_type: "contact_match", connected_node_ids: ["contact-1", "target-3"] },
      { evidence_id: crypto.randomUUID(), evidence_type: "dom_network_contradiction", connected_node_ids: ["target-1"], metrics: { dom_value: "ONLY 2 LEFT", network_value: "stock: 47" } },
    ]
  };
}

export async function getTargetObservationHistory(targetId: string) {
  await delay(300);
  return {
    target_id: targetId,
    observations: [
      { observation_id: crypto.randomUUID(), observed_at: "2026-08-16T12:00:00Z", state: "CONFIRMED", is_seeded: true, value: { stock: 47, price: "$950" } },
      { observation_id: crypto.randomUUID(), observed_at: "2026-08-17T12:00:00Z", state: "CONFIRMED", is_seeded: true, value: { stock: 47, price: "$950" } },
      { observation_id: crypto.randomUUID(), observed_at: "2026-08-18T12:00:00Z", state: "FAILED", failure_reason: "timeout at 12.4s", is_seeded: true },
      { observation_id: crypto.randomUUID(), observed_at: "2026-08-19T12:00:00Z", state: "CONFIRMED", is_seeded: true, value: { stock: 12, price: "$1,188" } },
      { observation_id: crypto.randomUUID(), observed_at: "2026-08-20T12:00:00Z", state: "CONFIRMED", is_seeded: false, value: { stock: 12, price: "$1,188" } },
    ]
  };
}

export async function getObservation(observationId: string) {
  await delay(200);
  return {
    observation_id: observationId,
    network_capture_completeness: "complete",
    captures: [
      { request: "GET /api/product/4471", status: "200 OK", time: "184ms" },
      { request: "GET /api/inventory?sku=4471", status: "200 OK", time: "96ms" },
      { request: "GET /api/availability", status: "200 OK", time: "142ms" },
      { request: "GET /cdn/img/hero-01.jpg", status: "200 OK", time: "311ms" },
      { request: "POST /api/track/view", status: "204", time: "58ms" },
    ]
  };
}
