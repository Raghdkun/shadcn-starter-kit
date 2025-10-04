// components/ProtectedRoute.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { usePermissions } from '@/hooks/usePermissions'
import type { PermissionName } from '@/types/Permission'

interface Props {
  children: React.ReactNode
  permission?: PermissionName
  permissions?: PermissionName[]
  requireAll?: boolean
  role?: string
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<Props> = ({
  children,
  permission,
  permissions,
  requireAll = false,
  role,
  fallback,
}) => {
  const { isAuthenticated, isLoading } = useAuthStore()
  const { hasPermission, hasAnyPermission, hasAllPermissions, hasRole } = usePermissions()
  const location = useLocation()

  if (isLoading) return null // or a spinner

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  let hasAccess = true
  if (permission && !hasPermission(permission)) hasAccess = false
  if (permissions) {
    if (requireAll && !hasAllPermissions(permissions)) hasAccess = false
    if (!requireAll && !hasAnyPermission(permissions)) hasAccess = false
  }
  if (role && !hasRole(role)) hasAccess = false

  if (!hasAccess) {
    return fallback ?? <Navigate to="/403" replace />
  }

  return <>{children}</>
}
