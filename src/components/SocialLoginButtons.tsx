import React from 'react'

interface SocialButton {
  name: string
  bgColor: string
  textColor?: string
  src: string
  alt: string
}

// Order required: Google, Facebook, Apple, Steam, Xbox, PlayStation
const socialButtons: SocialButton[] = [
  { name: 'Google', bgColor: 'bg-white', textColor: 'text-black', src: '/logos/google.svg', alt: 'Sign in with Google' },
  { name: 'Facebook', bgColor: 'bg-blue-600', src: '/logos/facebook.svg', alt: 'Sign in with Facebook' },
  { name: 'Apple', bgColor: 'bg-gray-200', textColor: 'text-black', src: '/logos/apple.svg', alt: 'Sign in with Apple' },
  { name: 'Steam', bgColor: 'bg-black', src: '/logos/steam.svg', alt: 'Sign in with Steam' },
  { name: 'Xbox', bgColor: 'bg-green-600', src: '/logos/xbox.svg', alt: 'Sign in with Xbox' },
  { name: 'PlayStation', bgColor: 'bg-blue-700', src: '/logos/playstation.svg', alt: 'Sign in with PlayStation' }
]

const SocialLoginButtons: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Social login clicked: ${provider}`)
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 place-items-center justify-center">
      {socialButtons.map((button) => (
        <button
          key={button.name}
          onClick={() => handleSocialLogin(button.name)}
          aria-label={button.alt}
          title={button.alt}
          className={`w-14 h-14 ${button.bgColor} ${button.textColor || 'text-white'} rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-slate-900`}
        >
          <img src={button.src} alt="" className="w-7 h-7 object-contain" />
        </button>
      ))}
    </div>
  )
}

export default SocialLoginButtons