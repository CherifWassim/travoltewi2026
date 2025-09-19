import React from 'react'
import Router from './components/Router'

function App() {
  console.log('App component rendered')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <Router />
    </div>
  )
}

export default App