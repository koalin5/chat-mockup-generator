"use client"

// iPhone Status Bar with Dynamic Island
export function IPhoneStatusBar({ isDark = false }: { isDark?: boolean }) {
  const bgColor = isDark ? "#000000" : "#F6F6F6"
  const textColor = isDark ? "#FFFFFF" : "#000000"

  return (
    <div
      className="w-full h-[54px] flex items-center justify-between px-6 relative"
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
      <div className="flex items-center gap-1 z-10">
        {/* Signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill={textColor} />
          <rect x="4" y="5" width="3" height="7" rx="0.5" fill={textColor} />
          <rect x="8" y="2" width="3" height="10" rx="0.5" fill={textColor} />
          <rect x="12" y="0" width="3" height="12" rx="0.5" fill={textColor} />
        </svg>

        {/* WiFi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" className="ml-1">
          <path
            d="M8.5 2.5C5.5 2.5 2.8 3.7 1 5.7L2.4 7.1C3.9 5.5 6 4.5 8.5 4.5C11 4.5 13.1 5.5 14.6 7.1L16 5.7C14.2 3.7 11.5 2.5 8.5 2.5ZM8.5 6.5C6.8 6.5 5.3 7.2 4.2 8.3L5.6 9.7C6.4 8.9 7.4 8.5 8.5 8.5C9.6 8.5 10.6 8.9 11.4 9.7L12.8 8.3C11.7 7.2 10.2 6.5 8.5 6.5ZM8.5 10.5C7.7 10.5 7 11.2 7 12H10C10 11.2 9.3 10.5 8.5 10.5Z"
            fill={textColor}
          />
        </svg>

        {/* Battery */}
        <div className="flex items-center ml-1">
          <div className="w-[25px] h-[12px] rounded-[3px] border-[1.5px] relative" style={{ borderColor: textColor }}>
            <div
              className="absolute left-[2px] top-[2px] bottom-[2px] w-[18px] rounded-[1px]"
              style={{ backgroundColor: textColor }}
            />
          </div>
          <div className="w-[2px] h-[5px] rounded-r-sm ml-[1px]" style={{ backgroundColor: textColor }} />
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
      className="w-full h-[40px] flex items-center justify-between px-5 relative rounded-t-[20px]"
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
      <div className="flex items-center gap-1.5 z-10">
        {/* Network type / WiFi */}
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path
            d="M8 0C4.5 0 1.4 1.4 0 3.7L1.3 5C2.5 3.2 5 1.8 8 1.8C11 1.8 13.5 3.2 14.7 5L16 3.7C14.6 1.4 11.5 0 8 0ZM8 4C5.8 4 3.9 4.9 2.7 6.3L4 7.6C4.9 6.6 6.4 5.8 8 5.8C9.6 5.8 11.1 6.6 12 7.6L13.3 6.3C12.1 4.9 10.2 4 8 4ZM8 8C6.9 8 5.9 8.5 5.3 9.3L8 12L10.7 9.3C10.1 8.5 9.1 8 8 8Z"
            fill={textColor}
          />
        </svg>

        {/* Signal strength */}
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path d="M0 13H3V6H0V13ZM4.5 13H7.5V3H4.5V13ZM9 13H12V0H9V13ZM13.5 13H16.5V4H13.5V13Z" fill={textColor} />
        </svg>

        {/* Battery */}
        <div className="flex items-center">
          <div className="w-[20px] h-[10px] rounded-[2px] border relative" style={{ borderColor: textColor }}>
            <div
              className="absolute left-[1px] top-[1px] bottom-[1px] w-[15px] rounded-[1px]"
              style={{ backgroundColor: textColor }}
            />
          </div>
          <div className="w-[2px] h-[4px] rounded-r-sm" style={{ backgroundColor: textColor }} />
        </div>
      </div>
    </div>
  )
}
