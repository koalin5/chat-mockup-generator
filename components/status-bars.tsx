"use client"

// iPhone Status Bar with Dynamic Island
export function IPhoneStatusBar({ isDark = false }: { isDark?: boolean }) {
  const bgColor = isDark ? "#000000" : "#FFFFFF"
  const textColor = isDark ? "#FFFFFF" : "#000000"

  return (
    <div
      className="w-full h-[54px] flex items-center justify-between px-6 relative flex-shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      {/* Time */}
      <span className="text-[17px] font-semibold z-10" style={{ color: textColor }}>
        9:41
      </span>

      {/* Dynamic Island */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[10px]">
        <div
          className="w-[126px] h-[37px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#000000" }}
        >
          {/* Camera dot */}
          <div className="w-[12px] h-[12px] rounded-full bg-[#1C1C1E] ml-12" />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-[6px] z-10">
        {/* Signal bars - thinner and more refined */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <circle cx="1.5" cy="9.5" r="1.5" fill={textColor} />
          <circle cx="5.5" cy="7.5" r="1.5" fill={textColor} />
          <circle cx="9.5" cy="5.5" r="1.5" fill={textColor} />
          <circle cx="13.5" cy="3.5" r="1.5" fill={textColor} />
          <circle cx="13.5" cy="9.5" r="1.5" fill={textColor} opacity="0.4" />
        </svg>

        {/* WiFi - cleaner design */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path
            d="M7.5 10C8.05228 10 8.5 10.4477 8.5 11H6.5C6.5 10.4477 6.94772 10 7.5 10Z"
            fill={textColor}
          />
          <path
            d="M7.5 7C8.88071 7 10.1872 7.52678 11.1872 8.40192L10.1872 9.40192C9.46407 8.77232 8.52513 8.4 7.5 8.4C6.47487 8.4 5.53593 8.77232 4.81282 9.40192L3.81282 8.40192C4.81282 7.52678 6.11929 7 7.5 7Z"
            fill={textColor}
          />
          <path
            d="M7.5 4C9.75163 4 11.8258 4.89553 13.3258 6.35553L12.3258 7.35553C11.1026 6.15232 9.38802 5.4 7.5 5.4C5.61198 5.4 3.89738 6.15232 2.67417 7.35553L1.67417 6.35553C3.17417 4.89553 5.24837 4 7.5 4Z"
            fill={textColor}
          />
        </svg>

        {/* Battery - more compact and realistic */}
        <div className="flex items-center gap-[1px]">
          <div className="w-[22px] h-[11px] rounded-[2.5px] border-[1px] relative flex items-center justify-center" style={{ borderColor: textColor, opacity: 0.35 }}>
            <div
              className="w-[18px] h-[7px] rounded-[1.5px]"
              style={{ backgroundColor: textColor }}
            />
          </div>
          <div className="w-[1.5px] h-[4px] rounded-r-[1px]" style={{ backgroundColor: textColor, opacity: 0.4 }} />
        </div>
      </div>
    </div>
  )
}

// Android Status Bar with centered punch-hole
export function AndroidStatusBar({ isDark = false }: { isDark?: boolean }) {
  const bgColor = isDark ? "#000000" : "#FFFFFF"
  const textColor = isDark ? "#FFFFFF" : "#000000"

  return (
    <div
      className="w-full h-[40px] flex items-center justify-between px-5 relative flex-shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      {/* Time */}
      <span className="text-[14px] font-medium z-10" style={{ color: textColor }}>
        9:30
      </span>

      {/* Centered camera punch-hole */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="w-[14px] h-[14px] rounded-full" style={{ backgroundColor: isDark ? "#333333" : "#000000" }} />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-[5px] z-10">
        {/* WiFi icon */}
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <path d="M8.5 10.5C9.05 10.5 9.5 10.95 9.5 11.5C9.5 12.05 9.05 12.5 8.5 12.5C7.95 12.5 7.5 12.05 7.5 11.5C7.5 10.95 7.95 10.5 8.5 10.5ZM8.5 7C10.16 7 11.69 7.63 12.84 8.67L11.77 9.74C10.91 8.99 9.76 8.5 8.5 8.5C7.24 8.5 6.09 8.99 5.23 9.74L4.16 8.67C5.31 7.63 6.84 7 8.5 7ZM8.5 3.5C11.03 3.5 13.35 4.46 15.13 6.08L14.06 7.15C12.58 5.84 10.63 5 8.5 5C6.37 5 4.42 5.84 2.94 7.15L1.87 6.08C3.65 4.46 5.97 3.5 8.5 3.5ZM8.5 0C11.93 0 15.06 1.34 17.37 3.51L16.3 4.58C14.29 2.71 11.54 1.5 8.5 1.5C5.46 1.5 2.71 2.71 0.7 4.58L-0.37 3.51C1.94 1.34 5.07 0 8.5 0Z" fill={textColor}/>
        </svg>

        {/* Cellular signal icon - 4 bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" fill={textColor}/>
          <rect x="4.5" y="5" width="3" height="7" fill={textColor}/>
          <rect x="9" y="2" width="3" height="10" fill={textColor}/>
          <rect x="13.5" y="0" width="3" height="12" fill={textColor}/>
        </svg>

        {/* Battery icon */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="19" height="11" rx="1.5" stroke={textColor} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="0.5" fill={textColor}/>
          <path d="M21 3.5C21 3.22386 21.2239 3 21.5 3H22C22.8284 3 23.5 3.67157 23.5 4.5V7.5C23.5 8.32843 22.8284 9 22 9H21.5C21.2239 9 21 8.77614 21 8.5V3.5Z" fill={textColor} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}
