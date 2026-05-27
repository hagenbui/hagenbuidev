/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:72, overflow:'hidden', background:'#fff' }}>
      <img src={HERO_BG} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:160, background:'linear-gradient(to bottom, transparent, #fff)', pointerEvents:'none' }} />
      <div style={{ position:'relative', zIndex:1, maxWidth:960, textAlign:'center', padding:'80px 32px' }}>
        <p className="fade-in" style={{ fontSize:12, fontWeight:700, letterSpacing:'0.12em', color:'#1078f3', textTransform:'uppercase', marginBottom:20 }}>
          Premier AI & Blockchain Consulting
        </p>
        <h1 className="fade-in-2" style={{ fontSize:72, fontWeight:700, lineHeight:1.1, letterSpacing:'-1.5px', color:'#1d1d1d', marginBottom:24 }}>
          Premier AI Consulting &amp;<br />Enterpise Blockchain Partner
        </h1>
        <p className="fade-in-3" style={{ fontSize:20, lineHeight:1.65, color:'#5e5e5e', maxWidth:640, margin:'0 auto 40px' }}>
          With Varmeta's expertise in Blockchain and AI consulting, you can deploy high-performance architectures designed for rapid growth and enterprise-grade resilience.
        </p>
        <div className="fade-in-3" style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <button className="btn-primary-lg">Schedule a Strategy Call</button>
          <button className="btn-secondary-lg">View Proven Portfolio</button>
        </div>
      </div>
    </section>
  );
}
