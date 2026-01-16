'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Car,
  Bike,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  MapPin,
  User,
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

const stats = [
  {
    title: 'Total Slots',
    value: '156',
    change: 'All parking slots',
    icon: Car,
    color: 'blue',
  },
  {
    title: 'Occupied',
    value: '142',
    change: '91% occupancy',
    icon: CheckCircle,
    color: 'green',
  },
  {
    title: 'Available',
    value: '10',
    change: 'Ready to assign',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Under Maintenance',
    value: '4',
    change: 'Temporarily blocked',
    icon: AlertCircle,
    color: 'red',
  },
]

const parkingSlots = [
  {
    id: 'PS-001',
    slotNumber: 'P-A-15',
    type: 'four_wheeler',
    block: 'Block A',
    floor: 'Basement 1',
    assignedTo: 'Rajesh Kumar',
    assignedUnit: 'A-101',
    vehicleNumber: 'MH 01 AB 1234',
    monthlyCharge: 2000,
    status: 'occupied',
  },
  {
    id: 'PS-002',
    slotNumber: 'P-B-08',
    type: 'four_wheeler',
    block: 'Block B',
    floor: 'Basement 1',
    assignedTo: 'Priya Patel',
    assignedUnit: 'B-205',
    vehicleNumber: 'MH 02 CD 5678',
    monthlyCharge: 2000,
    status: 'occupied',
  },
  {
    id: 'PS-003',
    slotNumber: 'P-A-22',
    type: 'four_wheeler',
    block: 'Block A',
    floor: 'Basement 2',
    assignedTo: 'Sneha Reddy',
    assignedUnit: 'A-402',
    vehicleNumber: 'TS 09 EF 9012',
    monthlyCharge: 2000,
    status: 'occupied',
  },
  {
    id: 'PS-004',
    slotNumber: 'P-D-05',
    type: 'four_wheeler',
    block: 'Block D',
    floor: 'Basement 1',
    assignedTo: 'Ankit Jain',
    assignedUnit: 'D-103',
    vehicleNumber: 'MH 04 GH 3456',
    monthlyCharge: 2000,
    status: 'occupied',
  },
  {
    id: 'PS-005',
    slotNumber: 'P-C-12',
    type: 'two_wheeler',
    block: 'Block C',
    floor: 'Ground',
    assignedTo: 'Vikram Sharma',
    assignedUnit: 'C-301',
    vehicleNumber: 'MH 05 IJ 7890',
    monthlyCharge: 500,
    status: 'occupied',
  },
  {
    id: 'PS-006',
    slotNumber: 'P-A-30',
    type: 'four_wheeler',
    block: 'Block A',
    floor: 'Basement 2',
    assignedTo: null,
    assignedUnit: null,
    vehicleNumber: null,
    monthlyCharge: 2000,
    status: 'available',
  },
  {
    id: 'PS-007',
    slotNumber: 'P-B-25',
    type: 'four_wheeler',
    block: 'Block B',
    floor: 'Basement 2',
    assignedTo: null,
    assignedUnit: null,
    vehicleNumber: null,
    monthlyCharge: 2000,
    status: 'available',
  },
  {
    id: 'PS-008',
    slotNumber: 'P-C-18',
    type: 'two_wheeler',
    block: 'Block C',
    floor: 'Ground',
    assignedTo: null,
    assignedUnit: null,
    vehicleNumber: null,
    monthlyCharge: 500,
    status: 'maintenance',
  },
]

