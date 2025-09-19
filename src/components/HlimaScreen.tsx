import React from 'react'
import { useNavigate } from 'react-router-dom'

const Heart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 21s-6.716-4.21-9.502-7.682C.5 10.79 1.51 7.5 4.41 6.3c1.8-.76 3.97-.2 5.29 1.11L12 9.71l2.3-2.3c1.32-1.31 3.49-1.87 5.29-1.11 2.9 1.2 3.91 4.49 1.91 7.018C18.716 16.79 12 21 12 21z" />
  </svg>
)

const HlimaScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Romantic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-900 via-fuchsia-900 to-black" />

      {/* Soft light overlays */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl" />
      <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-6 bottom-10 animate-bounce duration-1000">
          <Heart className="w-8 h-8 text-rose-300/60" />
        </div>
        <div className="absolute left-1/3 bottom-24 animate-[bounce_1.6s_infinite]">
          <Heart className="w-6 h-6 text-pink-300/60" />
        </div>
        <div className="absolute right-8 bottom-16 animate-[bounce_1.3s_infinite]">
          <Heart className="w-10 h-10 text-fuchsia-300/60" />
        </div>
        <div className="absolute right-1/4 top-24 animate-[bounce_2s_infinite]">
          <Heart className="w-7 h-7 text-rose-200/50" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-10 text-rose-200 hover:text-white/90 transition-colors underline"
        >
          ← Retour
        </button>

        <div className="inline-flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-rose-300" />
          <span className="uppercase tracking-widest text-rose-200/80 text-sm">Pour ma chère</span>
          <Heart className="w-8 h-8 text-rose-300" />
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-pink-200 drop-shadow-md">
          Hlima
        </h1>

        <p className="mt-8 text-rose-100/90 text-lg leading-relaxed">
          Depuis que nos chemins se sont croisés, chaque instant a pris la couleur d’un rêve. 
          Ton sourire est mon lever de soleil, ta voix la mélodie qui apaise mon monde. 
          Je te promets une tendresse infinie, des rires sincères, et une place éternelle dans mon cœur.
        </p>

        <p className="mt-6 text-rose-100/90 text-lg">
          Je t’aime, Hlima — aujourd’hui, demain, et tous les jours qui suivront.
        </p>

        {/* Big heart */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <Heart className="w-40 h-40 text-rose-400 drop-shadow-[0_0_25px_rgba(244,114,182,0.35)]" />
            <div className="absolute inset-0 animate-ping rounded-full text-rose-400/30">
              <Heart className="w-40 h-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HlimaScreen
