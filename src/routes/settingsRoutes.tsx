import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { ProtectedRoute } from '../components/ProtectedRoute'

const ProfileSettings = lazy(() => import('@/pages/settings/index'))
const PasswordSettings = lazy(() => import('@/pages/settings/password'))
const AppearanceSettings = lazy(() => import('@/pages/settings/appearance'))
const TwoFactorSettings = lazy(() => import('@/pages/settings/two-factor'))

export const settingsRoutes: RouteObject[] = [
{
    path: '/settings',
    element: (
      <ProtectedRoute>
      <ProfileSettings/>
      </ProtectedRoute>
    ),
   },
   {
    path: '/settings/password',
    element: (
      <ProtectedRoute>
      <PasswordSettings/>
      </ProtectedRoute>
    ),
   },
   {
    path: '/settings/appearance',
    element: (
      <ProtectedRoute>
      <AppearanceSettings/>
      </ProtectedRoute>
    ),
   },
   {
    path: '/settings/two-factor',
    element: (
      <ProtectedRoute>
      <TwoFactorSettings/>
      </ProtectedRoute>
    ),
   }
]