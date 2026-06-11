"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchStats, fetchAssets, fetchMakes, fetchModels, fetchCoverage,
  uploadAsset, toggleAsset, deleteAsset,
  getToken, setToken, clearToken,
  PortalStats, Asset, CoverageData, MakeOption, ModelOption,
} from "@/lib/adminApi";

const PART_PAGES = [
  ["transmissions-for-sale","Transmissions"],["engines-for-sale","Engines"],
  ["axle-shaft-for-sale","Axle Shaft"],["drive-shaft-for-sale","Drive Shaft"],
  ["differential-for-sale","Differential"],["speedometer-for-sale","Speedometer"],
  ["throttle-body-for-sale","Throttle Body"],["transfer-case-assembly-for-sale","Transfer Case"],
  ["steering-gear-rack-pinion-for-sale","Steering Gear"],["intake-manifold-for-sale","Intake Manifold"],
  ["steering-column-for-sale","Steering Column"],["spindle-knuckle-for-sale","Spindle Knuckle"],
  ["axle-assembly-for-sale","Axle Assembly"],["abs-assembly-for-sale","ABS Assembly"],
];

type Tab = "dashboard" | "upload" | "assets" | "coverage";

export default function AdminPortal() {
  const [authed, setAuthed] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<PortalStats | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [coverage, setCoverage] = useState<CoverageData | null>(null);
  const [makes, setMakes] = useState<MakeOption[]>([]);
  const [models, setModels] = useState<ModelOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");

  // Upload form state
  const [uMakeId, setUMakeId] = useState("");
  const [uModelId, setUModelId] = useState("");
  const [uYear, setUYear] = useState("");
  const [uType, setUType] = useState<"car"|"part">("car");
  const [uSlug, setUSlug] = useState("");
  const [uLabel, setULabel] = useState("");
  const [uVideo, setUVideo] = useState<File|null>(null);
  const [uThumb, setUThumb] = useState<File|null>(null);
  const [uLoading, setULoading] = useState(false);
  const [uMsg, setUMsg] = useState("");
  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [s, a, c, m] = await Promise.all([fetchStats(), fetchAssets(), fetchCoverage(), fetchMakes()]);
      setStats(s); setAssets(a); setCoverage(c); setMakes(m);
    } catch { setMsg("Failed to load data"); }
    setLoading(false);
  }, []);

  useEffect(() => {
    const t = getToken();
    if (t) { setAuthed(true); loadAll(); }
  }, [loadAll]);

  useEffect(() => {
    if (uMakeId) fetchModels(Number(uMakeId)).then(setModels).catch(() => setModels([]));
    else setModels([]);
    setUModelId("");
  }, [uMakeId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    setToken(tokenInput);
    try {
      await fetchStats();
      setAuthed(true);
      loadAll();
    } catch {
      clearToken();
      setLoginErr("Invalid token. Please try again.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uMakeId) { setUMsg("Please select a make."); return; }
    setULoading(true); setUMsg("");
    try {
      const res = await uploadAsset({
        make_id: uMakeId, model_id: uModelId || undefined,
        year: uYear, asset_type: uType, part_slug: uType === "part" ? uSlug : "",
        label: uLabel, video: uVideo ?? undefined, thumbnail: uThumb ?? undefined,
      });
      setUMsg(`? ${res.message}`);
      setUMakeId(""); setUModelId(""); setUYear(""); setUType("car"); setUSlug("");
      setULabel(""); setUVideo(null); setUThumb(null);
      if (videoRef.current) videoRef.current.value = "";
      if (thumbRef.current) thumbRef.current.value = "";
      loadAll();
    } catch (err: unknown) {
      setUMsg(`? ${err instanceof Error ? err.message : "Upload failed"}`);
    }
    setULoading(false);
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleAsset(id);
      setAssets(prev => prev.map(a => a.id === id ? { ...a, is_active: !a.is_active } : a));
    } catch { setMsg("Toggle failed"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this asset and its files?")) return;
    try {
      await deleteAsset(id);
      setAssets(prev => prev.filter(a => a.id !== id));
      setMsg("Asset deleted.");
      loadAll();
    } catch { setMsg("Delete failed"); }
  };

  const years = Array.from({ length: 2027 - 1985 }, (_, i) => String(2026 - i));
  const filteredAssets = assets.filter(a =>
    !search || `${a.make} ${a.model} ${a.part_label} ${a.label}`.toLowerCase().includes(search.toLowerCase())
  );

  // -- Login Screen ----------------------------------------------------------
  if (!authed) return (
    <div style={{ minHeight:"100vh", background:"#0a0a12", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif" }}>
      <div style={{ width:"100%", maxWidth:420, padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:64, height:64, borderRadius:16, background:"linear-gradient(135deg,#2563eb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:28 }}>??</div>
          <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 8px" }}>Admin Portal</h1>
          <p style={{ color:"#6b7280", fontSize:14, margin:0 }}>Transmission Asset Management</p>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="password" placeholder="Enter admin token" value={tokenInput}
            onChange={e => setTokenInput(e.target.value)} required
            style={{ width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid #374151", background:"#111827", color:"#fff", fontSize:14, marginBottom:12, boxSizing:"border-box", outline:"none" }}
          />
          {loginErr && <p style={{ color:"#f87171", fontSize:13, marginBottom:10 }}>{loginErr}</p>}
          <button type="submit" style={{ width:"100%", padding:"14px", borderRadius:12, background:"linear-gradient(135deg,#2563eb,#7c3aed)", color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer", letterSpacing:"0.05em" }}>
            Sign In
          </button>
        </form>
        <p style={{ textAlign:"center", color:"#374151", fontSize:12, marginTop:20 }}>Default dev token: transmission-admin-2025</p>
      </div>
    </div>
  );

  // -- Helpers ---------------------------------------------------------------
  const statusColor = (s: string) => s === "ok" ? "#16a34a" : s === "inactive" ? "#d97706" : "#dc2626";
  const statusIcon  = (s: string) => s === "ok" ? "?" : s === "inactive" ? "??" : "?";

  const card = (label: string, value: string|number, sub?: string, color = "#fff") => (
    <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:16, padding:"24px 28px" }}>
      <p style={{ color:"#6b7280", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 8px" }}>{label}</p>
      <p style={{ color, fontSize:32, fontWeight:800, margin:"0 0 4px", fontVariantNumeric:"tabular-nums" }}>{value}</p>
      {sub && <p style={{ color:"#4b5563", fontSize:12, margin:0 }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#060611", color:"#fff", fontFamily:"Inter,sans-serif" }}>
      {/* -- Top bar ------------------------------------------------ */}
      <div style={{ borderBottom:"1px solid #1f2937", padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, background:"#060611", zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#2563eb,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>??</div>
          <span style={{ fontWeight:800, fontSize:15, letterSpacing:"0.05em" }}>TRANSMISSION ADMIN</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          {loading && <span style={{ color:"#6b7280", fontSize:13 }}>Loading…</span>}
          <button onClick={() => loadAll()} style={{ background:"#1f2937", border:"none", color:"#9ca3af", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:13 }}>? Refresh</button>
          <button onClick={() => { clearToken(); setAuthed(false); }} style={{ background:"#1f2937", border:"none", color:"#9ca3af", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:13 }}>Sign Out</button>
        </div>
      </div>

      <div style={{ display:"flex" }}>
        {/* -- Sidebar ---------------------------------------------- */}
        <div style={{ width:220, minHeight:"calc(100vh - 60px)", borderRight:"1px solid #1f2937", padding:"24px 16px", flexShrink:0 }}>
          {([["dashboard","??","Dashboard"],["upload","??","Upload Asset"],["assets","??","Asset List"],["coverage","???","Coverage Map"]] as [Tab,string,string][]).map(([t,icon,label]) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 14px", borderRadius:10, border:"none", cursor:"pointer", background: tab===t ? "#1e3a8a" : "transparent", color: tab===t ? "#fff" : "#9ca3af", fontWeight: tab===t ? 700 : 400, fontSize:14, marginBottom:4, textAlign:"left" }}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>

        {/* -- Main content ----------------------------------------- */}
        <div style={{ flex:1, padding:"32px", overflowX:"auto" }}>
          {msg && <div style={{ background:"#1f2937", borderRadius:10, padding:"10px 16px", marginBottom:20, fontSize:13, color:"#d1d5db" }}>{msg} <button onClick={() => setMsg("")} style={{ background:"none", border:"none", color:"#6b7280", cursor:"pointer", marginLeft:8 }}>×</button></div>}

          {/* -- DASHBOARD ---------------------------------------- */}
          {tab === "dashboard" && stats && (
            <div>
              <h2 style={{ fontSize:24, fontWeight:800, marginBottom:24 }}>Dashboard</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16, marginBottom:32 }}>
                {card("Total Assets", stats.total_assets)}
                {card("Active Assets", stats.active_assets, undefined, "#60a5fa")}
                {card("Assets w/ Video", stats.assets_with_video, undefined, "#34d399")}
                {card("Vehicle Makes", stats.makes)}
                {card("Vehicle Models", stats.models)}
                {card("Coverage", `${stats.coverage_pct}%`, `${stats.covered_combos}/${stats.total_possible} combos`, stats.coverage_pct > 80 ? "#34d399" : stats.coverage_pct > 40 ? "#fbbf24" : "#f87171")}
                {card("Missing Assets", stats.missing_assets, "Click Coverage Map to fix", "#f87171")}
              </div>
              <div style={{ background:"#111827", borderRadius:16, padding:24, border:"1px solid #1f2937" }}>
                <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16 }}>Coverage Progress</h3>
                <div style={{ background:"#1f2937", borderRadius:99, height:12, overflow:"hidden" }}>
                  <div style={{ background:"linear-gradient(90deg,#2563eb,#7c3aed)", width:`${stats.coverage_pct}%`, height:"100%", borderRadius:99, transition:"width 0.5s" }} />
                </div>
                <p style={{ color:"#6b7280", fontSize:13, marginTop:10 }}>{stats.coverage_pct}% of all vehicle–page combinations are covered</p>
              </div>
            </div>
          )}

          {/* -- UPLOAD ------------------------------------------- */}
          {tab === "upload" && (
            <div style={{ maxWidth:640 }}>
              <h2 style={{ fontSize:24, fontWeight:800, marginBottom:24 }}>Upload 360° Asset</h2>
              <form onSubmit={handleUpload} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:20, padding:32, display:"flex", flexDirection:"column", gap:20 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Make *</label>
                    <select value={uMakeId} onChange={e => setUMakeId(e.target.value)} required style={sel}>
                      <option value="">— Select Make —</option>
                      {makes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Model</label>
                    <select value={uModelId} onChange={e => setUModelId(e.target.value)} style={sel} disabled={!uMakeId}>
                      <option value="">— All models —</option>
                      {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Year</label>
                    <select value={uYear} onChange={e => setUYear(e.target.value)} style={sel}>
                      <option value="">— All years —</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Asset Type *</label>
                    <select value={uType} onChange={e => setUType(e.target.value as "car"|"part")} style={sel}>
                      <option value="car">?? Car 360°</option>
                      <option value="part">?? Part 360°</option>
                    </select>
                  </div>
                </div>

                {uType === "part" && (
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Part Page *</label>
                    <select value={uSlug} onChange={e => setUSlug(e.target.value)} required={uType === "part"} style={sel}>
                      <option value="">— Select Part Page —</option>
                      {PART_PAGES.map(([slug,label]) => <option key={slug} value={slug}>{label}</option>)}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Label / Display Name</label>
                  <input value={uLabel} onChange={e => setULabel(e.target.value)} placeholder='e.g. "Toyota Camry 2024 — Transmission"' style={inp} />
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>360° Video (MP4)</label>
                    <input ref={videoRef} type="file" accept="video/mp4,video/*" onChange={e => setUVideo(e.target.files?.[0] ?? null)} style={{ ...inp, cursor:"pointer", padding:"10px 12px" }} />
                    {uVideo && <p style={{ color:"#34d399", fontSize:11, marginTop:4 }}>? {uVideo.name} ({(uVideo.size/1024/1024).toFixed(1)} MB)</p>}
                  </div>
                  <div>
                    <label style={{ display:"block", color:"#9ca3af", fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Thumbnail (Image)</label>
                    <input ref={thumbRef} type="file" accept="image/*" onChange={e => setUThumb(e.target.files?.[0] ?? null)} style={{ ...inp, cursor:"pointer", padding:"10px 12px" }} />
                    {uThumb && <p style={{ color:"#34d399", fontSize:11, marginTop:4 }}>? {uThumb.name}</p>}
                  </div>
                </div>

                {uMsg && <p style={{ fontSize:13, color: uMsg.startsWith("?") ? "#34d399" : "#f87171", padding:"10px 16px", background:"#1f2937", borderRadius:10 }}>{uMsg}</p>}

                <button type="submit" disabled={uLoading} style={{ background:"linear-gradient(135deg,#2563eb,#7c3aed)", color:"#fff", border:"none", borderRadius:12, padding:"14px 24px", fontSize:15, fontWeight:700, cursor:"pointer", opacity: uLoading ? 0.7 : 1 }}>
                  {uLoading ? "Uploading…" : "?? Upload Asset"}
                </button>
              </form>
            </div>
          )}

          {/* -- ASSET LIST --------------------------------------- */}
          {tab === "assets" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <h2 style={{ fontSize:24, fontWeight:800, margin:0 }}>Asset List <span style={{ color:"#6b7280", fontWeight:400, fontSize:16 }}>({filteredAssets.length})</span></h2>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search make, model, part…" style={{ ...inp, width:240, padding:"8px 14px" }} />
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead>
                    <tr style={{ borderBottom:"1px solid #1f2937" }}>
                      {["ID","Vehicle","Year","Type","Part Page","Label","Video","Status","Actions"].map(h => (
                        <th key={h} style={{ textAlign:"left", padding:"10px 12px", color:"#6b7280", fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map(a => (
                      <tr key={a.id} style={{ borderBottom:"1px solid #1f2937" }}>
                        <td style={td}>{a.id}</td>
                        <td style={td}><strong>{a.make}</strong>{a.model ? <><br/><span style={{ color:"#9ca3af" }}>{a.model}</span></> : <><br/><span style={{ color:"#4b5563" }}>All models</span></>}</td>
                        <td style={td}>{a.year || "All"}</td>
                        <td style={td}>
                          <span style={{ background: a.asset_type === "car" ? "#1e3a8a" : "#4c1d95", color:"#fff", padding:"2px 8px", borderRadius:6, fontSize:11, fontWeight:700 }}>
                            {a.asset_type === "car" ? "?? Car" : "?? Part"}
                          </span>
                        </td>
                        <td style={td}>{a.part_label || <span style={{ color:"#4b5563" }}>—</span>}</td>
                        <td style={{ ...td, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.label || <span style={{ color:"#4b5563" }}>—</span>}</td>
                        <td style={td}>
                          {a.has_video
                            ? <span style={{ color:"#34d399", fontWeight:700 }}>? Video</span>
                            : <span style={{ color:"#f87171" }}>No video</span>}
                        </td>
                        <td style={td}>
                          <button onClick={() => handleToggle(a.id)} style={{ background: a.is_active ? "#166534" : "#7f1d1d", color:"#fff", border:"none", padding:"4px 10px", borderRadius:6, cursor:"pointer", fontSize:11, fontWeight:700 }}>
                            {a.is_active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td style={td}>
                          <button onClick={() => handleDelete(a.id)} style={{ background:"#7f1d1d", color:"#fca5a5", border:"none", padding:"4px 10px", borderRadius:6, cursor:"pointer", fontSize:11 }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {filteredAssets.length === 0 && (
                      <tr><td colSpan={9} style={{ textAlign:"center", padding:40, color:"#4b5563" }}>No assets found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -- COVERAGE MAP ------------------------------------- */}
          {tab === "coverage" && coverage && (
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <h2 style={{ fontSize:24, fontWeight:800, margin:0 }}>Coverage Map</h2>
                <div style={{ display:"flex", gap:16, fontSize:12, color:"#6b7280" }}>
                  <span>? Active</span><span>?? Inactive</span><span>? Missing</span>
                </div>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ borderCollapse:"collapse", fontSize:12, minWidth:900 }}>
                  <thead>
                    <tr style={{ background:"#111827" }}>
                      <th style={{ ...th, textAlign:"left", minWidth:160 }}>Vehicle</th>
                      <th style={th}>Car 360°</th>
                      {coverage.part_pages.map(p => <th key={p.slug} style={{ ...th, fontSize:10 }} title={p.slug}>{p.label}</th>)}
                      <th style={th}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverage.rows.map(row => (
                      <tr key={row.model_id} style={{ borderBottom:"1px solid #1f2937" }}>
                        <td style={{ padding:"8px 12px" }}>
                          <strong style={{ fontSize:13 }}>{row.make}</strong>
                          <div style={{ color:"#9ca3af", fontSize:12 }}>{row.model}</div>
                        </td>
                        <td style={{ textAlign:"center", padding:6, background: row.car_status === "ok" ? "#052e16" : row.car_status === "inactive" ? "#1c1408" : "#1a0000" }}>
                          <span style={{ fontSize:14 }}>{statusIcon(row.car_status)}</span>
                        </td>
                        {row.page_cells.map(cell => (
                          <td key={cell.slug} style={{ textAlign:"center", padding:6, background: cell.status === "ok" ? "#052e16" : cell.status === "inactive" ? "#1c1408" : "#1a0000" }} title={`${row.make} ${row.model} — ${cell.label}`}>
                            <span style={{ fontSize:13 }}>{statusIcon(cell.status)}</span>
                          </td>
                        ))}
                        <td style={{ textAlign:"center", padding:6 }}>
                          <span style={{ background: row.covered === row.total ? "#166534" : row.covered > 0 ? "#854d0e" : "#7f1d1d", color:"#fff", padding:"2px 8px", borderRadius:8, fontSize:11, fontWeight:700 }}>
                            {row.covered}/{row.total}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {coverage.rows.length === 0 && (
                      <tr><td colSpan={coverage.part_pages.length + 3} style={{ textAlign:"center", padding:40, color:"#4b5563" }}>No vehicle models yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -- Shared styles -------------------------------------------------------------
const sel: React.CSSProperties = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1px solid #374151", background:"#0d1117", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box" };
const inp: React.CSSProperties = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1px solid #374151", background:"#0d1117", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box" };
const td:  React.CSSProperties = { padding:"10px 12px", verticalAlign:"middle", whiteSpace:"nowrap" };
const th:  React.CSSProperties = { padding:"10px 12px", color:"#6b7280", fontWeight:600, textAlign:"center", whiteSpace:"nowrap", borderBottom:"1px solid #374151" };
