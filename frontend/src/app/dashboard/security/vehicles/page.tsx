'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Car,
  Bike,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
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
    title: 'Total Vehicles',
    value: '482',
    change: '+12',
    icon: Car,
    color: 'blue',
  },
  {
    title: 'Cars',
    value: '298',
    change: '+8',
    icon: Car,
    color: 'green',
  },
  {
    title: 'Two Wheelers',
    value: '174',
    change: '+4',
    icon: Bike,
    color: 'purple',
  },
  {
    title: 'Verified',
    value: '456',
    change: '+15',
    icon: CheckCircle,
    color: 'orange',
  },
]

const vehicles = [
  {
    id: 'VEH-001',
    vehicleNumber: 'DL-01-AB-1234',
    type: 'Car',
    make: 'Honda City',
    color: 'Silver',
    unit: 'A-101',
    owner: 'Rajesh Kumar',
    parkingSlot: 'P-A-12',
    status: 'verified',
    registeredDate: '2024-01-15',
  },
  {
    id: 'VEH-002',
    vehicleNumber: 'DL-02-CD-5678',
    type: 'Car',
    make: 'Maruti Swift',
    color: 'Red',
    unit: 'B-205',
    owner: 'Priya Sharma',
    parkingSlot: 'P-B-25',
    status: 'verified',
    registeredDate: '2024-02-20',
  },
  {
    id: 'VEH-003',
    vehicleNumber: 'DL-03-EF-9012',
    type: 'Two Wheeler',
    make: 'Honda Activa',
    color: 'Black',
    unit: 'C-304',
    owner: 'Amit Patel',
    parkingSlot: 'P-C-45',
    status: 'verified',
    registeredDate: '2024-03-10',
  },
  {
    id: 'VEH-004',
    vehicleNumber: 'DL-04-GH-3456',
    type: 'Car',
    make: 'Hyundai Creta',
    color: 'White',
    unit: 'A-502',
    owner: 'Neha Gupta',
    parkingSlot: 'P-A-50',
    status: 'pending',
    registeredDate: '2024-12-28',
  },
  {
    id: 'VEH-005',
    vehicleNumber: 'DL-05-IJ-7890',
    type: 'Two Wheeler',
    make: 'Royal Enfield',
    color: 'Blue',
    unit: 'D-108',
    owner: 'Vikram Singh',
    parkingSlot: 'P-D-18',
    status: 'verified',
    registeredDate: '2024-04-05',
  },
]

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || vehicle.type === typeFilter
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <RoleGuard allowedRoles={['admin', 'guard']}>

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all registered vehicles
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Register Vehicle</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register New Vehicle</DialogTitle>
                <DialogDescription>
                  Add a new vehicle to the society registry
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Number</Label>
                    <Input placeholder="DL-01-AB-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Make & Model</Label>
                    <Input placeholder="Honda City" />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <Input placeholder="Silver" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Unit Number</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a-101">A-101</SelectItem>
                        <SelectItem value="a-102">A-102</SelectItem>
                        <SelectItem value="b-201">B-201</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Parking Slot</Label>
                    <Input placeholder="P-A-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input placeholder="Resident name" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsRegisterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Register Vehicle
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
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'purple'
                        ? 'bg-purple-100'
                        : 'bg-orange-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === 'blue'
                          ? 'text-blue-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-orange-600'
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
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by vehicle number, owner, or unit..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Car">Car</SelectItem>
              <SelectItem value="Two Wheeler">Two Wheeler</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Make/Model</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Parking Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.id}</TableCell>
                <TableCell className="font-semibold">{vehicle.vehicleNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {vehicle.type === 'Car' && <Car className="h-4 w-4 text-blue-600" />}
                    {vehicle.type === 'Two Wheeler' && (
                      <Bike className="h-4 w-4 text-purple-600" />
                    )}
                    {vehicle.type === 'Truck' && <Truck className="h-4 w-4 text-orange-600" />}
                    <span>{vehicle.type}</span>
                  </div>
                </TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.unit}</TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>
                  <Badge variant="outline">{vehicle.parkingSlot}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={vehicle.status === 'verified' ? 'default' : 'secondary'}
                    className={
                      vehicle.status === 'verified'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {vehicle.status === 'verified' && (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {vehicle.status === 'pending' && <XCircle className="h-3 w-3 mr-1" />}
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Details"
                      onClick={() => alert(`Vehicle Details:\n\nID: ${vehicle.id}\nNumber: ${vehicle.vehicleNumber}\nType: ${vehicle.type}\nMake: ${vehicle.make}\nColor: ${vehicle.color}\nOwner: ${vehicle.owner}\nUnit: ${vehicle.unit}\nParking: ${vehicle.parkingSlot}\nStatus: ${vehicle.status}\nRegistered: ${vehicle.registeredDate}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
    </RoleGuard>
  )
}
