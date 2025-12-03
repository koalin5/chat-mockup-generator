"use client"

// --- ICONS & ASSETS ---

// iOS Specific Icons
const IOSSignal = ({ strength = 4, className }: { strength?: number; className?: string }) => (
  <svg width="18" height="12" viewBox="0 0 18 12" className={className} fill="none">
    <rect x="1" y="8.5" width="2.75" height="3" rx="1.375" fill="currentColor" />
    <rect x="5.25" y="6" width="2.75" height="5.5" rx="1.375" fill="currentColor" />
    <rect x="9.5" y="3.5" width="2.75" height="8" rx="1.375" fill="currentColor" />
    <rect x="13.75" y="1" width="2.75" height="10.5" rx="1.375" fill="currentColor" />
  </svg>
)

const IOSWifi = ({ className }: { className?: string }) => (
  <svg width="18" height="13" viewBox="0 0 26 19" className={className} fill="none">
    {/* Dot */}
    <circle cx="13" cy="15.5" r="1.6" fill="currentColor" />
    {/* Middle Bar */}
    <path 
      d="M17.5 11.25C16.3 10.1 14.7 9.5 13 9.5C11.3 9.5 9.7 10.1 8.5 11.25" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
    {/* Top Bar */}
    <path 
      d="M22 6.75C19.6 4.35 16.4 3 13 3C9.6 3 6.4 4.35 4 6.75" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
  </svg>
)

const IOSBattery = ({ level = 100, charging = false, className }: { level?: number; charging?: boolean; className?: string }) => (
  <div className={`relative flex items-center ${className}`}>
    {/* Body */}
    <div className="w-[24.5px] h-[11.5px] rounded-[3px] border-[1px] border-current opacity-30"></div>
    {/* Cap */}
    <div className="w-[1.5px] h-[4px] bg-current rounded-r-[1px] absolute -right-[2.5px] opacity-30"></div>
    {/* Fill */}
    <div 
      className={`absolute left-[2px] top-[2px] bottom-[2px] rounded-[1.5px] ${level <= 20 && !charging ? 'bg-red-500' : 'bg-current'} transition-all duration-300`}
      style={{ width: `${Math.max(2, (level / 100) * 20.5)}px` }} 
    />
    {charging && (
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-current" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14H11V22L21 10H13V2Z" />
      </svg>
    )}
  </div>
)

// Pixel Specific Icons
const PixelSignal = ({ strength = 4, className }: { strength?: number; className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M22 2L2 22H22V2Z" fillOpacity={strength === 0 ? 0.3 : 1} />
    {strength < 4 && <path d="M22 2L2 22H22V2Z" fill="currentColor" opacity="0.1" />} 
    {strength === 4 && <path d="M22 2L2 22H22V2Z" fill="currentColor" />}
    {strength === 3 && <path d="M17 7L2 22H17V7Z" fill="currentColor" />}
    {strength === 2 && <path d="M12 12L2 22H12V12Z" fill="currentColor" />}
    {strength === 1 && <path d="M7 17L2 22H7V17Z" fill="currentColor" />}
  </svg>
)

const PixelWifi = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.0001 3C7.62539 3 3.47355 4.63666 0.141113 7.62561L12.0001 22.2501L23.8591 7.62561C20.5266 4.63666 16.3748 3 12.0001 3Z" />
  </svg>
)

const PixelBattery = ({ level = 100, charging = false, className }: { level?: number; charging?: boolean; className?: string }) => (
  <div className={`relative flex flex-col items-center justify-end ${className} h-[18px] w-[9px]`}>
    {/* Cap - Slightly detached or top part */}
    <div className="w-[4px] h-[2px] bg-current opacity-30 rounded-t-[1px] mb-[0.5px]"></div>
    
    {/* Body Container - Solid Track */}
    <div className="w-full flex-1 rounded-[1.5px] bg-current/30 overflow-hidden relative">
      {/* Fill - Solid Foreground */}
      <div 
        className={`absolute bottom-0 left-0 right-0 ${level <= 20 && !charging ? 'bg-red-500' : 'bg-current'} transition-all duration-300`}
        style={{ height: `${level}%` }}
      />
      
      {charging && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
             <svg className="w-2.5 h-2.5 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H11V22L21 10H13V2Z" />
             </svg>
        </div>
      )}
    </div>
  </div>
)

// iPhone Status Bar with Dynamic Island
export function IPhoneStatusBar({ isDark = false }: { isDark?: boolean }) {
  const textColor = isDark ? "text-white" : "text-black"
  const bgColor = isDark ? "#000000" : "#FFFFFF"
  
  return (
    <div className={`w-full h-[54px] flex justify-between items-center px-6 select-none ${textColor} transition-colors duration-300 relative`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Left: Time */}
      <div className="w-[80px] flex justify-start pl-1">
        <span className="font-semibold text-[17px] tracking-[-0.01em] font-[SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif]">
          9:41
        </span>
      </div>

      {/* Center: Dynamic Island */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[11px] z-20">
        <div className="w-[126px] h-[37px] bg-black rounded-[20px] flex items-center justify-between px-3 relative overflow-hidden">
            {/* Inner Reflections / Sensors */}
            <div className="absolute right-[28px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1c1c1e] opacity-60 blur-[0.5px]"></div>
            <div className="absolute right-[28px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2c2c2e] opacity-40"></div>
        </div>
      </div>

      {/* Right: Status Icons */}
      <div className="flex items-center gap-[6px] w-[80px] justify-end">
        <IOSSignal strength={4} className={textColor} />
        <IOSWifi className={textColor} />
        <IOSBattery level={100} charging={false} className={textColor} />
      </div>
    </div>
  );
};

// Android Status Bar with centered punch-hole
export function AndroidStatusBar({ isDark = false }: { isDark?: boolean }) {
  const textColor = isDark ? "text-white" : "text-gray-900"
  const bgColor = isDark ? "#000000" : "#FFFFFF"
  
  return (
    <div className={`w-full h-[50px] flex justify-between items-center px-6 select-none ${textColor} transition-colors duration-300 relative`}
      style={{ backgroundColor: bgColor }}
    >
      
      {/* Center Camera Hole Placeholder for context */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[18px]">
         <div className="w-4 h-4 bg-black rounded-full" />
      </div>

      {/* Left: Time */}
      <div className="flex items-center pl-1">
        <span className="font-medium text-[15px] font-[Google Sans, Roboto, sans-serif]">
          9:30
        </span>
      </div>

      {/* Right: Status Icons */}
      <div className="flex items-center gap-2.5 pr-1">
        <PixelWifi className={`${textColor} opacity-90`} />
        <PixelSignal strength={4} className={`${textColor} opacity-90`} />
        <PixelBattery level={100} charging={false} className={`${textColor} opacity-90`} />
      </div>
    </div>
  );
};
