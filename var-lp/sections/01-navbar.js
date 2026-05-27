/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:200,
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.85)',
      backdropFilter:'blur(16px)',
      borderBottom: scrolled ? '1px solid #e8edf3' : '1px solid transparent',
      transition:'all 320ms ease',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', alignItems:'center', height:72 }}>
        <VarmetaLogo />
        <div style={{ display:'flex', gap:28, marginLeft:48, flex:1 }}>
          {['About Us','Services','Our Solutions','Resources','Portfolio','Blog','Careers'].map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>
        <button className="btn-primary">Consult Expert</button>
      </div>
    </nav>
  );
}
