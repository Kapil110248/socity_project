'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  Home,
  MapPin,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RoleGuard } from '@/components/auth/role-guard'

import { useSocietyStore } from '@/lib/stores/society-store'

export default function SocietiesPage() {
  const { societies } = useSocietyStore()
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { title: 'Total Societies', value: societies.length, icon: Building2, color: 'bg-blue-500' },
    { title: 'Active', value: societies.filter(s => s.status === 'active').length, icon: CheckCircle2, color: 'bg-green-500' },
    { title: 'Pending Approval', value: societies.filter(s => s.status === 'pending').length, icon: Clock, color: 'bg-orange-500' },
    { title: 'Suspended', value: societies.filter(s => s.status === 'suspended').length, icon: XCircle, color: 'bg-red-500' },
  ]

  const filteredSocieties = societies.filter(
    (society) =>
      society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      society.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Pending</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">{plan}</Badge>
      case 'Professional':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{plan}</Badge>
      case 'Basic':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{plan}</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

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
            <h1 className="text-2xl font-bold text-gray-900">Societies Management</h1>
            <p className="text-gray-600">Manage all registered societies on the platform</p>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${stat.color} rounded-xl`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search societies by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Societies Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>All Societies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Society</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSocieties.map((society) => (
                  <TableRow key={society.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Building2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{society.name}</p>
                          <p className="text-xs text-gray-500">Joined {society.joinedDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {society.city}, {society.state}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Home className="h-3 w-3 text-gray-400" />
                        {society.units}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        {society.users}
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(society.plan)}</TableCell>
                    <TableCell>{getStatusBadge(society.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{society.adminName}</p>
                        <p className="text-xs text-gray-500">{society.adminEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Society
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
