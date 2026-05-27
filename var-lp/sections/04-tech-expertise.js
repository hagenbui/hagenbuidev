/* ══════════════════════════════════════════════
   TECH EXPERTISE
══════════════════════════════════════════════ */
const TABS = [
  {
    label:'Data Intelligence Infrastructure',
    heading:'Clean Data. Smarter Decisions',
    body:'Great AI models are useless without structured data. Modernize your architecture to turn raw inputs into a liquid asset for your enterprise.',
    services:[
      { icon:'🗄️', title:'Data engineering and warehousing', desc:'Centralizing fragmented data into high-performance pipelines.' },
      { icon:'🔮', title:'Vector database implementation', desc:'Optimizing data structures specifically for LLM and AI Agent retrieval.' },
      { icon:'📊', title:'Real-time analytics dashboards', desc:'Turning raw numbers into actionable business intelligence (BI).' },
      { icon:'🛡️', title:'Data governance and quality', desc:'Automated cleaning and validation to eliminate "hallucinations" at the source.' },
    ],
  },
  {
    label:'Custom AI Agents & Automation',
    heading:'Intelligent Agents at Work',
    body:'Build autonomous AI systems that act, decide, and learn — reducing manual work while increasing output quality and speed at every layer.',
    services:[
      { icon:'🤖', title:'AI agent design & deployment', desc:'End-to-end agents that integrate directly with your existing workflows.' },
      { icon:'⚡', title:'Process automation', desc:'Replacing repetitive tasks with self-improving automation layers.' },
      { icon:'🔗', title:'LLM integration & fine-tuning', desc:'Custom model adaptation on your proprietary data and domain.' },
      { icon:'📡', title:'RAG architecture', desc:'Retrieval-augmented generation for accurate, context-aware outputs.' },
    ],
  },
  {
    label:'Enterprise Blockchain & Web3',
    heading:'Trust Built Into the Protocol',
    body:'From tokenization to DeFi infrastructure, we architect blockchain solutions that are regulatory-ready and enterprise-grade from day one.',
    services:[
      { icon:'🏦', title:'Tokenization platforms', desc:'SEC and MAS-compliant digital asset issuance and lifecycle management.' },
      { icon:'🔐', title:'Smart contract development', desc:'Audited, gas-optimized contracts across EVM and non-EVM chains.' },
      { icon:'🌐', title:'Web3 DApp development', desc:'Full-stack decentralized apps with excellent UX and wallet integration.' },
      { icon:'💱', title:'DeFi protocol design', desc:'AMMs, lending pools, yield vaults — built for real institutional use.' },
    ],
  },
];

function TechExpertise() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <section data-animate='' style={{ background:'#fff', padding:'100px 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:52 }}>
          <h2 style={{ fontSize:42, fontWeight:700, letterSpacing:'-0.6px', lineHeight:1.2 }}>Our Tech Expertise</h2>
          <p style={{ fontSize:16, color:'#5e5e5e', maxWidth:420, lineHeight:1.75 }}>
            AI and Data or Enterprise Blockchain, the work is always the same: solutions built around your business, not the other way around.
          </p>
        </div>
        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'2px solid #eef0f3', marginBottom:52, gap:4 }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding:'12px 24px', fontSize:14, fontWeight:600, cursor:'pointer', border:'none', background:'none', fontFamily:'var(--font)',
              color: active===i ? '#1078f3' : '#5e5e5e',
              borderBottom: active===i ? '2px solid #1078f3' : '2px solid transparent',
              marginBottom:-2, whiteSpace:'nowrap', transition:'all 200ms',
            }}>{t.label}</button>
          ))}
        </div>
        {/* Content */}
        <div style={{ display:'flex', gap:80, alignItems:'center', marginBottom:56 }}>
          <iframe
            key={active}
            srcdoc={[ANIM1_HTML, ANIM2_HTML, ANIM3_HTML][active]}
            style={{ flex:'0 0 340px', height:280, border:'none', borderRadius:20, background:'transparent', flexShrink:0 }}
            sandbox="allow-scripts"
          />
          <div style={{ flex:1 }}>
            <h3 style={{ fontSize:30, fontWeight:700, color:'#1078f3', marginBottom:16, letterSpacing:'-0.3px' }}>{tab.heading}</h3>
            <p style={{ fontSize:16, color:'#5e5e5e', lineHeight:1.75, marginBottom:28, maxWidth:480 }}>{tab.body}</p>
            <button className="btn-primary" style={{ display:'flex', alignItems:'center', gap:8, fontSize:14 }}>
              Read Case Study <IconArrow />
            </button>
          </div>
        </div>
        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20 }}>
          {tab.services.map((s, i) => (
            <div key={i} className="service-card">
              <span style={{ fontSize:24, display:'block', marginBottom:12 }}>{s.icon}</span>
              <h4 style={{ fontSize:14, fontWeight:700, color:'#1d1d1d', marginBottom:8, lineHeight:1.45 }}>{s.title}</h4>
              <p style={{ fontSize:13, color:'#5e5e5e', lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
