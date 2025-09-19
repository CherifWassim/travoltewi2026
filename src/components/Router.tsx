import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen'
import EALoginPage from './EALoginPage'
import PasswordScreen from './PasswordScreen'
import AdminPage from './AdminPage'
import VerificationCodeScreen from './VerificationCodeScreen'
import HlimaScreen from './HlimaScreen'

const Router: React.FC = () => {
  console.log('Router component rendered')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<EALoginPage />} />
        <Route path="/password" element={<PasswordScreen />} />
        <Route path="/verify" element={<VerificationCodeScreen />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/hlima" element={<HlimaScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router