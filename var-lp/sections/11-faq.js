/* ══════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════ */
const FAQS = [
  { q:'What industries do you specialize in for AI and Blockchain consulting?', a:'We specialize in Fintech, Capital Markets, Healthcare, Supply Chain, and Enterprise Technology. Our deepest expertise lies in regulated digital assets, DeFi infrastructure, and enterprise AI automation.' },
  { q:'How long does a typical engagement take from kick-off to delivery?', a:'Most MVP engagements range from 8–16 weeks depending on scope. We structure work in 4 phases: initiation, strategy, development, and QA launch — with clear deliverables and milestones at each stage.' },
  { q:'Do you offer ongoing support after the project launches?', a:'Yes. We offer retainer-based QA and operations support packages. Many clients continue with us post-launch for performance optimization, feature expansion, and ongoing infrastructure management.' },
  { q:'Can you work with our in-house engineering team?', a:"Absolutely. We operate as a collaborative partner, not a black-box vendor. We can embed into your team's workflow, use your tools and repositories, and align to your sprint cadence." },
  { q:'What sets Varmeta apart from other AI and Blockchain consultancies?', a:'We combine deep protocol-level expertise (Hedera, EVM chains, enterprise LLMs) with a proven delivery track record across regulated environments. Every solution is production-ready from day one — not a pilot that never scales.' },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section data-animate='' style={{ background:'#fff', padding:'100px 0', borderTop:'1px solid #eef0f3' }}>
      <div style={{ maxWidth:760, margin:'0 auto', padding:'0 32px' }}>
        <h2 style={{ fontSize:38, fontWeight:700, letterSpacing:'-0.5px', textAlign:'center', marginBottom:56 }}>Frequently Asked Questions</h2>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button onClick={() => setOpen(open===i ? null : i)} style={{
                width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'20px 24px', background: open===i ? '#fafbfc' : '#fff', border:'none', cursor:'pointer',
                textAlign:'left', fontSize:15, fontWeight:700, color:'#1d1d1d', fontFamily:'inherit', gap:16,
              }}>
                {f.q}
                <span style={{ flexShrink:0, color:'#94a3b8', display:'flex', transition:'transform 200ms', transform: open===i ? 'rotate(45deg)' : 'none' }}>
                  <IconPlus />
                </span>
              </button>
              {open===i && (
                <div style={{ padding:'4px 24px 24px', fontSize:14, color:'#5e5e5e', lineHeight:1.8 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
