'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type UserRole = 'super_admin' | 'admin' | 'community-manager' | 'resident' | 'guard'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RoleGuard({
  children,
  allowedRoles,
  redirectTo = '/dashboard',
}: RoleGuardProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Check if user has required role
  const hasRequiredRole = user?.role && allowedRoles.includes(user.role as UserRole)

  if (!hasRequiredRole) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. This page is only
            available to{' '}
            {allowedRoles.map((role, index) => (
              <span key={role}>
                <strong className="capitalize">{role}</strong>
                {index < allowedRoles.length - 1 &&
                  (index === allowedRoles.length - 2 ? ' and ' : ', ')}
              </span>
            ))}
            .
          </p>
          <Button
            onClick={() => router.push(redirectTo)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Go to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
