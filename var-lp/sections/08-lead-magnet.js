/* ══════════════════════════════════════════════
   LEAD MAGNET (dark)
══════════════════════════════════════════════ */
function LeadMagnet() {
  return (
    <section data-animate='' style={{ background:'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)', padding:'100px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-120, right:-80, width:440, height:440, background:'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-80, left:-60, width:320, height:320, background:'radial-gradient(circle, rgba(16,120,243,0.12) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', gap:80, alignItems:'center', position:'relative', zIndex:1 }}>
        {/* Form */}
        <div style={{ flex:1 }}>
          <h2 style={{ fontSize:38, fontWeight:700, color:'#fff', marginBottom:10, letterSpacing:'-0.6px' }}>Unlock Your AI's Full Potential</h2>
          <p style={{ fontSize:15, color:'#94a3b8', marginBottom:32, lineHeight:1.7 }}>Your next success story starts here.<br/>Everything you need to grow.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[['Email','email'],['First Name','text'],['Last Name','text']].map(([ph, type], i) => (
              <input key={i} type={type} placeholder={ph} style={{ width:'100%', padding:'13px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, color:'#fff', fontSize:14, outline:'none' }}
                onFocus={e => e.target.style.borderColor='#1078f3'}
                onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.12)'}
              />
            ))}
            <div style={{ display:'flex', gap:12 }}>
              {['Job Function','Country'].map((ph, i) => (
                <select key={i} defaultValue="" style={{ flex:1, padding:'13px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, color:'#94a3b8', fontSize:14, outline:'none', cursor:'pointer' }}>
                  <option value="" disabled>{ph}</option>
                </select>
              ))}
            </div>
            <textarea placeholder="Send us a message about your challenges?" rows={3} style={{ width:'100%', padding:'13px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, color:'#fff', fontSize:14, outline:'none', resize:'none', fontFamily:'inherit' }}
              onFocus={e => e.target.style.borderColor='#1078f3'}
              onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.12)'}
            />
            <button style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', background:'#1078f3', color:'#fff', padding:'15px 24px', borderRadius:8, fontSize:15, fontWeight:700, cursor:'pointer', border:'none', fontFamily:'inherit', transition:'background 200ms' }}
              onMouseEnter={e=>e.target.style.background='#0a5cc7'}
              onMouseLeave={e=>e.target.style.background='#1078f3'}
            >
              Download E-book <IconArrow />
            </button>
          </div>
        </div>
        {/* Book visual */}
        <div style={{ flex:'0 0 300px', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div style={{ width:220, height:300, background:'linear-gradient(145deg, #1e3a8a 0%, #3730a3 50%, #4f46e5 100%)', borderRadius:14, padding:'28px 24px', boxShadow:'0 48px 90px rgba(0,0,0,0.55), 22px 22px 0 rgba(79,70,229,0.28)', transform:'perspective(900px) rotateY(-10deg) rotateX(3deg)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 75% 25%, rgba(129,140,248,0.35), transparent 55%)', pointerEvents:'none' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <p style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,0.5)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:14 }}>VARMETA</p>
              <h3 style={{ fontSize:15, fontWeight:700, color:'#fff', lineHeight:1.5, marginBottom:10 }}>AI For Business Leaders: A Practical Introduction To AI Implementation</h3>
              <p style={{ fontSize:11, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>Understand what drives AI adoption and how your business can realistically benefit from deployment.</p>
            </div>
            <div style={{ position:'absolute', bottom:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'radial-gradient(circle, rgba(129,140,248,0.5), transparent)', border:'1px solid rgba(255,255,255,0.15)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
