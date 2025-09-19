import React from 'react'

// EALogo fills its parent container. Control its size by sizing the parent.
const EALogo: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-40 max-h-40 bg-white rounded-full flex items-center justify-center">
        <div className="text-black font-bold text-2xl tracking-wider">EA</div>
      </div>
    </div>
  )
}

export default EALogo