import React from 'react'

interface LoginFormProps {
  email: string
  setEmail: (email: string) => void
  rememberMe: boolean
  setRememberMe: (remember: boolean) => void
  onNext: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  rememberMe,
  setRememberMe,
  onNext
}) => {
  console.log('LoginForm rendered with props:', { email, rememberMe })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted')
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full h-full">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-3 uppercase tracking-wider">
          Phone or Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            console.log('Email input changed:', e.target.value)
            setEmail(e.target.value)
          }}
          placeholder="Enter your phone or email"
          className="w-full px-4 py-4 bg-transparent border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => {
            console.log('Remember me toggled:', !rememberMe)
            setRememberMe(!rememberMe)
          }}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
            rememberMe 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-slate-600 hover:border-blue-500'
          }`}
        >
          {rememberMe && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <label className="text-white text-base cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors text-lg tracking-wider"
      >
        NEXT
      </button>
    </form>
  )
}

export default LoginForm