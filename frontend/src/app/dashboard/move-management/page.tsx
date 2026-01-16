'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Truck,
  Plus,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  Home,
  User,
  Phone,
  FileText,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Edit,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const moveRequests = [
  {
    id: 'MR-2025-001',
    type: 'move-in',
    unit: 'A-501',
    residentName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@email.com',
    scheduledDate: '2025-12-22',
    timeSlot: '10:00 AM - 2:00 PM',
    status: 'approved',
    vehicleType: 'Truck',
    vehicleNumber: 'MH 01 AB 1234',
    nocStatus: 'obtained',
    depositStatus: 'paid',
    depositAmount: 5000,
    checklistItems: [
      { item: 'NOC from previous society', completed: true },
      { item: 'ID proof verification', completed: true },
      { item: 'Move-in deposit paid', completed: true },
      { item: 'Parking slot allocated', completed: true },
      { item: 'Key handover', completed: false },
    ],
    notes: 'Family of 4, 2 vehicles to be registered',
  },
  {
    id: 'MR-2025-002',
    type: 'move-out',
    unit: 'B-203',
    residentName: 'Priya Patel',
    phone: '+91 98765 11111',
    email: 'priya.patel@email.com',
    scheduledDate: '2025-12-20',
    timeSlot: '2:00 PM - 6:00 PM',
    status: 'pending',
    vehicleType: 'Mini Truck',
    vehicleNumber: 'MH 02 CD 5678',
    nocStatus: 'pending',
    depositStatus: 'refund_pending',
    depositAmount: 5000,
    checklistItems: [
      { item: 'No dues clearance', completed: true },
      { item: 'Maintenance paid till date', completed: true },
      { item: 'Key return', completed: false },
      { item: 'Meter reading taken', completed: false },
      { item: 'Deposit refund initiated', completed: false },
    ],
    notes: 'Relocating to Bangalore, requested NOC urgently',
  },
  {
    id: 'MR-2025-003',
    type: 'move-in',
    unit: 'C-102',
    residentName: 'Amit Singh',
    phone: '+91 98765 22222',
    email: 'amit.singh@email.com',
    scheduledDate: '2025-12-25',
    timeSlot: '8:00 AM - 12:00 PM',
    status: 'scheduled',
    vehicleType: 'Large Truck',
    vehicleNumber: 'MH 04 EF 9012',
    nocStatus: 'obtained',
    depositStatus: 'paid',
    depositAmount: 5000,
    checklistItems: [
      { item: 'NOC from previous society', completed: true },
      { item: 'ID proof verification', completed: true },
      { item: 'Move-in deposit paid', completed: true },
      { item: 'Parking slot allocated', completed: false },
      { item: 'Key handover', completed: false },
    ],
    notes: 'Has 3 vehicles - need to allocate parking',
  },
  {
    id: 'MR-2025-004',
    type: 'move-out',
    unit: 'D-405',
    residentName: 'Sneha Kapoor',
    phone: '+91 98765 33333',
    email: 'sneha.kapoor@email.com',
    scheduledDate: '2025-12-18',
    timeSlot: '10:00 AM - 2:00 PM',
    status: 'completed',
    vehicleType: 'Truck',
    vehicleNumber: 'MH 03 GH 3456',
    nocStatus: 'issued',
    depositStatus: 'refunded',
    depositAmount: 5000,
    checklistItems: [
      { item: 'No dues clearance', completed: true },
      { item: 'Maintenance paid till date', completed: true },
      { item: 'Key return', completed: true },
      { item: 'Meter reading taken', completed: true },
      { item: 'Deposit refund initiated', completed: true },
    ],
    notes: 'All formalities completed smoothly',
  },
]

