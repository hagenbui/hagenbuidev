/* ══════════════════════════════════════════════
   HOW WE WORK
══════════════════════════════════════════════ */
const STEPS = [
  {
    num:'01', title:'Project Initiation', active:true,
    items:[
      { name:'Requirement Hearing', desc:'We gather and deeply analyze your business logic and technical requirements.' },
      { name:'Estimation and Scope', desc:'Define clear project scope, set key delivery milestones, and develop accurate timeline and budget estimates.' },
    ],
  },
  { num:'02', title:'Strategy and Concept Development', items:[] },
  { num:'03', title:'Product Development', items:[] },
  { num:'04', title:'Launch and Ongoing QA Support', items:[] },
];

function IsometricShape({ layer, color, opacity }) {
  const size = 140 - layer * 18;
  return (
    <div style={{
      width: size, height: size,
      background: `linear-gradient(135deg, rgba(147,197,253,${opacity}) 0%, rgba(59,130,246,${opacity * 0.7}) 100%)`,
      transform:'rotate(45deg)',
      borderRadius:10,
      boxShadow:`0 ${8 + layer * 4}px ${30 + layer * 10}px rgba(16,120,243,${0.12 + layer * 0.04})`,
      flexShrink:0,
    }} />
  );
}

function HowWeWork() {
  const [active, setActive] = useState(0);
  return (
    <section data-animate='' style={{ background:'#fafbfc', padding:'100px 0', borderTop:'1px solid #eef0f3' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', gap:80, alignItems:'flex-start' }}>
        {/* Left */}
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:64 }}>
            <h2 style={{ fontSize:42, fontWeight:700, letterSpacing:'-0.6px' }}>How We Work</h2>
            <p style={{ fontSize:15, color:'#5e5e5e', maxWidth:340, lineHeight:1.75 }}>
              Four clear stages, zero ambiguity. A process designed so C-level executives always know where the project stands, what comes next, and why.
            </p>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:19, top:8, bottom:8, width:1, background:'linear-gradient(to bottom, #1078f3, #e2e8f0)' }} />
            {STEPS.map((step, i) => (
              <div key={step.num} onClick={() => setActive(i)} style={{ position:'relative', paddingLeft:52, marginBottom:44, cursor:'pointer' }}>
                <div style={{
                  position:'absolute', left:10, top:5, width:18, height:18, borderRadius:'50%',
                  background: active===i ? '#1078f3' : '#e2e8f0',
                  border: active===i ? '3px solid rgba(16,120,243,0.25)' : '3px solid #eef0f3',
                  transition:'all 250ms',
                  animation: active===i ? 'pulse-dot 2s infinite' : 'none',
                }} />
                <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.08em', color: active===i ? '#1078f3' : '#94a3b8', marginBottom:4 }}>{step.num}</p>
                <h3 style={{ fontSize:17, fontWeight:700, color: active===i ? '#1d1d1d' : '#94a3b8', marginBottom: active===i ? 18 : 0, transition:'all 200ms' }}>{step.title}</h3>
                {active===i && step.items.map((item, j) => (
                  <div key={j} style={{ marginTop:j>0?14:0 }}>
                    <h4 style={{ fontSize:14, fontWeight:700, color:'#1d1d1d', marginBottom:4 }}>{item.name}</h4>
                    <p style={{ fontSize:13, color:'#5e5e5e', lineHeight:1.7 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Right — isometric stack */}
        <div style={{ flex:'0 0 400px', position:'sticky', top:120, display:'flex', flexDirection:'column', alignItems:'center', gap:16, paddingTop:120 }}>
          {[0,1,2,3].map(i => (
            <IsometricShape key={i} layer={i} opacity={0.7 - i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
