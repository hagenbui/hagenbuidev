/* ══════════════════════════════════════════════
   REAL RESULTS
══════════════════════════════════════════════ */
const CASES = [
  {
    logo: <span style={{ fontSize:22, fontWeight:900, letterSpacing:'-1px', color:'#c5173e' }}>KLDX</span>,
    title:'Tokenization Platform',
    desc:'Malaysia SEC-regulated tokenization platform enabling compliant digital asset issuance and trading. Delivered enterprise-grade infrastructure for secure, regulated token offerings with full KYC/AML integration.',
    tag:'Fintech and Regulated Digital Assets',
  },
  {
    logo: (
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:38, height:38, borderRadius:'50%', background:'#1d1d1d', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:18 }}>H</div>
        <span style={{ fontWeight:700, fontSize:16 }}>Hedera</span>
      </div>
    ),
    title:'Managed Transaction Gateway',
    desc:'Enterprise-grade managed gateway with automated accounting, VAT invoicing, and cross-border settlement on Hedera mainnet. Powers compliant crypto-to-fiat flows and sandbox pilots, significantly reducing operational complexity.',
    tag:'Blockchain and Enterprise Infrastructure',
  },
  {
    logo: <span style={{ fontSize:22, fontWeight:900, letterSpacing:'-1px', color:'#1078f3' }}>RCOR</span>,
    title:'Unified Chargeback AI',
    desc:'A world-class all-in-one platform consolidated into a unified database. Automates key financial decision points with advanced analytics to reduce operational complexity for centralized exchange operations.',
    tag:'Fintech and Centralized Exchange (CEX)',
  },
];

function RealResults() {
  return (
    <section data-animate='' style={{ background:'#fff', padding:'100px 0', borderTop:'1px solid #eef0f3' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:56 }}>
          <h2 style={{ fontSize:42, fontWeight:700, letterSpacing:'-0.6px', lineHeight:1.2, maxWidth:300 }}>Real Results,<br/>Proven Impact</h2>
          <p style={{ fontSize:15, color:'#5e5e5e', maxWidth:420, lineHeight:1.75 }}>
            Every project comes with its own obstacles. As an expert Blockchain and AI consulting company, we've delivered high-impact solutions that helped global partners raise{' '}
            <a href="#" style={{ color:'#1078f3', textDecoration:'underline' }}>more than $30M combined</a>.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24 }}>
          {CASES.map((c, i) => (
            <div key={i} className="case-card">
              <div style={{ minHeight:48, display:'flex', alignItems:'center' }}>{c.logo}</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:'#1078f3', lineHeight:1.35 }}>{c.title}</h3>
              <p style={{ fontSize:14, color:'#5e5e5e', lineHeight:1.75, flex:1 }}>{c.desc}</p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:16, borderTop:'1px solid #eef0f3' }}>
                <span className="tag-badge">{c.tag}</span>
                <button style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'#414651', background:'none', cursor:'pointer', border:'none', fontFamily:'inherit' }}>
                  Read Case Study <IconArrow size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
