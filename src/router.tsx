import { createBrowserRouter, Navigate } from 'react-router-dom'
import React, { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import AuthGuard from '@/components/AuthGuard'
import App from './App'
import { authRoutes } from './routes/authRoutes'
import { dashboardRoutes } from '@/routes/dashboardRoutes'
import { settingsRoutes } from '@/routes/settingsRoutes'
import { useAuthStore } from '@/stores/authStore' 

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
)

interface MainProtectedRouteProps {
  children: React.ReactNode
}

const MainProtectedRoute: React.FC<MainProtectedRouteProps> = ({ children }) => {
  const location = useLocation()
  
  return (
    <AuthGuard>
        <Suspense fallback={<LoadingSpinner />} key={location.key}>
          {children}
        </Suspense>
    </AuthGuard>
  )
}

const wrapWithSuspense = (routes: any[]) =>
  routes.map(route => ({
    ...route,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        {route.element}
      </Suspense>
    ),
  }))

const wrapProtectedRoutes = (routes: any[]) => 
  routes.map(route => ({
    ...route,
    element: <MainProtectedRoute>{route.element}</MainProtectedRoute>
  }))

  const HomeRedirect: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  // change '/dashboard' to whatever your default protected landing route is
  return <Navigate to={isAuthenticated ? '/dashboard' : '/auth/login'} replace />
}
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      ...wrapWithSuspense(authRoutes),
      
      // Protected routes with permissions
      ...wrapProtectedRoutes(dashboardRoutes),
      ...wrapProtectedRoutes(settingsRoutes),

      { path: '/', element: <HomeRedirect /> },
      { path: '*', element: <HomeRedirect /> },
    ]
  }
])
