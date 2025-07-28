export function InstantLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      {/* Fast Simple Spinner */}
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Quick Text */}
      <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
    </div>
  );
}

export function FullPageLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#000000] to-[#232323]">
      {/* Pixelated Dog Character - Green Theme */}
      <div className="w-16 h-16 mb-4 relative">
        <div
          className="absolute animate-bounce"
          style={{ animationDuration: "1.5s" }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <rect x="24" y="8" width="16" height="8" fill="#10B981" />
            <rect x="16" y="16" width="32" height="8" fill="#10B981" />

            {/* Ears */}
            <rect x="16" y="8" width="8" height="8" fill="#059669" />
            <rect x="40" y="8" width="8" height="8" fill="#059669" />

            {/* Eyes */}
            <rect x="24" y="20" width="4" height="4" fill="#000000" />
            <rect x="36" y="20" width="4" height="4" fill="#000000" />

            {/* Nose */}
            <rect x="30" y="28" width="4" height="4" fill="#000000" />

            {/* Mouth */}
            <rect x="28" y="32" width="8" height="4" fill="#059669" />

            {/* Body */}
            <rect x="20" y="32" width="24" height="16" fill="#10B981" />

            {/* Legs */}
            <rect x="20" y="48" width="8" height="8" fill="#059669" />
            <rect x="36" y="48" width="8" height="8" fill="#059669" />
          </svg>
        </div>
      </div>

      {/* Loading Text with Animation */}
      <div className="text-center">
        <p className="text-white text-lg font-medium mb-3">
          Loading your data...
        </p>
        <div className="flex justify-center space-x-1">
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
