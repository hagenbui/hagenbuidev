/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
const FOOTER_COLS = [
  { title:'Varmeta Company', links:['About Us','Mission & Vision','Leadership Team','Careers'] },
  { title:'Company',         links:['Blog','Affiliates','Press','HMNS'] },
  { title:'Services',        links:['AI Consulting','Blockchain Dev','Data Engineering','Web3 Solutions'] },
  { title:'Our Solutions',   links:['Hedera SDKs','Nexus SDKs','Hirehub Solutions','NFT Innovation','White Label Exchange'] },
  { title:'Resources',       links:['Documentation','Web3 Solutions','VC Deal Flow','Web3 Community'] },
];

function Footer() {
  return (
    <footer style={{ background:'linear-gradient(160deg, #080e1e 0%, #0d1a36 50%, #080e1e 100%)', color:'#fff', padding:'80px 0 32px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', fontSize:220, fontWeight:900, color:'rgba(255,255,255,0.025)', whiteSpace:'nowrap', userSelect:'none', letterSpacing:'-10px', pointerEvents:'none', lineHeight:1 }}>
        Varmeta
      </div>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', gap:48, marginBottom:64 }}>
          {/* Left */}
          <div style={{ flex:'0 0 240px' }}>
            <VarmetaLogo light />
            <div style={{ marginTop:32 }}>
              <p style={{ fontSize:11, fontWeight:700, color:'#64748b', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:8 }}>📍 Hanoi Head Office</p>
              <p style={{ fontSize:13, color:'#475569', lineHeight:1.75 }}>16th Floor, 97 Tran Duy Hung,<br/>Cau Giay, Hanoi</p>
            </div>
            <div style={{ marginTop:20 }}>
              <p style={{ fontSize:11, fontWeight:700, color:'#64748b', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:8 }}>📍 Da Nang</p>
              <p style={{ fontSize:13, color:'#475569', lineHeight:1.75 }}>36 Ba Trieu, Hai Chau District,<br/>Da Nang</p>
            </div>
            <div style={{ marginTop:20 }}>
              <p style={{ fontSize:11, fontWeight:700, color:'#64748b', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:8 }}>📞 Contact</p>
              <p style={{ fontSize:13, color:'#475569' }}>contact@varmeta.com</p>
            </div>
          </div>
          {/* Cols */}
          <div style={{ flex:1, display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:28 }}>
            {FOOTER_COLS.map(col => (
              <div key={col.title}>
                <p style={{ fontSize:13, fontWeight:700, color:'#e2e8f0', marginBottom:16 }}>{col.title}</p>
                {col.links.map(l => (
                  <a key={l} href="#" className="footer-link">{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:28 }}>
            {['Cookies','Privacy Policy','Terms and Conditions'].map(l => (
              <a key={l} href="#" style={{ fontSize:12, color:'#475569', transition:'color 200ms' }}
                onMouseEnter={e => e.target.style.color='#94a3b8'}
                onMouseLeave={e => e.target.style.color='#475569'}
              >{l}</a>
            ))}
          </div>
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} style={{ width:36, height:36, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', background:'rgba(255,255,255,0.05)', color:'#94a3b8', transition:'background 200ms' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
