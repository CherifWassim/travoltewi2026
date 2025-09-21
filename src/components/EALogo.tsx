import React from 'react'

// Display EA-logo.jpg inside a larger white circular container, with the image scaled down (dezoom).
// The component has an intrinsic size; parent pages should not impose extra height.
const EALogo: React.FC = () => {
  return (
    <div className="w-28 h-28 rounded-full bg-white inline-flex items-center justify-center overflow-hidden">
      <img
        src="/EA-logo.jpg"
        alt="EA logo"
        className="w-2/3 h-2/3 object-contain"
        loading="eager"
      />
    </div>
  )
}

export default EALogo