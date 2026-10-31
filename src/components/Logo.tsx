export function Logo({ light = false }: { light?: boolean }) {
  const stroke = light ? '#f7efe3' : '#2b1a10'
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Clairassur, accueil">
      <svg viewBox="0 0 64 64" className="size-9" aria-hidden>
        <path
          d="M32 8 L50 15 V30 C50 43 42 51 32 55 C22 51 14 43 14 30 V15 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M39 25 a9 9 0 1 0 0 13" fill="none" stroke="#c8643b" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className={`font-serif text-2xl tracking-tight ${light ? 'text-cream' : 'text-espresso'}`}>
        Clair<em className="font-normal">assur</em>
      </span>
    </a>
  )
}
