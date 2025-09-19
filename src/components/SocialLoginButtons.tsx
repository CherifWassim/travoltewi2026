import React from 'react'

interface SocialButton {
  name: string
  bgColor: string
  textColor?: string
  icon: string
}

const socialButtons: SocialButton[] = [
  { name: 'Apple', bgColor: 'bg-gray-200', textColor: 'text-black', icon: '🍎' },
  { name: 'Google', bgColor: 'bg-white', textColor: 'text-black', icon: 'G' },
  { name: 'Facebook', bgColor: 'bg-blue-600', icon: 'f' },
  { name: 'Steam', bgColor: 'bg-black', icon: '🎮' },
  { name: 'Xbox', bgColor: 'bg-green-600', icon: 'Ⓧ' },
  { name: 'PlayStation', bgColor: 'bg-blue-700', icon: 'PS' }
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
          className={`w-14 h-14 ${button.bgColor} ${button.textColor || 'text-white'} rounded-xl flex items-center justify-center font-bold text-lg hover:opacity-90 transition-opacity`}
        >
          {button.icon}
        </button>
      ))}
    </div>
  )
}

export default SocialLoginButtons