export default function ParkingSlotsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [blockFilter, setBlockFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<typeof parkingSlots[0] | null>(null)
  const [viewingSlot, setViewingSlot] = useState<typeof parkingSlots[0] | null>(null)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleAddSlot = () => {
    setIsAddDialogOpen(false)
    showNotification('Parking slot added successfully!')
  }

  const handleAssignSlot = () => {
    setIsAssignDialogOpen(false)
    setSelectedSlot(null)
    showNotification('Slot assigned successfully!')
  }

  const handleExport = () => {
    showNotification('Parking data exported successfully!')
  }

  const handleUnassign = (slot: typeof parkingSlots[0]) => {
    if (confirm(`Unassign slot ${slot.slotNumber} from ${slot.assignedTo}?`)) {
      showNotification(`Slot ${slot.slotNumber} unassigned successfully!`)
    }
  }

  const filteredSlots = parkingSlots.filter((slot) => {
    const matchesSearch =
      slot.slotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (slot.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (slot.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

    const matchesStatus = statusFilter === 'all' || slot.status === statusFilter
    const matchesType = typeFilter === 'all' || slot.type === typeFilter
    const matchesBlock = blockFilter === 'all' || slot.block === blockFilter

    return matchesSearch && matchesStatus && matchesType && matchesBlock
  })

  return (
    <RoleGuard allowedRoles={['admin', 'guard']}>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parking Slot Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage parking slots and assignments
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
                  <Plus className="h-4 w-4" />
                  <span>Add Slot</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Parking Slot</DialogTitle>
                  <DialogDescription>
                    Create a new parking slot in the system
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Slot Number *</Label>
                      <Input placeholder="P-A-30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="two_wheeler">Two Wheeler</SelectItem>
                          <SelectItem value="four_wheeler">Four Wheeler</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                          <SelectItem value="visitor">Visitor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                          <SelectItem value="Ground">Ground</SelectItem>
                          <SelectItem value="Basement 1">Basement 1</SelectItem>
                          <SelectItem value="Basement 2">Basement 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Charge (\u20B9) *</Label>
                    <Input type="number" placeholder="2000" />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddSlot}>
                      Add Slot
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
                      className={`p-3 rounded-xl ${stat.color === 'blue'
                          ? 'bg-blue-100'
                          : stat.color === 'green'
                            ? 'bg-green-100'
                            : stat.color === 'orange'
                              ? 'bg-orange-100'
                              : 'bg-red-100'
                        }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${stat.color === 'blue'
                            ? 'text-blue-600'
                            : stat.color === 'green'
                              ? 'text-green-600'
                              : stat.color === 'orange'
                                ? 'text-orange-600'
                                : 'text-red-600'
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
                placeholder="Search by slot, resident, or vehicle..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="two_wheeler">Two Wheeler</SelectItem>
                <SelectItem value="four_wheeler">Four Wheeler</SelectItem>
              </SelectContent>
            </Select>
            <Select value={blockFilter} onValueChange={setBlockFilter}>
              <SelectTrigger className="w-32">
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
          </div>
        </Card>

        {/* Slots Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slot ID</TableHead>
                  <TableHead>Slot Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Monthly Charge</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">{slot.id}</TableCell>
                    <TableCell className="font-semibold">{slot.slotNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {slot.type === 'four_wheeler' ? (
                          <Car className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Bike className="h-4 w-4 text-green-500" />
                        )}
                        <span className="capitalize">{slot.type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span>{slot.block}, {slot.floor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {slot.assignedTo ? (
                        <div>
                          <p className="font-medium">{slot.assignedTo}</p>
                          <p className="text-xs text-gray-500">{slot.assignedUnit}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {slot.vehicleNumber || '-'}
                    </TableCell>
                    <TableCell className="font-semibold">
                      \u20B9{slot.monthlyCharge.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          slot.status === 'occupied'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : slot.status === 'available'
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                              : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {slot.status === 'occupied' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {slot.status === 'available' && <Clock className="h-3 w-3 mr-1" />}
                        {slot.status === 'maintenance' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" title="View Details" onClick={() => setViewingSlot(slot)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {slot.status === 'available' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Assign Slot"
                            onClick={() => {
                              setSelectedSlot(slot)
                              setIsAssignDialogOpen(true)
                            }}
                          >
                            <User className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                        {slot.status === 'occupied' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Unassign"
                            onClick={() => handleUnassign(slot)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Assign Slot Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Assign Parking Slot</DialogTitle>
              <DialogDescription>
                Assign slot {selectedSlot?.slotNumber} to a resident
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Resident *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resident" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resident1">Rajesh Kumar (A-101)</SelectItem>
                    <SelectItem value="resident2">Priya Patel (B-205)</SelectItem>
                    <SelectItem value="resident3">Sneha Reddy (A-402)</SelectItem>
                    <SelectItem value="resident4">Ankit Jain (D-103)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vehicle Number *</Label>
                <Input placeholder="MH 01 AB 1234" />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAssignSlot}>
                  Assign Slot
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Slot Dialog */}
        <Dialog open={viewingSlot !== null} onOpenChange={() => setViewingSlot(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Slot Details</DialogTitle>
              <DialogDescription>Parking slot information</DialogDescription>
            </DialogHeader>
            {viewingSlot && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Slot ID</Label>
                    <p className="font-medium">{viewingSlot.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Slot Number</Label>
                    <p className="font-medium">{viewingSlot.slotNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Type</Label>
                    <p className="font-medium capitalize">{viewingSlot.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    <Badge className={viewingSlot.status === 'occupied' ? 'bg-green-100 text-green-700' : viewingSlot.status === 'available' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}>
                      {viewingSlot.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Block</Label>
                    <p className="font-medium">{viewingSlot.block}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Floor</Label>
                    <p className="font-medium">{viewingSlot.floor}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Monthly Charge</Label>
                    <p className="font-medium text-green-600">\u20B9{viewingSlot.monthlyCharge.toLocaleString()}</p>
                  </div>
                  {viewingSlot.assignedTo && (
                    <>
                      <div>
                        <Label className="text-muted-foreground text-xs">Assigned To</Label>
                        <p className="font-medium">{viewingSlot.assignedTo}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs">Unit</Label>
                        <p className="font-medium">{viewingSlot.assignedUnit}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs">Vehicle Number</Label>
                        <p className="font-medium">{viewingSlot.vehicleNumber}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setViewingSlot(null)}>Close</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RoleGuard>
  )
}
