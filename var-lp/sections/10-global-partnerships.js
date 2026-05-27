/* ══════════════════════════════════════════════
   GLOBAL PARTNERSHIPS (stats + map)
══════════════════════════════════════════════ */
const STATS = [
  { num:'100+', label:'Fullstack Developers' },
  { num:'$100M+', label:'Customer Raised' },
  { num:'10+', label:'Countries Partnered' },
  { num:'50+', label:'Clients Served' },
];



function GlobalPartnerships() {
  return (
    <section data-animate='' style={{ background:'#fafbfc', padding:'100px 0', borderTop:'1px solid #eef0f3' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', textAlign:'center' }}>
        <h2 style={{ fontSize:48, fontWeight:700, letterSpacing:'-1px', lineHeight:1.2, marginBottom:16 }}>
          Building Global Partnerships for<br/>Greater Impact
        </h2>
        <p style={{ fontSize:16, color:'#5e5e5e', maxWidth:480, margin:'0 auto 56px', lineHeight:1.75 }}>
          Our multilingual team works seamlessly across time zones, delivering excellence for clients from Asia, Europe, and North America.
        </p>
        <div style={{ display:'flex', justifyContent:'center', gap:80, marginBottom:64 }}>
          {STATS.map((s,i) => (
            <div key={i}>
              <p style={{ fontSize:40, fontWeight:800, color:'#1d1d1d', letterSpacing:'-1.5px', marginBottom:4 }}>{s.num}</p>
              <p style={{ fontSize:13, color:'#5e5e5e', fontWeight:600 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <iframe
          srcdoc={GLOBE_HTML}
          style={{ width:'100%', height:360, border:'none', borderRadius:20 }}
          sandbox="allow-scripts"
        />
      </div>
    </section>
  );
}
