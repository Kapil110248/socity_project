'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Truck,
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
    title: 'Total Parcels',
    value: '856',
    change: '+45',
    icon: Package,
    color: 'blue',
  },
  {
    title: 'Pending Pickup',
    value: '124',
    change: '+12',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Delivered',
    value: '705',
    change: '+32',
    icon: CheckCircle,
    color: 'green',
  },
  {
    title: 'Overdue',
    value: '27',
    change: '+3',
    icon: AlertCircle,
    color: 'red',
  },
]

const parcels = [
  {
    id: 'PCL-001',
    trackingNumber: 'AMZ123456789',
    unit: 'A-101',
    resident: 'Rajesh Kumar',
    courier: 'Amazon',
    receivedDate: '2025-01-02',
    receivedTime: '10:30 AM',
    status: 'collected',
    collectedDate: '2025-01-02',
    collectedTime: '06:45 PM',
    description: 'Large box',
  },
  {
    id: 'PCL-002',
    trackingNumber: 'FLIP987654321',
    unit: 'B-205',
    resident: 'Priya Sharma',
    courier: 'Flipkart',
    receivedDate: '2025-01-03',
    receivedTime: '02:15 PM',
    status: 'pending',
    collectedDate: null,
    collectedTime: null,
    description: 'Medium package',
  },
  {
    id: 'PCL-003',
    trackingNumber: 'DTDC456789123',
    unit: 'C-304',
    resident: 'Amit Patel',
    courier: 'DTDC',
    receivedDate: '2025-01-03',
    receivedTime: '11:00 AM',
    status: 'pending',
    collectedDate: null,
    collectedTime: null,
    description: 'Small envelope',
  },
  {
    id: 'PCL-004',
    trackingNumber: 'BDT741852963',
    unit: 'A-502',
    resident: 'Neha Gupta',
    courier: 'BlueDart',
    receivedDate: '2024-12-28',
    receivedTime: '09:00 AM',
    status: 'overdue',
    collectedDate: null,
    collectedTime: null,
    description: 'Large package',
  },
  {
    id: 'PCL-005',
    trackingNumber: 'FED159753468',
    unit: 'D-108',
    resident: 'Vikram Singh',
    courier: 'FedEx',
    receivedDate: '2025-01-04',
    receivedTime: '03:30 PM',
    status: 'collected',
    collectedDate: '2025-01-04',
    collectedTime: '07:00 PM',
    description: 'Medium box',
  },
]

export default function ParcelsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredParcels = parcels.filter((parcel) => {
    const matchesSearch =
      parcel.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.courier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <RoleGuard allowedRoles={['admin', 'guard']}>

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parcel Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all parcel deliveries
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Parcel</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register New Parcel</DialogTitle>
                <DialogDescription>
                  Add a parcel received at the gate
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tracking Number</Label>
                    <Input placeholder="AMZ123456789" />
                  </div>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Courier Service</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select courier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="flipkart">Flipkart</SelectItem>
                        <SelectItem value="bluedart">BlueDart</SelectItem>
                        <SelectItem value="dtdc">DTDC</SelectItem>
                        <SelectItem value="fedex">FedEx</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Received Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Package size and type" />
                </div>
                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Input placeholder="Optional notes" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Parcel
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
                    <p className={`text-sm mt-1 ${stat.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === 'blue'
                          ? 'text-blue-600'
                          : stat.color === 'orange'
                          ? 'text-orange-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
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
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by tracking number, unit, or courier..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Parcels Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcel ID</TableHead>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Resident</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParcels.map((parcel) => (
              <TableRow key={parcel.id}>
                <TableCell className="font-medium">{parcel.id}</TableCell>
                <TableCell className="font-mono text-sm">{parcel.trackingNumber}</TableCell>
                <TableCell>{parcel.unit}</TableCell>
                <TableCell>{parcel.resident}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span>{parcel.courier}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{parcel.receivedDate}</div>
                    <div className="text-gray-500">{parcel.receivedTime}</div>
                  </div>
                </TableCell>
                <TableCell>{parcel.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      parcel.status === 'collected'
                        ? 'default'
                        : parcel.status === 'overdue'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                      parcel.status === 'collected'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : parcel.status === 'overdue'
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {parcel.status === 'collected' && (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {parcel.status === 'overdue' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {parcel.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {parcel.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Details"
                      onClick={() => alert(`Parcel Details:\n\nID: ${parcel.id}\nTracking: ${parcel.trackingNumber}\nUnit: ${parcel.unit}\nResident: ${parcel.resident}\nCourier: ${parcel.courier}\nReceived: ${parcel.receivedDate} ${parcel.receivedTime}\nDescription: ${parcel.description}\nStatus: ${parcel.status}${parcel.collectedDate ? `\nCollected: ${parcel.collectedDate} ${parcel.collectedTime}` : ''}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {parcel.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => alert(`Parcel ${parcel.id} marked as collected!\n\nResident ${parcel.resident} from ${parcel.unit} will be notified.`)}
                      >
                        Mark Collected
                      </Button>
                    )}
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
