'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Users,
  Home,
  Phone,
  Mail,
  Calendar,
  Car,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  UserPlus,
  FileText,
  AlertCircle,
  Clock,
  IndianRupee,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const stats = [
  {
    title: 'Total Tenants',
    value: '48',
    change: '+5 this month',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Active Leases',
    value: '42',
    change: '87.5%',
    icon: Home,
    color: 'green',
  },
  {
    title: 'Notice Period',
    value: '4',
    change: 'Expiring soon',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Monthly Rent Collection',
    value: '\u20B912.5L',
    change: '+8% vs last month',
    icon: IndianRupee,
    color: 'purple',
  },
]

const tenants = [
  {
    id: 'TEN-001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 98765 43210',
    unit: 'A-101',
    block: 'Block A',
    floor: '1st Floor',
    ownerName: 'Suresh Sharma',
    ownerPhone: '+91 87654 32109',
    leaseStartDate: '2024-01-15',
    leaseEndDate: '2025-01-14',
    rentAmount: 25000,
    securityDeposit: 75000,
    maintenanceCharges: 3500,
    parkingSlot: 'P-A-15',
    vehicleNumber: 'MH 01 AB 1234',
    familyMembers: 4,
    status: 'active',
  },
  {
    id: 'TEN-002',
    name: 'Priya Patel',
    email: 'priya.patel@yahoo.com',
    phone: '+91 98123 45678',
    unit: 'B-205',
    block: 'Block B',
    floor: '2nd Floor',
    ownerName: 'Amit Patel',
    ownerPhone: '+91 76543 21098',
    leaseStartDate: '2024-03-01',
    leaseEndDate: '2025-02-28',
    rentAmount: 32000,
    securityDeposit: 96000,
    maintenanceCharges: 4000,
    parkingSlot: 'P-B-08',
    vehicleNumber: 'MH 02 CD 5678',
    familyMembers: 3,
    status: 'active',
  },
  {
    id: 'TEN-003',
    name: 'Mohammed Farooq',
    email: 'mfarooq@gmail.com',
    phone: '+91 99887 76655',
    unit: 'C-302',
    block: 'Block C',
    floor: '3rd Floor',
    ownerName: 'Vikram Singh',
    ownerPhone: '+91 65432 10987',
    leaseStartDate: '2023-06-15',
    leaseEndDate: '2024-12-31',
    rentAmount: 28000,
    securityDeposit: 84000,
    maintenanceCharges: 3500,
    parkingSlot: null,
    vehicleNumber: null,
    familyMembers: 5,
    status: 'notice_period',
  },
  {
    id: 'TEN-004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@outlook.com',
    phone: '+91 88776 65544',
    unit: 'A-402',
    block: 'Block A',
    floor: '4th Floor',
    ownerName: 'Krishna Murthy',
    ownerPhone: '+91 54321 09876',
    leaseStartDate: '2024-06-01',
    leaseEndDate: '2025-05-31',
    rentAmount: 35000,
    securityDeposit: 105000,
    maintenanceCharges: 4500,
    parkingSlot: 'P-A-22',
    vehicleNumber: 'TS 09 EF 9012',
    familyMembers: 2,
    status: 'active',
  },
  {
    id: 'TEN-005',
    name: 'Ankit Jain',
    email: 'ankit.jain@gmail.com',
    phone: '+91 77665 54433',
    unit: 'D-103',
    block: 'Block D',
    floor: '1st Floor',
    ownerName: 'Ramesh Agarwal',
    ownerPhone: '+91 43210 98765',
    leaseStartDate: '2024-02-15',
    leaseEndDate: '2025-02-14',
    rentAmount: 22000,
    securityDeposit: 66000,
    maintenanceCharges: 3000,
    parkingSlot: 'P-D-05',
    vehicleNumber: 'MH 04 GH 3456',
    familyMembers: 3,
    status: 'active',
  },
]

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [blockFilter, setBlockFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [viewingTenant, setViewingTenant] = useState<typeof tenants[0] | null>(null)
  const [editingTenant, setEditingTenant] = useState<typeof tenants[0] | null>(null)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleAddTenant = () => {
    setIsAddDialogOpen(false)
    showNotification('Tenant added successfully!')
  }

  const handleExport = () => {
    showNotification('Tenant data exported successfully!')
  }

  const handleSaveEdit = () => {
    setEditingTenant(null)
    showNotification('Tenant details updated successfully!')
  }

  const handleDeleteTenant = (tenantId: string) => {
    if (confirm(`Are you sure you want to remove tenant ${tenantId}?`)) {
      showNotification(`Tenant ${tenantId} removed successfully!`)
    }
  }

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBlock = blockFilter === 'all' || tenant.block === blockFilter
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter

    return matchesSearch && matchesBlock && matchesStatus
  })

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              {showSuccess}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tenant Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage tenant details, leases, and rental information
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="gap-2 text-sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white gap-2 text-sm">
                  <UserPlus className="h-4 w-4" />
                  <span>Add Tenant</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Tenant</DialogTitle>
                  <DialogDescription>
                    Register a new tenant when they rent a unit
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input placeholder="Enter tenant name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input type="email" placeholder="tenant@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number *</Label>
                        <Input placeholder="+91 98765 43210" />
                      </div>
                      <div className="space-y-2">
                        <Label>Family Members</Label>
                        <Input type="number" placeholder="4" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Emergency Contact</Label>
                        <Input placeholder="+91 87654 32109" />
                      </div>
                    </div>
                  </div>

                  {/* Unit Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Unit Details</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Block *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select block" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Block A">Block A</SelectItem>
                            <SelectItem value="Block B">Block B</SelectItem>
                            <SelectItem value="Block C">Block C</SelectItem>
                            <SelectItem value="Block D">Block D</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Floor *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select floor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                            <SelectItem value="1st Floor">1st Floor</SelectItem>
                            <SelectItem value="2nd Floor">2nd Floor</SelectItem>
                            <SelectItem value="3rd Floor">3rd Floor</SelectItem>
                            <SelectItem value="4th Floor">4th Floor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Unit Number *</Label>
                        <Input placeholder="A-101" />
                      </div>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Owner Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Owner Name *</Label>
                        <Input placeholder="Property owner name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Owner Phone *</Label>
                        <Input placeholder="+91 87654 32109" />
                      </div>
                    </div>
                  </div>

                  {/* Lease Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Lease & Payment Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Lease Start Date *</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Lease End Date *</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Monthly Rent (\u20B9) *</Label>
                        <Input type="number" placeholder="25000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Security Deposit (\u20B9) *</Label>
                        <Input type="number" placeholder="75000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Maintenance Charges (\u20B9)</Label>
                        <Input type="number" placeholder="3500" />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="notice_period">Notice Period</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle & Parking */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Vehicle & Parking</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Parking Slot</Label>
                        <Input placeholder="P-A-15" />
                      </div>
                      <div className="space-y-2">
                        <Label>Vehicle Number</Label>
                        <Input placeholder="MH 01 AB 1234" />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Any additional information..." rows={3} />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddTenant}>
                      Add Tenant
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </h3>
                      <p className="text-sm mt-1 text-gray-500">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-xl ${
                        stat.color === 'blue'
                          ? 'bg-blue-100'
                          : stat.color === 'green'
                          ? 'bg-green-100'
                          : stat.color === 'orange'
                          ? 'bg-orange-100'
                          : 'bg-purple-100'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          stat.color === 'blue'
                            ? 'text-blue-600'
                            : stat.color === 'green'
                            ? 'text-green-600'
                            : stat.color === 'orange'
                            ? 'text-orange-600'
                            : 'text-purple-600'
                        }`}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, unit, phone, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={blockFilter} onValueChange={setBlockFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Block" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                <SelectItem value="Block A">Block A</SelectItem>
                <SelectItem value="Block B">Block B</SelectItem>
                <SelectItem value="Block C">Block C</SelectItem>
                <SelectItem value="Block D">Block D</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="notice_period">Notice Period</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </Card>

        {/* Tenants Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead>Lease End</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">{tenant.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{tenant.name}</p>
                        <p className="text-xs text-gray-500">{tenant.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tenant.unit}</p>
                        <p className="text-xs text-gray-500">{tenant.block}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{tenant.phone}</TableCell>
                    <TableCell className="font-semibold">
                      \u20B9{tenant.rentAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      \u20B9{tenant.maintenanceCharges.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{tenant.leaseEndDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          tenant.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : tenant.status === 'notice_period'
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {tenant.status === 'active' && 'Active'}
                        {tenant.status === 'notice_period' && 'Notice Period'}
                        {tenant.status === 'inactive' && 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" title="View Details" onClick={() => setViewingTenant(tenant)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit" onClick={() => setEditingTenant(tenant)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteTenant(tenant.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* View Tenant Dialog */}
        <Dialog open={viewingTenant !== null} onOpenChange={() => setViewingTenant(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tenant Details</DialogTitle>
              <DialogDescription>Complete information about the tenant</DialogDescription>
            </DialogHeader>
            {viewingTenant && (
              <div className="space-y-6 py-4">
                {/* Personal Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">PERSONAL INFORMATION</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Name</Label>
                      <p className="font-medium">{viewingTenant.name}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Tenant ID</Label>
                      <p className="font-medium">{viewingTenant.id}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Email</Label>
                      <p className="font-medium">{viewingTenant.email}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Phone</Label>
                      <p className="font-medium">{viewingTenant.phone}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Family Members</Label>
                      <p className="font-medium">{viewingTenant.familyMembers}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Status</Label>
                      <Badge className={viewingTenant.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                        {viewingTenant.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Unit Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">UNIT DETAILS</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Unit</Label>
                      <p className="font-medium">{viewingTenant.unit}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Block</Label>
                      <p className="font-medium">{viewingTenant.block}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Floor</Label>
                      <p className="font-medium">{viewingTenant.floor}</p>
                    </div>
                  </div>
                </div>

                {/* Owner Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">OWNER DETAILS</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Owner Name</Label>
                      <p className="font-medium">{viewingTenant.ownerName}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Owner Phone</Label>
                      <p className="font-medium">{viewingTenant.ownerPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Lease & Payment Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">LEASE & PAYMENT</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Lease Start</Label>
                      <p className="font-medium">{viewingTenant.leaseStartDate}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Lease End</Label>
                      <p className="font-medium">{viewingTenant.leaseEndDate}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Monthly Rent</Label>
                      <p className="font-medium text-green-600">\u20B9{viewingTenant.rentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Security Deposit</Label>
                      <p className="font-medium">\u20B9{viewingTenant.securityDeposit.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Maintenance Charges</Label>
                      <p className="font-medium">\u20B9{viewingTenant.maintenanceCharges.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">VEHICLE & PARKING</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Parking Slot</Label>
                      <p className="font-medium">{viewingTenant.parkingSlot || 'Not Assigned'}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Vehicle Number</Label>
                      <p className="font-medium">{viewingTenant.vehicleNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setViewingTenant(null)}>Close</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Tenant Dialog */}
        <Dialog open={editingTenant !== null} onOpenChange={() => setEditingTenant(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Tenant</DialogTitle>
              <DialogDescription>Update tenant information</DialogDescription>
            </DialogHeader>
            {editingTenant && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue={editingTenant.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue={editingTenant.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={editingTenant.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Input defaultValue={editingTenant.unit} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Rent (\u20B9)</Label>
                    <Input type="number" defaultValue={editingTenant.rentAmount} />
                  </div>
                  <div className="space-y-2">
                    <Label>Maintenance (\u20B9)</Label>
                    <Input type="number" defaultValue={editingTenant.maintenanceCharges} />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue={editingTenant.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="notice_period">Notice Period</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Lease End Date</Label>
                    <Input type="date" defaultValue={editingTenant.leaseEndDate} />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingTenant(null)}>Cancel</Button>
                  <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleSaveEdit}>Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RoleGuard>
  )
}
