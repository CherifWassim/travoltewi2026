import React from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate()

  console.log('WelcomeScreen rendered')

  const handleLogin = () => {
    console.log('Login button clicked from welcome screen')
    navigate('/login')
  }

  const handleFindOutMore = () => {
    console.log('Find out more clicked')
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image placed below the fixed header */}
      <div
        className="absolute top-2 inset-x-0 bottom-0 bg-[url('/unnamed.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />

      {/* Subtle gradient overlay also starts below the header */}
      <div className="absolute top-2 inset-x-0 bottom-0 bg-gradient-to-b from-black/10 via-black/10 to-black/20" aria-hidden="true" />
      
      {/* Fixed Top Header */}
      <header className="fixed top-0 inset-x-0 z-30 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto max-w-screen-xl px-4 h-14 flex items-center justify-between">
          <div className="text-white font-extrabold tracking-wider text-xl">FC26</div>
          <div className="text-white font-bold tracking-wider text-sm sm:text-base">EA SPORTS</div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-sm mx-auto min-h-screen flex flex-col pt-16">

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end items-center pb-20 px-6">
          {/* EA Sports Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <div className="text-black font-bold text-2xl">EA</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-4xl mb-2">FC</div>
              <div className="text-gray-300 text-sm tracking-widest">COMPANION</div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full max-w-xs bg-gray-700/80 hover:bg-gray-600/80 text-white font-medium py-4 px-8 rounded-full transition-colors text-lg mb-6"
          >
            Login
          </button>

          {/* Find out more */}
          <button
            onClick={handleFindOutMore}
            className="text-white text-lg underline hover:text-gray-300 transition-colors"
          >
            Find out more
          </button>
        </div>

        {/* Bottom Indicator */}
        <div className="flex justify-center pb-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen