/* ══════════════════════════════════════════════
   LOGO PARTNER
══════════════════════════════════════════════ */
function LogoPartner() {
  const logos = [LOGO_1, LOGO_AWS, LOGO_3, LOGO_4, LOGO_5, LOGO_6];
  return (
    <section style={{ background:'#fff', borderTop:'1px solid #eef0f3', borderBottom:'1px solid #eef0f3', padding:'36px 0', textAlign:'center' }}>
      <p style={{ fontSize:14, fontWeight:500, color:'#5e5e5e', marginBottom:28 }}>
        Trusted by innovative companies worldwide
      </p>
      <div style={{ overflow:'hidden', position:'relative', maskImage:'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <div style={{ display:'flex', gap:72, alignItems:'center', animation:'marquee 22s linear infinite', width:'max-content', padding:'0 36px' }}>
          {[...logos, ...logos].map((l, i) => (
            <img key={i} src={l} alt="" style={{ height:34, objectFit:'contain', opacity:0.65, filter:'grayscale(20%)' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