export default function MoveManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<typeof moveRequests[0] | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800"><Calendar className="h-3 w-3 mr-1" /> Scheduled</Badge>
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    return type === 'move-in' ? (
      <Badge className="bg-green-100 text-green-800">
        <ArrowRight className="h-3 w-3 mr-1" /> Move In
      </Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800">
        <ArrowLeft className="h-3 w-3 mr-1" /> Move Out
      </Badge>
    )
  }

  const stats = [
    { label: 'Total Requests', value: moveRequests.length, icon: Truck, color: 'bg-blue-500' },
    { label: 'Move-ins', value: moveRequests.filter(m => m.type === 'move-in').length, icon: ArrowRight, color: 'bg-green-500' },
    { label: 'Move-outs', value: moveRequests.filter(m => m.type === 'move-out').length, icon: ArrowLeft, color: 'bg-orange-500' },
    { label: 'Pending Approval', value: moveRequests.filter(m => m.status === 'pending').length, icon: Clock, color: 'bg-yellow-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="h-8 w-8 text-orange-600" />
            Move-in/out Management
          </h1>
          <p className="text-gray-600 mt-1">Manage resident move-in and move-out requests</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>
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
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="move-in">Move-in</TabsTrigger>
          <TabsTrigger value="move-out">Move-out</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="current">
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">This Month</SelectItem>
                  <SelectItem value="next">Next Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Requests Table */}
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Request ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Resident</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moveRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono font-medium">{request.id}</TableCell>
                    <TableCell>{getTypeBadge(request.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Home className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{request.unit}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.residentName}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {request.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {new Date(request.scheduledDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </div>
                      <p className="text-xs text-gray-500">{request.timeSlot}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center justify-between">
                              <span>{request.type === 'move-in' ? 'Move-in' : 'Move-out'} Request - {request.id}</span>
                              {getStatusBadge(request.status)}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {/* Resident Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <User className="h-4 w-4" /> Resident Details
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Name:</span>
                                  <p className="font-medium">{request.residentName}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Unit:</span>
                                  <p className="font-medium">{request.unit}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Phone:</span>
                                  <p>{request.phone}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Email:</span>
                                  <p>{request.email}</p>
                                </div>
                              </div>
                            </div>

                            {/* Schedule Info */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Scheduled Date:</span>
                                <p className="font-medium">{new Date(request.scheduledDate).toLocaleDateString('en-IN')}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Time Slot:</span>
                                <p className="font-medium">{request.timeSlot}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Vehicle:</span>
                                <p className="font-medium">{request.vehicleType}</p>
                                <p className="text-xs text-gray-500">{request.vehicleNumber}</p>
                              </div>
                            </div>

                            {/* Status Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-sm text-gray-600">NOC Status:</span>
                                <p className="font-medium capitalize">{request.nocStatus.replace('_', ' ')}</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-sm text-gray-600">Deposit ({request.type === 'move-in' ? 'Payment' : 'Refund'}):</span>
                                <p className="font-medium capitalize">₹{request.depositAmount} - {request.depositStatus.replace('_', ' ')}</p>
                              </div>
                            </div>

                            {/* Checklist */}
                            <div>
                              <h4 className="font-semibold mb-2">Checklist</h4>
                              <div className="space-y-2">
                                {request.checklistItems.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    {item.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                                    )}
                                    <span className={item.completed ? 'text-gray-600' : ''}>{item.item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notes */}
                            {request.notes && (
                              <div>
                                <h4 className="font-semibold mb-2">Notes</h4>
                                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">{request.notes}</p>
                              </div>
                            )}

                            {/* Actions */}
                            {request.status === 'pending' && (
                              <div className="flex gap-2 pt-4">
                                <Button className="flex-1">Approve</Button>
                                <Button variant="destructive" className="flex-1">Reject</Button>
                              </div>
                            )}
                            {request.status === 'approved' && request.type === 'move-out' && request.nocStatus === 'pending' && (
                              <Button className="w-full gap-2">
                                <FileText className="h-4 w-4" /> Issue NOC
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="move-in">
          <Card className="p-8 text-center">
            <ArrowRight className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Move-in Requests</h3>
            <p className="text-gray-600">Filtered view showing only move-in requests</p>
          </Card>
        </TabsContent>

        <TabsContent value="move-out">
          <Card className="p-8 text-center">
            <ArrowLeft className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Move-out Requests</h3>
            <p className="text-gray-600">Filtered view showing only move-out requests</p>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="p-8 text-center">
            <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Pending Approvals</h3>
            <p className="text-gray-600">Requests awaiting approval</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
