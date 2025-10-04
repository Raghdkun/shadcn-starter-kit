import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { ProtectedRoute } from '../components/ProtectedRoute'

const DashboardPage = lazy(() => import('@/App'))

export const dashboardRoutes: RouteObject[] = [
   {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
      <DashboardPage/>
      </ProtectedRoute>
    ),
   },
   {
    path: '/',
    element: (
      <ProtectedRoute>
      <DashboardPage/>
      </ProtectedRoute>
    ),
   },
]