import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProfileSettings from './pages/settings/index.tsx'
import PasswordSettings from './pages/settings/password.tsx'
import AppearanceSettings from './pages/settings/appearance.tsx'
import TwoFactorSettings from './pages/settings/two-factor.tsx'
import Login from './pages/auth/login.tsx'
import Register from './pages/auth/register.tsx'
import ForgotPassword from './pages/auth/forgot-password.tsx'
import ResetPassword from './pages/auth/reset-password.tsx'
import VerifyEmail from './pages/auth/verify-email.tsx'
import TwoFactorChallenge from './pages/auth/two-factor-challenge.tsx'
import ConfirmPassword from './pages/auth/confirm-password.tsx'
import { initializeTheme } from './hooks/use-appearance'

// Initialize theme on app load
initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/settings/password" element={<PasswordSettings />} />
        <Route path="/settings/appearance" element={<AppearanceSettings />} />
        <Route path="/settings/two-factor" element={<TwoFactorSettings />} />
        
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/two-factor-challenge" element={<TwoFactorChallenge />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
