export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Pixelated Dog Character */}
      <div className="w-16 h-16 mb-4 relative">
        <div
          className="absolute animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          {/* Pixel Dog SVG */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <rect x="24" y="8" width="16" height="8" fill="#3F3F46" />
            <rect x="16" y="16" width="32" height="8" fill="#3F3F46" />

            {/* Ears */}
            <rect x="16" y="8" width="8" height="8" fill="#27272A" />
            <rect x="40" y="8" width="8" height="8" fill="#27272A" />

            {/* Eyes */}
            <rect x="24" y="20" width="4" height="4" fill="#000000" />
            <rect x="36" y="20" width="4" height="4" fill="#000000" />

            {/* Nose */}
            <rect x="30" y="28" width="4" height="4" fill="#000000" />

            {/* Mouth */}
            <rect x="28" y="32" width="8" height="4" fill="#27272A" />

            {/* Body */}
            <rect x="20" y="32" width="24" height="16" fill="#3F3F46" />

            {/* Legs */}
            <rect x="20" y="48" width="8" height="8" fill="#27272A" />
            <rect x="36" y="48" width="8" height="8" fill="#27272A" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <p className="text-zinc-700 text-md font-light">One moment please...</p>
    </div>
  );
}
