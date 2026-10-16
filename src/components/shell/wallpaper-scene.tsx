'use client'

import { useId } from 'react'

interface WallpaperSceneProps {
  index: number
  className?: string
}

export function WallpaperScene({ index, className }: WallpaperSceneProps) {
  const skyGridId = `wallpaper-sky-grid-${useId().replace(/:/g, '')}`

  return (
    <>
      {/* SCENE 0: MAX THE HEDGEHOG ENGINEER */}
      <div className={`w-full h-full relative ${index === 0 ? '' : 'hidden'} ${className ?? ''}`}>
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="900" className="fill-[#EDEAE0] dark:fill-[#111520] transition-colors duration-300" />
          <pattern id={skyGridId} width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-[#1D1F27]/[0.07] dark:fill-white/[0.06]" />
          </pattern>
          <rect width="1440" height="900" fill={`url(#${skyGridId})`} />

          {/* Sun / Moon */}
          <g className="animate-float-slow">
            <circle cx="1150" cy="165" r="52" className="fill-[#FEBC2E]/90 dark:fill-[#F59E0B]/80 stroke-[#1D1F27] dark:stroke-white/60" strokeWidth="2.5" />
          </g>

          {/* Crisp Stylized Cloud */}
          <g className="animate-float-delayed">
            <path d="M820 145 H910 A18 18 0 0 0 910 109 A26 26 0 0 0 862 96 A20 20 0 0 0 820 112 A16 16 0 0 0 820 145 Z" className="fill-white/90 dark:fill-[#23293A] stroke-[#1D1F27] dark:stroke-white/30" strokeWidth="2" />
          </g>

          {/* Distant Mountains & Rolling Hills */}
          <path d="M-60 900 L220 620 L480 800 L820 560 L1120 790 L1350 590 L1520 900 Z" className="fill-[#E2DEC9] dark:fill-[#161B29] stroke-[#1D1F27]/70 dark:stroke-white/20" strokeWidth="2" strokeLinejoin="round" />
          <path d="M-80 900 Q340 690 760 780 T1520 690 L1520 900 Z" className="fill-[#D0DEC0] dark:fill-[#1A2524] stroke-[#1D1F27] dark:stroke-white/25" strokeWidth="2.5" />
          <path d="M480 900 Q980 650 1500 740 L1500 900 Z" className="fill-[#BECDAA] dark:fill-[#1D2D28] stroke-[#1D1F27] dark:stroke-white/30" strokeWidth="2.5" />

          {/* MAX THE HEDGEHOG AT HIS OUTDOOR DESK */}
          <g transform="translate(810, 385)">
            <rect x="40" y="290" width="420" height="22" rx="4" fill="#D98A4E" stroke="#1D1F27" strokeWidth="3" />
            <rect x="75" y="312" width="22" height="160" fill="#B56B35" stroke="#1D1F27" strokeWidth="3" />
            <rect x="403" y="312" width="22" height="160" fill="#B56B35" stroke="#1D1F27" strokeWidth="3" />

            {/* Succulent Plant in Pot */}
            <g transform="translate(65, 225)">
              <path d="M12 35 C2 15 18 0 28 18 C32 0 48 15 38 35 Z" fill="#28C840" stroke="#1D1F27" strokeWidth="2.5" />
              <polygon points="8,35 42,35 37,65 13,65" fill="#E06D53" stroke="#1D1F27" strokeWidth="2.5" strokeLinejoin="round" />
            </g>

            {/* Spiky Quills */}
            <path d="M165 175 L130 135 L165 120 L150 75 L195 85 L210 45 L250 70 L285 45 L295 85 L335 80 L315 125 L345 150 L315 185 Z" fill="#5C4033" stroke="#1D1F27" strokeWidth="3.5" strokeLinejoin="round" />

            {/* Ears */}
            <circle cx="178" cy="135" r="20" fill="#E6B88A" stroke="#1D1F27" strokeWidth="3" />
            <circle cx="178" cy="135" r="10" fill="#D49B6A" />
            <circle cx="305" cy="135" r="20" fill="#E6B88A" stroke="#1D1F27" strokeWidth="3" />
            <circle cx="305" cy="135" r="10" fill="#D49B6A" />

            {/* Orange Hoodie */}
            <path d="M155 290 C155 215 190 195 242 195 C294 195 328 215 328 290 Z" fill="#F54E00" stroke="#1D1F27" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M228 215 V250 M256 215 V250" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M195 290 L208 255 H276 L289 290 Z" fill="#D94300" stroke="#1D1F27" strokeWidth="2.5" />

            {/* Face & Head */}
            <ellipse cx="242" cy="158" rx="68" ry="54" fill="#F3CFA6" stroke="#1D1F27" strokeWidth="3.5" />
            <ellipse cx="192" cy="172" rx="10" ry="6" fill="#FF7A70" opacity="0.65" />
            <ellipse cx="292" cy="172" rx="10" ry="6" fill="#FF7A70" opacity="0.65" />

            {/* Glasses */}
            <circle cx="212" cy="152" r="19" fill="#FFFFFF" fillOpacity="0.55" stroke="#1D1F27" strokeWidth="3.5" />
            <circle cx="272" cy="152" r="19" fill="#FFFFFF" fillOpacity="0.55" stroke="#1D1F27" strokeWidth="3.5" />
            <line x1="231" y1="152" x2="253" y2="152" stroke="#1D1F27" strokeWidth="3.5" />
            <line x1="175" y1="146" x2="193" y2="150" stroke="#1D1F27" strokeWidth="3" />
            <line x1="291" y1="150" x2="309" y2="146" stroke="#1D1F27" strokeWidth="3" />

            {/* Sparkling Eyes */}
            <circle cx="212" cy="152" r="6.5" fill="#1D1F27" />
            <circle cx="210" cy="149" r="2.2" fill="#FFFFFF" />
            <circle cx="272" cy="152" r="6.5" fill="#1D1F27" />
            <circle cx="270" cy="149" r="2.2" fill="#FFFFFF" />

            {/* Snout & Smile */}
            <ellipse cx="242" cy="166" rx="8" ry="5.5" fill="#1D1F27" />
            <ellipse cx="240" cy="164" rx="2.5" ry="1.5" fill="#FFFFFF" />
            <path d="M228 180 Q242 192 256 180" stroke="#1D1F27" strokeWidth="3.2" strokeLinecap="round" fill="none" />

            {/* Laptop */}
            <g transform="translate(175, 212)">
              <rect x="0" y="0" width="134" height="78" rx="4" fill="#E4E6DF" stroke="#1D1F27" strokeWidth="3" />
              <rect x="-12" y="72" width="158" height="8" rx="2" fill="#C8CBC2" stroke="#1D1F27" strokeWidth="2.5" />
              <circle cx="67" cy="39" r="13" fill="#F54E00" stroke="#1D1F27" strokeWidth="2.2" />
              <polygon points="67,31 70,36 75,36 71,40 72,45 67,42 62,45 63,40 59,36 64,36" fill="#FEBC2E" />
            </g>

            {/* Steaming Mug */}
            <g transform="translate(345, 246)">
              <path className="animate-steam" d="M14 -8 Q8 -18 16 -26" stroke="#F54E00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path className="animate-steam-delayed" d="M26 -6 Q32 -16 24 -24" stroke="#F54E00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <rect x="4" y="0" width="32" height="42" rx="4" fill="#FEBC2E" stroke="#1D1F27" strokeWidth="3" />
              <path d="M36 10 H44 A8 8 0 0 1 44 30 H36" stroke="#1D1F27" strokeWidth="3" fill="none" />
            </g>

            {/* Yellow Rubber Duck */}
            <g transform="translate(405, 250)" className="animate-float-slow">
              <path d="M10 38 C2 38 0 26 8 22 C6 12 14 4 24 6 C32 7 35 15 31 22 C40 23 44 38 30 38 Z" fill="#FEBC2E" stroke="#1D1F27" strokeWidth="2.5" strokeLinejoin="round" />
              <circle cx="24" cy="14" r="2.5" fill="#1D1F27" />
              <polygon points="31,14 40,17 31,20" fill="#F54E00" stroke="#1D1F27" strokeWidth="2" strokeLinejoin="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* SCENE 1: ASTRO SHIBA INU */}
      <div className={`w-full h-full relative ${index === 1 ? '' : 'hidden'} ${className ?? ''}`}>
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="900" className="fill-[#E5EAF3] dark:fill-[#0F1322]" />
          <g className="animate-float-slow" transform="translate(1050, 160)">
            <circle cx="80" cy="80" r="54" fill="#8B5CF6" stroke="#1D1F27" strokeWidth="3" />
            <ellipse cx="80" cy="80" rx="95" ry="22" transform="rotate(-18 80 80)" stroke="#FEBC2E" strokeWidth="6" fill="none" />
          </g>
          <path d="M-80 900 Q720 560 1520 720 L1520 900 Z" className="fill-[#D5DCE8] dark:fill-[#1D243B] stroke-[#1D1F27] dark:stroke-white/30" strokeWidth="3" />
          <g transform="translate(880, 390)" className="animate-float-slow">
            <polygon points="155,115 135,55 195,85" fill="#E59846" stroke="#1D1F27" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="285,115 305,55 245,85" fill="#E59846" stroke="#1D1F27" strokeWidth="3.5" strokeLinejoin="round" />
            <ellipse cx="220" cy="145" rx="68" ry="56" fill="#E59846" stroke="#1D1F27" strokeWidth="3.5" />
            <path d="M165 155 Q220 120 275 155 C275 185 250 201 220 201 C190 201 165 185 165 155 Z" fill="#FFFDF9" />
            <ellipse cx="195" cy="118" rx="7" ry="4.5" fill="#FFFDF9" />
            <ellipse cx="245" cy="118" rx="7" ry="4.5" fill="#FFFDF9" />
            <circle cx="195" cy="140" r="6.5" fill="#1D1F27" />
            <circle cx="245" cy="140" r="6.5" fill="#1D1F27" />
            <ellipse cx="220" cy="156" rx="8" ry="5.5" fill="#1D1F27" />
            <path d="M206 168 Q220 178 234 168" stroke="#1D1F27" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="220" cy="138" r="92" fill="#60A5FA" fillOpacity="0.14" stroke="#1D1F27" strokeWidth="3.5" />
            <path d="M155 90 A72 72 0 0 1 205 62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <path d="M140 310 C140 230 175 215 220 215 C265 215 300 230 300 310 Z" fill="#FFFFFF" stroke="#1D1F27" strokeWidth="3.5" />
            <rect x="190" y="245" width="60" height="36" rx="8" fill="#007AFF" stroke="#1D1F27" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      {/* SCENE 2: LO-FI BLACK CAT CODER */}
      <div className={`w-full h-full relative ${index === 2 ? '' : 'hidden'} ${className ?? ''}`}>
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="900" className="fill-[#E9E4EC] dark:fill-[#161321]" />
          <path d="M-80 900 Q680 620 1520 700 L1520 900 Z" className="fill-[#D4C9DF] dark:fill-[#221D33] stroke-[#1D1F27] dark:stroke-white/30" strokeWidth="3" />
          <g transform="translate(880, 400)" className="animate-float-slow">
            <path d="M290 280 Q360 250 345 190" stroke="#232634" strokeWidth="22" strokeLinecap="round" fill="none" />
            <polygon points="155,130 145,55 205,95" fill="#232634" stroke="#1D1F27" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="285,130 295,55 235,95" fill="#232634" stroke="#1D1F27" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M150 300 C150 220 180 200 220 200 C260 200 290 220 290 300 Z" fill="#232634" stroke="#1D1F27" strokeWidth="3.5" />
            <ellipse cx="220" cy="150" rx="66" ry="54" fill="#232634" stroke="#1D1F27" strokeWidth="3.5" />
            <circle cx="194" cy="148" r="13" fill="#FEBC2E" stroke="#1D1F27" strokeWidth="2.5" />
            <circle cx="194" cy="148" r="5" fill="#1D1F27" />
            <circle cx="246" cy="148" r="13" fill="#FEBC2E" stroke="#1D1F27" strokeWidth="2.5" />
            <circle cx="246" cy="148" r="5" fill="#1D1F27" />
            <path d="M135 152 H162 M138 166 H164 M278 152 H305 M276 166 H302" stroke="#1D1F27" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M148 150 A74 74 0 0 1 292 150" stroke="#F54E00" strokeWidth="10" fill="none" />
            <rect x="136" y="132" width="20" height="38" rx="8" fill="#F54E00" stroke="#1D1F27" strokeWidth="2.5" />
            <rect x="284" y="132" width="20" height="38" rx="8" fill="#F54E00" stroke="#1D1F27" strokeWidth="2.5" />
          </g>
        </svg>
      </div>
    </>
  )
}
