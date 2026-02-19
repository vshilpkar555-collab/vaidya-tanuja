// ─── MANDALA DECORATION ───────────────────────────────────────────────────────
const Mandala = ({ size = 300, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{ ...style, position: 'absolute', pointerEvents: 'none', opacity: 0.07 }}
  >
    <circle cx="100" cy="100" r="95" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="75" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="55" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(angle => (
      <g key={angle} transform={`rotate(${angle}, 100, 100)`}>
        <path d="M100 5 Q110 30 100 45 Q90 30 100 5"  fill="#C9A84C" opacity="0.6" />
        <path d="M100 55 Q108 70 100 80 Q92 70 100 55" fill="#2D5A27" opacity="0.5" />
      </g>
    ))}
    <circle cx="100" cy="100" r="8" fill="#C9A84C" opacity="0.4" />
    <circle cx="100" cy="100" r="4" fill="#2D5A27" opacity="0.6" />
  </svg>
);

export default Mandala;
