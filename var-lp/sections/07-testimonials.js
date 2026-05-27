/* ══════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════ */
const TESTI = [
  {
    q:'"I\'m very impressed with Varmeta team\'s speed, proactivity, and agility. They handle every task with great attention to detail, and work hard even during national holidays to deliver on time."',
    name:'Kent Makishima', role:'Head of Product, The Hashgraph Association', init:'KM', bg:'#1d1d1d',
  },
  {
    q:'"Varmeta delivered our tokenization infrastructure ahead of schedule. Their deep understanding of DeFi protocols and regulatory constraints made them the ideal partner for our complex project."',
    name:'Sarah Chen', role:'CTO, KLDX Capital', init:'SC', bg:'#1078f3',
  },
];
const CLIENT_NAMES = ['The Hashgraph Association','RHT Capital','bitkub','Aptos','Mastercard'];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTI[idx];
  return (
    <section data-animate='' style={{ background:'#fafbfc', padding:'100px 0', borderTop:'1px solid #eef0f3' }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ background:'#fff', borderRadius:24, padding:'52px 60px', display:'flex', gap:48, alignItems:'center', boxShadow:'0 4px 32px rgba(0,0,0,0.06)', marginBottom:36 }}>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:20, fontWeight:500, lineHeight:1.65, color:'#1d1d1d', marginBottom:36 }}>{t.q}</p>
            <p style={{ fontWeight:700, fontSize:15, color:'#1d1d1d' }}>{t.name}</p>
            <p style={{ fontSize:13, color:'#5e5e5e', marginTop:3 }}>{t.role}</p>
          </div>
          <div style={{ flex:'0 0 160px', height:160, borderRadius:16, background:'#f0f4f8', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:88, height:88, borderRadius:'50%', background: t.bg, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:26 }}>
              {t.init}
            </div>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:44 }}>
          {TESTI.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: idx===i ? 28 : 8, height:8, borderRadius:4, background: idx===i ? '#1078f3' : '#d5d7da', border:'none', cursor:'pointer', transition:'all 200ms' }} />
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:40, flexWrap:'wrap', borderTop:'1px solid #eef0f3', paddingTop:36 }}>
          {CLIENT_NAMES.map((n,i) => (
            <span key={i} style={{ fontSize:13, fontWeight:700, color:'#94a3b8', letterSpacing:'0.04em' }}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
