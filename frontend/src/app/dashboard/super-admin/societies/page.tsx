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
  Ban,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RoleGuard } from '@/components/auth/role-guard'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import toast from 'react-hot-toast'

export default function SocietiesPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSociety, setEditingSociety] = useState<any>(null)

  const { data: societies = [], isLoading } = useQuery<any[]>({
    queryKey: ['societies'],
    queryFn: async () => {
      const response = await api.get('/society/all')
      return response.data
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await api.patch(`/society/${id}/status`, { status })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['societies'] })
      toast.success('Society status updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update status')
    }
  })

  const updateSocietyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await api.put(`/society/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['societies'] })
      toast.success('Society updated successfully')
      setIsEditDialogOpen(false)
      setEditingSociety(null)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update society')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/society/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['societies'] })
      toast.success('Society deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete society')
    }
  })

  const stats = [
    { title: 'Total Societies', value: societies.length, icon: Building2, color: 'bg-blue-500' },
    { title: 'Active', value: societies.filter((s: any) => s.status === 'active').length, icon: CheckCircle2, color: 'bg-green-500' },
    { title: 'Pending Approval', value: societies.filter((s: any) => s.status === 'pending').length, icon: Clock, color: 'bg-orange-500' },
    { title: 'Suspended', value: societies.filter((s: any) => s.status === 'suspended').length, icon: XCircle, color: 'bg-red-500' },
  ]

  const filteredSocieties = societies.filter(
    (society: any) =>
      society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (society.city && society.city.toLowerCase().includes(searchQuery.toLowerCase()))
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ) : filteredSocieties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                      No societies found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSocieties.map((society: any) => (
                  <TableRow key={society.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Building2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{society.name}</p>
                          <p className="text-xs text-gray-500">Joined {new Date(society.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {society.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Home className="h-3 w-3 text-gray-400" />
                        {society.unitsCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        {society.usersCount}
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(society.subscriptionPlan)}</TableCell>
                    <TableCell>{getStatusBadge(society.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{society.admin.name}</p>
                        <p className="text-xs text-gray-500">{society.admin.email}</p>
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
                          <DropdownMenuItem onClick={() => {
                            setEditingSociety(society)
                            setIsEditDialogOpen(true)
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {society.status !== 'active' && (
                            <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: society.id, status: 'ACTIVE' })}>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {society.status !== 'suspended' && (
                            <DropdownMenuItem className="text-red-600" onClick={() => updateStatusMutation.mutate({ id: society.id, status: 'SUSPENDED' })}>
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            if (confirm('Are you sure you want to delete this society? This action cannot be undone.')) {
                              deleteMutation.mutate(society.id)
                            }
                          }} className="text-red-100 bg-red-600 hover:bg-red-700 focus:bg-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Society
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )))
              }
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Society Details</DialogTitle>
            </DialogHeader>
            {editingSociety && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Society Name</Label>
                  <Input
                    id="name"
                    value={editingSociety.name}
                    onChange={(e) => setEditingSociety({ ...editingSociety, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={editingSociety.city}
                      onChange={(e) => setEditingSociety({ ...editingSociety, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={editingSociety.state}
                      onChange={(e) => setEditingSociety({ ...editingSociety, state: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editingSociety.address}
                    onChange={(e) => setEditingSociety({ ...editingSociety, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={editingSociety.pincode}
                    onChange={(e) => setEditingSociety({ ...editingSociety, pincode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Subscription Plan</Label>
                  <Select
                    value={editingSociety.subscriptionPlan}
                    onValueChange={(value) => setEditingSociety({ ...editingSociety, subscriptionPlan: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BASIC">Basic</SelectItem>
                      <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => updateSocietyMutation.mutate({
                  id: editingSociety.id,
                  data: {
                    name: editingSociety.name,
                    address: editingSociety.address,
                    city: editingSociety.city,
                    state: editingSociety.state,
                    pincode: editingSociety.pincode,
                    subscriptionPlan: editingSociety.subscriptionPlan
                  }
                })}
                disabled={updateSocietyMutation.isPending}
              >
                {updateSocietyMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </RoleGuard>
  )
}
