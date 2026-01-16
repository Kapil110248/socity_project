'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Star,
  X,
  User,
  Upload,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const initialGuards = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    photo: null,
    phone: '+91 98765 43210',
    email: 'ramesh@security.com',
    shift: 'Morning (6 AM - 2 PM)',
    gate: 'Main Gate',
    status: 'on-duty',
    joinDate: '2023-01-15',
    rating: 4.5,
    todayStatus: 'present',
    checkIn: '5:55 AM',
    address: 'Delhi, India',
    emergencyContact: '+91 98765 00000',
    idProof: 'Aadhar Card',
    idNumber: 'XXXX-XXXX-1234',
  },
  {
    id: 2,
    name: 'Suresh Singh',
    photo: null,
    phone: '+91 98765 43211',
    email: 'suresh@security.com',
    shift: 'Afternoon (2 PM - 10 PM)',
    gate: 'Main Gate',
    status: 'off-duty',
    joinDate: '2023-03-20',
    rating: 4.2,
    todayStatus: 'upcoming',
    checkIn: '-',
    address: 'Noida, India',
    emergencyContact: '+91 98765 00001',
    idProof: 'Aadhar Card',
    idNumber: 'XXXX-XXXX-2345',
  },
  {
    id: 3,
    name: 'Mohan Lal',
    photo: null,
    phone: '+91 98765 43212',
    email: 'mohan@security.com',
    shift: 'Night (10 PM - 6 AM)',
    gate: 'Back Gate',
    status: 'off-duty',
    joinDate: '2022-11-10',
    rating: 4.8,
    todayStatus: 'completed',
    checkIn: '10:00 PM',
    address: 'Gurgaon, India',
    emergencyContact: '+91 98765 00002',
    idProof: 'PAN Card',
    idNumber: 'XXXXX1234X',
  },
  {
    id: 4,
    name: 'Vijay Sharma',
    photo: null,
    phone: '+91 98765 43213',
    email: 'vijay@security.com',
    shift: 'Morning (6 AM - 2 PM)',
    gate: 'Parking Gate',
    status: 'on-duty',
    joinDate: '2023-06-01',
    rating: 4.0,
    todayStatus: 'present',
    checkIn: '5:50 AM',
    address: 'Faridabad, India',
    emergencyContact: '+91 98765 00003',
    idProof: 'Aadhar Card',
    idNumber: 'XXXX-XXXX-3456',
  },
  {
    id: 5,
    name: 'Anil Verma',
    photo: null,
    phone: '+91 98765 43214',
    email: 'anil@security.com',
    shift: 'Afternoon (2 PM - 10 PM)',
    gate: 'Back Gate',
    status: 'leave',
    joinDate: '2023-02-28',
    rating: 3.8,
    todayStatus: 'absent',
    checkIn: '-',
    address: 'Delhi, India',
    emergencyContact: '+91 98765 00004',
    idProof: 'Voter ID',
    idNumber: 'DL/XX/XXX/XXXXX',
  },
]

interface Guard {
  id: number
  name: string
  photo: string | null
  phone: string
  email: string
  shift: string
  gate: string
  status: string
  joinDate: string
  rating: number
  todayStatus: string
  checkIn: string
  address?: string
  emergencyContact?: string
  idProof?: string
  idNumber?: string
}

const emptyGuardForm = {
  name: '',
  phone: '',
  email: '',
  shift: '',
  gate: '',
  address: '',
  emergencyContact: '',
  idProof: '',
  idNumber: '',
}

const stats = [
  { label: 'Total Guards', value: '12', color: 'bg-blue-500' },
  { label: 'On Duty Now', value: '4', color: 'bg-green-500' },
  { label: 'On Leave', value: '2', color: 'bg-yellow-500' },
  { label: 'Vacant Positions', value: '1', color: 'bg-red-500' },
]

