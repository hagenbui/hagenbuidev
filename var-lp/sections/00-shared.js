const { useState, useEffect, useRef } = React;


const HERO_BG = "https://www.figma.com/api/mcp/asset/ed5a1d1f-44a6-4d22-8daf-96dbcb33c22a";
const LOGO_1  = "https://www.figma.com/api/mcp/asset/dc75e97f-2c90-49c5-82e9-0a432034594e";
const LOGO_AWS= "https://www.figma.com/api/mcp/asset/05f36d5c-489a-47fd-b466-0deb542566be";
const LOGO_3  = "https://www.figma.com/api/mcp/asset/d0602418-6253-45dd-ae50-cee71073c2b0";
const LOGO_4  = "https://www.figma.com/api/mcp/asset/5f6debde-03dd-4e04-989a-71fde59e8d60";
const LOGO_5  = "https://www.figma.com/api/mcp/asset/9a33dd91-f7c8-4800-9e4b-0d51f9355623";
const LOGO_6  = "https://www.figma.com/api/mcp/asset/721617c2-5913-4396-8dad-f60afd79d790";

/* ── Icons ── */
const IconArrow = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconPlus = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
  </svg>
);
const IconMinus = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
);

/* ── Logo ── */
const VarmetaLogo = ({ light }) => (
  <div style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:18, color: light ? '#fff' : '#1d1d1d' }}>
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 2L2 8l11 5.5L24 8 13 2z" fill="#1078f3"/>
      <path d="M2 18l11 5.5L24 18" stroke="#1078f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 13l11 5.5L24 13" stroke="#1078f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
    </svg>
    Varmeta
  </div>
);
