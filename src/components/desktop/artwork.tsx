export function Artwork({ variant = 'orbit' }: { variant?: string }) {
  const surface = variant === 'map'
    ? 'bg-[#e5e5d6]'
    : variant === 'roads'
      ? 'bg-[#344852]'
      : variant === 'island'
        ? 'bg-[#a4c8ca]'
        : 'bg-[#b5c7cd]'

  return (
    <div className={`aspect-[1.5] w-full overflow-hidden ${surface} [&>svg]:size-full [&>svg]:transition-transform [&>svg]:duration-500`} aria-hidden="true">
      <svg viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice">
        {variant === 'map'
          ? (
              <>
                <path d="M0 110L160 80L250 160L420 90L600 110V400H0Z" fill="#d5dfcb" />
                <path d="M0 310C120 220 200 380 310 230S490 270 600 170" stroke="#9fbfce" strokeWidth="55" />
                <path d="M-30 90L640 370M50 430L420 -30M-30 210L630 65M190 440L590 -20" stroke="#f7f4e8" strokeWidth="14" />
                <path d="M-30 90L640 370M50 430L420 -30" stroke="#b7b8a4" strokeWidth="2" />
                <path d="M250 125L390 173L350 280L210 236Z" fill="#e3b773" fillOpacity=".65" stroke="#b77d3f" strokeWidth="3" strokeDasharray="6 5" />
                <circle cx="300" cy="202" r="12" fill="#31587b" stroke="#fff" strokeWidth="5" />
              </>
            )
          : variant === 'roads'
            ? (
                <>
                  <path d="M0 0H600V400H0Z" fill="#344852" />
                  {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 55 - 100} 0L${i * 55 + 100} 400M0 ${i * 40}H600`} stroke="#91a6a4" strokeOpacity=".12" />)}
                  <path d="M-30 360C190 320 180 90 340 130S470 290 650 20" stroke="#7b9190" strokeWidth="48" />
                  <path d="M-30 360C190 320 180 90 340 130S470 290 650 20" stroke="#e7ca8c" strokeWidth="2" strokeDasharray="15 12" />
                  <path d="M-30 338C190 298 180 68 340 108S470 268 650 -2M-30 382C190 342 180 112 340 152S470 312 650 42" stroke="#c4d6c9" strokeWidth="2" />
                </>
              )
            : variant === 'island'
              ? (
                  <>
                    <path d="M0 0H600V400H0Z" fill="#a4c8ca" />
                    <path d="M75 263L160 140L260 112L345 65L455 185L525 267L415 327L235 350Z" fill="#b8d9d1" />
                    <path d="M100 255L175 150L270 135L345 87L430 191L490 260L405 302L240 325Z" fill="#e5d9b6" />
                    <path d="M133 244L210 161L285 155L344 109L408 193L457 250L390 281L245 299Z" fill="#839e76" />
                    <path d="M210 161L285 155L344 109L335 238L245 299L133 244Z" fill="#a6b28a" />
                    <path d="M344 109L408 193L457 250L335 238Z" fill="#647c68" />
                    <path d="M344 109L285 155L335 238Z" fill="#c0c5a3" />
                  </>
                )
              : (
                  <>
                    <circle cx="300" cy="200" r="135" fill="#e9e6d9" />
                    <circle cx="300" cy="200" r="97" stroke="#547593" strokeWidth=".7" />
                    <ellipse cx="300" cy="200" rx="230" ry="68" transform="rotate(-30 300 200)" stroke="#3c6582" strokeWidth="2" />
                    <ellipse cx="300" cy="200" rx="230" ry="72" transform="rotate(-30 300 200)" stroke="#eef2e8" strokeWidth="9" strokeDasharray="380 900" />
                    <circle cx="478" cy="99" r="14" fill="#c67c5f" />
                  </>
                )}
      </svg>
    </div>
  )
}

export function Wallpaper() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_22%_18%,#ffffff38,transparent_60%),linear-gradient(145deg,var(--desk)_35%,var(--desk-deep))]" aria-hidden="true">
      <div className="wallpaper-grain" />
      <div className="absolute bottom-[-28%] right-[-14%] h-[min(82vw,1120px)] w-[min(82vw,1120px)] -rotate-[5deg] text-[#344f68] dark:text-[#d9e2dd] dark:opacity-50 max-[700px]:right-[-560px] max-[700px]:bottom-[-270px] max-[700px]:size-[900px] [&>svg]:size-full">
        <svg viewBox="0 0 1000 1000" fill="none">
          <defs>
            <linearGradient id="planet-light" x1="370" y1="250" x2="750" y2="730" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e8e9df" />
              <stop offset=".55" stopColor="#c6d2d4" />
              <stop offset="1" stopColor="#7693ab" />
            </linearGradient>
          </defs>
          <ellipse cx="520" cy="540" rx="435" ry="170" transform="rotate(-36 520 540)" stroke="currentColor" strokeWidth="1" opacity=".28" />
          <ellipse cx="520" cy="540" rx="390" ry="120" transform="rotate(-36 520 540)" stroke="currentColor" strokeWidth="1" opacity=".5" />
          <circle cx="520" cy="520" r="245" fill="url(#planet-light)" />
          <path d="M196 738C70 779 92 657 245 513" stroke="#e6e8db" strokeWidth="23" />
          <path d="M196 738C350 694 696 486 823 323C945 168 813 210 755 244" stroke="#e6e8db" strokeWidth="23" />
          <path d="M196 745C350 701 696 493 823 330C945 175 813 217 755 251" stroke="#426184" strokeWidth="1" opacity=".5" />
          <circle cx="793" cy="301" r="21" fill="#c98e70" />
          <path d="M836 690v22m-11-11h22M238 270v14m-7-7h14" stroke="currentColor" strokeWidth="2" opacity=".5" />
        </svg>
      </div>
      <div className="absolute bottom-[155px] left-[5%] font-[Georgia,'Times_New_Roman',serif] text-[clamp(64px,7vw,108px)] leading-[.85] tracking-[-.06em] text-[#f2f0e4] opacity-[.83] max-[1150px]:text-[86px] max-[700px]:bottom-[180px] max-[700px]:left-5 max-[700px]:text-[64px]">
        a space for
        <br />
        <em className="font-normal">curiosity.</em>
      </div>
      <div className="absolute bottom-[139px] right-[5%] text-right font-mono text-[9px] leading-[1.7] tracking-[.14em] text-[#233c50] opacity-60 max-[700px]:hidden">
        STARLLOW® — PERSONAL SPACE
        <br />
        THOUGHTS, EXPERIMENTS & LITTLE THINGS.
      </div>
    </div>
  )
}
