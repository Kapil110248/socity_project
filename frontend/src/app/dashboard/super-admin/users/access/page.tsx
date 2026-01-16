'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Key,
  Users,
  Lock,
  Unlock,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RoleGuard } from '@/components/auth/role-guard'

const roles = [
  {
    id: 1,
    name: 'Society Admin',
    description: 'Full access to society management features',
    users: 156,
    permissions: ['manage_residents', 'manage_staff', 'manage_billing', 'view_reports'],
  },
  {
    id: 2,
    name: 'Society Manager',
    description: 'Limited administrative access',
    users: 45,
    permissions: ['manage_residents', 'manage_staff', 'view_reports'],
  },
  {
    id: 3,
    name: 'Accountant',
    description: 'Financial management access only',
    users: 78,
    permissions: ['manage_billing', 'view_reports'],
  },
  {
    id: 4,
    name: 'Security Head',
    description: 'Security and visitor management',
    users: 120,
    permissions: ['manage_security', 'view_reports'],
  },
]

const permissions = [
  { id: 'manage_residents', label: 'Manage Residents', description: 'Add, edit, remove residents' },
  { id: 'manage_staff', label: 'Manage Staff', description: 'Manage guards, helpers, vendors' },
  { id: 'manage_billing', label: 'Manage Billing', description: 'Create invoices, track payments' },
  { id: 'manage_security', label: 'Manage Security', description: 'Visitor logs, gate access' },
  { id: 'view_reports', label: 'View Reports', description: 'Access analytics and reports' },
  { id: 'manage_settings', label: 'Manage Settings', description: 'Configure society settings' },
]

const activeSessions = [
  { id: 1, user: 'Rajesh Kumar', society: 'Green Valley', device: 'Chrome / Windows', ip: '192.168.1.100', lastActive: '2 min ago' },
  { id: 2, user: 'Priya Sharma', society: 'Sunrise Heights', device: 'Safari / MacOS', ip: '192.168.1.101', lastActive: '15 min ago' },
  { id: 3, user: 'Neha Patel', society: 'Silver Oaks', device: 'Mobile App / iOS', ip: '192.168.1.102', lastActive: '1 hour ago' },
]

export default function AccessControlPage() {
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null)

  return (
    <RoleGuard allowedRoles={['super_admin']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Access Control</h1>
            <p className="text-gray-600">Manage roles, permissions, and active sessions</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{roles.length}</p>
                  <p className="text-sm text-gray-500">Roles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Key className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{permissions.length}</p>
                  <p className="text-sm text-gray-500">Permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeSessions.length}</p>
                  <p className="text-sm text-gray-500">Active Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Lock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2FA</p>
                  <p className="text-sm text-gray-500">Enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Roles */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Define access levels for different user types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRole?.id === role.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                      <Badge variant="secondary">{role.users} users</Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {role.permissions.map((perm) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>
                {selectedRole ? `Configure permissions for ${selectedRole.name}` : 'Select a role to configure'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {selectedRole?.permissions.includes(permission.id) ? (
                          <Unlock className="h-4 w-4 text-green-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{permission.label}</p>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={selectedRole?.permissions.includes(permission.id) || false}
                      disabled={!selectedRole}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Sessions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Currently logged in users across all societies</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                Terminate All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Society</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.user}</TableCell>
                    <TableCell>{session.society}</TableCell>
                    <TableCell className="text-sm text-gray-500">{session.device}</TableCell>
                    <TableCell className="text-sm text-gray-500 font-mono">{session.ip}</TableCell>
                    <TableCell className="text-sm text-gray-500">{session.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </RoleGuard>
  )
}
