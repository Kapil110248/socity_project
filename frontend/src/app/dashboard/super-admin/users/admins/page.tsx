'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Building2,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Mail,
  User,
  Trash2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RoleGuard } from '@/components/auth/role-guard'
import { useSocietyStore } from '@/lib/stores/society-store'

// Initial mock data extended with dynamic capability conceptually (in a real app, this would also be a store or API)
interface Admin {
  id: number
  name: string
  email: string
  society: string
  status: string
  joinedDate: string
  lastLogin: string
  phone?: string
  designation?: string
  societyId?: string
}

const initialAdmins: Admin[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@greenvalley.com',
    society: 'Green Valley Apartments',
    status: 'active',
    joinedDate: '2023-06-15',
    lastLogin: '2 hours ago',
    phone: '+91 98765 43210',
    designation: 'Secretary',
    societyId: '1'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@sunriseheights.com',
    society: 'Sunrise Heights',
    status: 'active',
    joinedDate: '2023-08-20',
    lastLogin: '1 day ago',
    phone: '+91 98765 43211',
    designation: 'Treasurer',
    societyId: '2'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    email: 'vikram@palmgardens.com',
    society: 'Palm Gardens',
    status: 'pending',
    joinedDate: '2024-12-18',
    lastLogin: 'Never',
    phone: '+91 98765 43212',
    designation: 'Member',
    societyId: '3'
  },
]

export default function SocietyAdminsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins)
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)
  const { societies } = useSocietyStore()

  // New Admin Form State
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    password: '',
    societyId: '',
    role: 'admin' // Default to admin for this page
  })

  // States for View, Edit, Delete
  const [viewAdmin, setViewAdmin] = useState<Admin | null>(null)
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null)
  const [deleteAdminId, setDeleteAdminId] = useState<number | null>(null)

  // Filter admins
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.society.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password || !newAdmin.societyId) return

    const selectedSociety = societies.find(s => s.id.toString() === newAdmin.societyId)

    const adminData: Admin = {
      id: admins.length + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      society: selectedSociety ? selectedSociety.name : 'Unknown Society',
      status: 'active', // Default active for now
      joinedDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      phone: newAdmin.phone, // Include phone
      designation: newAdmin.designation, // Include designation
      societyId: newAdmin.societyId
    }

    setAdmins([...admins, adminData])
    setIsAddAdminOpen(false)
    setNewAdmin({ name: '', email: '', phone: '', designation: '', password: '', societyId: '', role: 'admin' })
  }

  const handleUpdateAdmin = () => {
    if (!editAdmin || !editAdmin.name || !editAdmin.email || !editAdmin.societyId) return

    const selectedSociety = societies.find(s => s.id.toString() === editAdmin.societyId)

    const updatedAdmins = admins.map(admin =>
      admin.id === editAdmin.id
        ? { ...editAdmin, society: selectedSociety ? selectedSociety.name : admin.society }
        : admin
    )

    setAdmins(updatedAdmins)
    setEditAdmin(null)
  }

  const handleDeleteAdmin = () => {
    if (deleteAdminId === null) return
    setAdmins(admins.filter(a => a.id !== deleteAdminId))
    setDeleteAdminId(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case 'suspended':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Society Admins</h1>
            <p className="text-gray-600">Manage all society administrators on the platform</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            onClick={() => setIsAddAdminOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Admin
          </Button>
        </div>

        {/* Stats - Simplified for this view */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{admins.filter(a => a.status === 'active').length}</p>
                  <p className="text-sm text-gray-500">Active Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* ... other stats can be kept or removed as per preference */}
        </div>

        {/* Search */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or society..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admins Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>All Society Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin</TableHead>
                  <TableHead>Society</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{admin.name}</p>
                          <p className="text-xs text-gray-500">{admin.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{admin.society}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(admin.status)}</TableCell>
                    <TableCell className="text-sm text-gray-500">{admin.joinedDate}</TableCell>
                    <TableCell className="text-sm text-gray-500">{admin.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setViewAdmin(admin)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditAdmin({ ...admin, societyId: societies.find(s => s.name === admin.society)?.id.toString() || '' })}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => setDeleteAdminId(admin.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Admin
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

        {/* View Admin Dialog */}
        <Dialog open={!!viewAdmin} onOpenChange={() => setViewAdmin(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Profile</DialogTitle>
            </DialogHeader>
            {viewAdmin && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl bg-purple-100 text-purple-700">
                      {viewAdmin.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{viewAdmin.name}</h3>
                    <p className="text-gray-500">{viewAdmin.designation || 'Administrator'}</p>
                    <div className="flex gap-2 mt-2">
                      {getStatusBadge(viewAdmin.status)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-1">
                    <Label className="text-gray-500 text-xs">Email</Label>
                    <p className="font-medium">{viewAdmin.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500 text-xs">Phone</Label>
                    <p className="font-medium">{viewAdmin.phone || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500 text-xs">Society</Label>
                    <p className="font-medium">{viewAdmin.society}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500 text-xs">Joined Date</Label>
                    <p className="font-medium">{viewAdmin.joinedDate}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Admin Dialog */}
        <Dialog open={!!editAdmin} onOpenChange={() => setEditAdmin(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Administrator</DialogTitle>
              <DialogDescription>Update admin details and permissions.</DialogDescription>
            </DialogHeader>
            {editAdmin && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={editAdmin.name}
                    onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={editAdmin.email}
                    onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={editAdmin.phone || ''}
                    onChange={(e) => setEditAdmin({ ...editAdmin, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Designation</Label>
                  <Input
                    value={editAdmin.designation || ''}
                    onChange={(e) => setEditAdmin({ ...editAdmin, designation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Society</Label>
                  <Select
                    value={editAdmin.societyId}
                    onValueChange={(val) => setEditAdmin({ ...editAdmin, societyId: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Society" />
                    </SelectTrigger>
                    <SelectContent>
                      {societies.map((society) => (
                        <SelectItem key={society.id} value={society.id.toString()}>
                          {society.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editAdmin.status}
                    onValueChange={(val) => setEditAdmin({ ...editAdmin, status: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditAdmin(null)}>Cancel</Button>
              <Button onClick={handleUpdateAdmin}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteAdminId !== null} onOpenChange={() => setDeleteAdminId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Administrator</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this administrator? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteAdminId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteAdmin}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Admin Dialog (Existing) */}
        <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Society Admin</DialogTitle>
              <DialogDescription>
                Create a new administrator account and assign them to a society.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g. John Doe"
                    className="pl-10"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g. admin@society.com"
                    className="pl-10"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+91 98765 43210"
                  value={newAdmin.phone}
                  onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Designation</Label>
                <Input
                  placeholder="e.g. Secretary, Chairman"
                  value={newAdmin.designation}
                  onChange={(e) => setNewAdmin({ ...newAdmin, designation: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Temporary Password</Label>
                <Input
                  type="password"
                  placeholder="********"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Assign Society</Label>
                <Select
                  value={newAdmin.societyId}
                  onValueChange={(val) => setNewAdmin({ ...newAdmin, societyId: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a society" />
                  </SelectTrigger>
                  <SelectContent>
                    {societies.map((society) => (
                      <SelectItem key={society.id} value={society.id.toString()}>
                        {society.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAdmin} disabled={!newAdmin.name || !newAdmin.email || !newAdmin.password || !newAdmin.societyId}>
                Create Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </RoleGuard>
  )
}
