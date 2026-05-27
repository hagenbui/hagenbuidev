/* ══════════════════════════════════════════════
   INDUSTRY INSIGHTS
══════════════════════════════════════════════ */
const POSTS = [
  { title:'Fintech AI in 2026: How Artificial Intelligence is Reshaping the Financial System', date:'July 31, 2025', tag:'Fintech', grad:['#dbeafe','#bfdbfe'] },
  { title:'Enterprise Blockchain: Moving Beyond Pilot Programs to Production at Scale', date:'July 24, 2025', tag:'Blockchain', grad:['#ede9fe','#c4b5fd'] },
  { title:'Building Agentic AI Systems: Architecture Patterns for Enterprise Deployment', date:'July 18, 2025', tag:'AI Agents', grad:['#d1fae5','#a7f3d0'] },
];

function IndustryInsights() {
  return (
    <section data-animate='' style={{ background:'#fff', padding:'100px 0', borderTop:'1px solid #eef0f3' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:56 }}>
          <h2 style={{ fontSize:38, fontWeight:700, letterSpacing:'-0.5px', lineHeight:1.25 }}>
            Industry Insights<br/><span style={{ color:'#1078f3' }}>and Tech Trends</span>
          </h2>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:16 }}>
            <p style={{ fontSize:14, color:'#5e5e5e', maxWidth:360, lineHeight:1.75, textAlign:'right' }}>
              Stay ahead of the tech curve. Explore our latest technical deep-dives, industry reports, and enterprise blueprints tailored for tech leaders.
            </p>
            <button className="btn-primary" style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
              View All Articles <IconArrow size={14} />
            </button>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24 }}>
          {POSTS.map((p, i) => (
            <div key={i} className="blog-card">
              <div style={{ height:200, background:`linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(255,255,255,0.55)', backdropFilter:'blur(8px)' }} />
              </div>
              <div style={{ padding:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span className="tag-badge">{p.tag}</span>
                  <span style={{ fontSize:11, color:'#94a3b8' }}>{p.date}</span>
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'#1d1d1d', lineHeight:1.55, marginBottom:16 }}>{p.title}</h3>
                <p style={{ fontSize:13, color:'#5e5e5e', lineHeight:1.7, marginBottom:16 }}>
                  Discover how generative AI and predictive analytics are transforming financial operations, optimizing risk management, and driving the next wave of banking innovation.
                </p>
                <button style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:'#1078f3', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}>
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