export default function GuardsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [guards, setGuards] = useState<Guard[]>(initialGuards)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null)
  const [formData, setFormData] = useState(emptyGuardForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddGuard = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newGuard: Guard = {
        id: guards.length + 1,
        name: formData.name,
        photo: null,
        phone: formData.phone,
        email: formData.email,
        shift: formData.shift,
        gate: formData.gate,
        status: 'off-duty',
        joinDate: new Date().toISOString().split('T')[0],
        rating: 0,
        todayStatus: 'upcoming',
        checkIn: '-',
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        idProof: formData.idProof,
        idNumber: formData.idNumber,
      }

      setGuards([...guards, newGuard])
      setFormData(emptyGuardForm)
      setIsAddDialogOpen(false)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleEditGuard = () => {
    if (!selectedGuard) return
    setIsSubmitting(true)

    setTimeout(() => {
      setGuards(guards.map(g =>
        g.id === selectedGuard.id
          ? { ...g, ...formData }
          : g
      ))
      setFormData(emptyGuardForm)
      setSelectedGuard(null)
      setIsEditDialogOpen(false)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleDeleteGuard = () => {
    if (!selectedGuard) return
    setIsSubmitting(true)

    setTimeout(() => {
      setGuards(guards.filter(g => g.id !== selectedGuard.id))
      setSelectedGuard(null)
      setIsDeleteDialogOpen(false)
      setIsSubmitting(false)
    }, 500)
  }

  const openEditDialog = (guard: Guard) => {
    setSelectedGuard(guard)
    setFormData({
      name: guard.name,
      phone: guard.phone,
      email: guard.email,
      shift: guard.shift,
      gate: guard.gate,
      address: guard.address || '',
      emergencyContact: guard.emergencyContact || '',
      idProof: guard.idProof || '',
      idNumber: guard.idNumber || '',
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (guard: Guard) => {
    setSelectedGuard(guard)
    setIsViewDialogOpen(true)
  }

  const openDeleteDialog = (guard: Guard) => {
    setSelectedGuard(guard)
    setIsDeleteDialogOpen(true)
  }

  const filteredGuards = guards.filter(guard =>
    guard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guard.phone.includes(searchQuery) ||
    guard.gate.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            Security Guards Management
          </h1>
          <p className="text-gray-600 mt-1">Manage security personnel and their schedules</p>
        </div>
        <Button className="mt-4 md:mt-0 gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add New Guard
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                <Shield className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search guards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="on-duty">On Duty</SelectItem>
              <SelectItem value="off-duty">Off Duty</SelectItem>
              <SelectItem value="leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Gate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gates</SelectItem>
              <SelectItem value="main">Main Gate</SelectItem>
              <SelectItem value="back">Back Gate</SelectItem>
              <SelectItem value="parking">Parking Gate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Guards Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guard</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Shift & Gate</TableHead>
              <TableHead>Today's Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuards.map((guard) => (
              <TableRow key={guard.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {guard.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{guard.name}</p>
                      <p className="text-xs text-gray-500">Since {new Date(guard.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {guard.phone}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {guard.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{guard.shift}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {guard.gate}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {guard.todayStatus === 'present' && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" /> Present
                      </Badge>
                    )}
                    {guard.todayStatus === 'absent' && (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" /> Absent
                      </Badge>
                    )}
                    {guard.todayStatus === 'upcoming' && (
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" /> Upcoming
                      </Badge>
                    )}
                    {guard.todayStatus === 'completed' && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <UserCheck className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    )}
                  </div>
                  {guard.checkIn !== '-' && (
                    <p className="text-xs text-gray-500 mt-1">Check-in: {guard.checkIn}</p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{guard.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {guard.status === 'on-duty' && (
                    <Badge className="bg-green-600">On Duty</Badge>
                  )}
                  {guard.status === 'off-duty' && (
                    <Badge variant="secondary">Off Duty</Badge>
                  )}
                  {guard.status === 'leave' && (
                    <Badge className="bg-yellow-500">On Leave</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openViewDialog(guard)}>
                        <Eye className="h-4 w-4 mr-2" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(guard)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" /> View Schedule
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" /> Attendance History
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(guard)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Guard Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Add New Security Guard
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new security guard to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Photo Upload */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" /> Upload Photo
              </Button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>
            </div>

            {/* Work Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shift">Shift *</Label>
                <Select
                  value={formData.shift}
                  onValueChange={(value) => setFormData({ ...formData, shift: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (6 AM - 2 PM)">Morning (6 AM - 2 PM)</SelectItem>
                    <SelectItem value="Afternoon (2 PM - 10 PM)">Afternoon (2 PM - 10 PM)</SelectItem>
                    <SelectItem value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gate">Assigned Gate *</Label>
                <Select
                  value={formData.gate}
                  onValueChange={(value) => setFormData({ ...formData, gate: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Gate">Main Gate</SelectItem>
                    <SelectItem value="Back Gate">Back Gate</SelectItem>
                    <SelectItem value="Parking Gate">Parking Gate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
              />
            </div>

            {/* ID Proof */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idProof">ID Proof Type</Label>
                <Select
                  value={formData.idProof}
                  onValueChange={(value) => setFormData({ ...formData, idProof: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID Proof" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                    <SelectItem value="PAN Card">PAN Card</SelectItem>
                    <SelectItem value="Voter ID">Voter ID</SelectItem>
                    <SelectItem value="Driving License">Driving License</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  placeholder="Enter ID number"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddGuard}
              disabled={!formData.name || !formData.phone || !formData.shift || !formData.gate || isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Guard'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Guard Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Guard Profile
            </DialogTitle>
          </DialogHeader>

          {selectedGuard && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {selectedGuard.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedGuard.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    <span>{selectedGuard.rating} Rating</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{selectedGuard.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{selectedGuard.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Shift</p>
                  <p className="font-medium">{selectedGuard.shift}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gate</p>
                  <p className="font-medium">{selectedGuard.gate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Join Date</p>
                  <p className="font-medium">{new Date(selectedGuard.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <Badge className={
                    selectedGuard.status === 'on-duty' ? 'bg-green-600' :
                    selectedGuard.status === 'leave' ? 'bg-yellow-500' : ''
                  }>
                    {selectedGuard.status === 'on-duty' ? 'On Duty' :
                     selectedGuard.status === 'leave' ? 'On Leave' : 'Off Duty'}
                  </Badge>
                </div>
                {selectedGuard.address && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">{selectedGuard.address}</p>
                  </div>
                )}
                {selectedGuard.idProof && (
                  <>
                    <div>
                      <p className="text-gray-500">ID Proof</p>
                      <p className="font-medium">{selectedGuard.idProof}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ID Number</p>
                      <p className="font-medium">{selectedGuard.idNumber}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false)
              if (selectedGuard) openEditDialog(selectedGuard)
            }}>
              Edit Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Guard Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Edit Guard Details
            </DialogTitle>
            <DialogDescription>
              Update the security guard's information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-emergency">Emergency Contact</Label>
                <Input
                  id="edit-emergency"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-shift">Shift *</Label>
                <Select
                  value={formData.shift}
                  onValueChange={(value) => setFormData({ ...formData, shift: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (6 AM - 2 PM)">Morning (6 AM - 2 PM)</SelectItem>
                    <SelectItem value="Afternoon (2 PM - 10 PM)">Afternoon (2 PM - 10 PM)</SelectItem>
                    <SelectItem value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gate">Assigned Gate *</Label>
                <Select
                  value={formData.gate}
                  onValueChange={(value) => setFormData({ ...formData, gate: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Gate">Main Gate</SelectItem>
                    <SelectItem value="Back Gate">Back Gate</SelectItem>
                    <SelectItem value="Parking Gate">Parking Gate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Textarea
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-idProof">ID Proof Type</Label>
                <Select
                  value={formData.idProof}
                  onValueChange={(value) => setFormData({ ...formData, idProof: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID Proof" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                    <SelectItem value="PAN Card">PAN Card</SelectItem>
                    <SelectItem value="Voter ID">Voter ID</SelectItem>
                    <SelectItem value="Driving License">Driving License</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-idNumber">ID Number</Label>
                <Input
                  id="edit-idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditGuard}
              disabled={!formData.name || !formData.phone || !formData.shift || !formData.gate || isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Remove Guard
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this guard? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedGuard && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {selectedGuard.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedGuard.name}</p>
                <p className="text-sm text-gray-500">{selectedGuard.shift} - {selectedGuard.gate}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteGuard}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Removing...' : 'Remove Guard'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
