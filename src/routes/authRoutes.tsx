import type { RouteObject } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

const Login = lazy(() => import('@/pages/auth/login'))
const Register = lazy(() => import('@/pages/auth/register'))
const ForgotPassword = lazy(() => import('@/pages/auth/forgot-password'))
const ResetPassword = lazy(() => import('@/pages/auth/reset-password'))
const VerifyEmail = lazy(() => import('@/pages/auth/verify-email'))
const TwoFactor = lazy(() => import('@/pages/auth/two-factor-challenge'))
const ConfirmPassword = lazy(() => import('@/pages/auth/confirm-password'))

export const authRoutes: RouteObject[] = [
   {
    path: '/auth/login',
    element: (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <Login />
      </Suspense>
    ),
   },
   {
    path: '/auth/register',
    element: (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <Register />
      </Suspense>
    )
   },
   {
    path: '/auth/forgot-password',
    element:(
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <ForgotPassword />
      </Suspense>
    )
   },
   {
    path: '/auth/reset-password',
    element:(
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <ResetPassword />
      </Suspense>
    )
   },
   {
    path: '/auth/verify-email',
    element:(
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <VerifyEmail />
      </Suspense>
    )
   },
   {
    path: '/auth/two-factor-challenge',
    element:(
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <TwoFactor />
      </Suspense>
    )
   },
   {
    path: '/auth/confirm-password',
    element:(
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>} >
        <ConfirmPassword />
      </Suspense>
    )
   }
]