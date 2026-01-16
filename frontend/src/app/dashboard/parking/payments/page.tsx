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
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  CheckCircle2,
  Send,
  IndianRupee,
  Calendar,
  Receipt,
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
    title: 'Total Collection',
    value: '\u20B91.2L',
    change: 'This month',
    icon: IndianRupee,
    color: 'green',
  },
  {
    title: 'Pending Payments',
    value: '18',
    change: '\u20B936,000 due',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Total Slots',
    value: '156',
    change: '142 occupied',
    icon: Car,
    color: 'blue',
  },
  {
    title: 'Overdue',
    value: '5',
    change: '\u20B910,000',
    icon: AlertCircle,
    color: 'red',
  },
]

const parkingPayments = [
  {
    id: 'PP-001',
    slotNumber: 'P-A-15',
    type: 'four_wheeler',
    residentName: 'Rajesh Kumar',
    unit: 'A-101',
    vehicleNumber: 'MH 01 AB 1234',
    month: 'December',
    year: 2024,
    amount: 2000,
    dueDate: '2024-12-05',
    paymentDate: '2024-12-03',
    status: 'paid',
    paymentMethod: 'upi',
  },
  {
    id: 'PP-002',
    slotNumber: 'P-B-08',
    type: 'four_wheeler',
    residentName: 'Priya Patel',
    unit: 'B-205',
    vehicleNumber: 'MH 02 CD 5678',
    month: 'December',
    year: 2024,
    amount: 2000,
    dueDate: '2024-12-05',
    paymentDate: null,
    status: 'pending',
    paymentMethod: null,
  },
  {
    id: 'PP-003',
    slotNumber: 'P-A-22',
    type: 'four_wheeler',
    residentName: 'Sneha Reddy',
    unit: 'A-402',
    vehicleNumber: 'TS 09 EF 9012',
    month: 'December',
    year: 2024,
    amount: 2000,
    dueDate: '2024-12-05',
    paymentDate: '2024-12-01',
    status: 'paid',
    paymentMethod: 'online',
  },
  {
    id: 'PP-004',
    slotNumber: 'P-D-05',
    type: 'four_wheeler',
    residentName: 'Ankit Jain',
    unit: 'D-103',
    vehicleNumber: 'MH 04 GH 3456',
    month: 'December',
    year: 2024,
    amount: 2000,
    dueDate: '2024-12-05',
    paymentDate: null,
    status: 'overdue',
    paymentMethod: null,
  },
  {
    id: 'PP-005',
    slotNumber: 'P-C-12',
    type: 'two_wheeler',
    residentName: 'Vikram Sharma',
    unit: 'C-301',
    vehicleNumber: 'MH 05 IJ 7890',
    month: 'December',
    year: 2024,
    amount: 500,
    dueDate: '2024-12-05',
    paymentDate: '2024-12-04',
    status: 'paid',
    paymentMethod: 'cash',
  },
  {
    id: 'PP-006',
    slotNumber: 'P-B-20',
    type: 'four_wheeler',
    residentName: 'Meera Nair',
    unit: 'B-404',
    vehicleNumber: 'KA 01 KL 2345',
    month: 'December',
    year: 2024,
    amount: 2000,
    dueDate: '2024-12-05',
    paymentDate: null,
    status: 'pending',
    paymentMethod: null,
  },
]

export default function ParkingPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<typeof parkingPayments[0] | null>(null)
  const [viewingPayment, setViewingPayment] = useState<typeof parkingPayments[0] | null>(null)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleRecordPayment = () => {
    setIsRecordPaymentOpen(false)
    setSelectedPayment(null)
    showNotification('Payment recorded successfully!')
  }

  const handleExport = () => {
    showNotification('Payment data exported successfully!')
  }

  const handleSendReminder = (payment: typeof parkingPayments[0]) => {
    showNotification(`Payment reminder sent to ${payment.residentName}`)
  }

  const filteredPayments = parkingPayments.filter((payment) => {
    const matchesSearch =
      payment.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.slotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesType = typeFilter === 'all' || payment.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const totalCollected = parkingPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = parkingPayments
    .filter(p => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0)

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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parking Payments</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Track and manage parking fee collections
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="gap-2 text-sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white gap-2 text-sm">
                  <Plus className="h-4 w-4" />
                  <span>Record Payment</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Record Parking Payment</DialogTitle>
                  <DialogDescription>
                    Record a new parking fee payment
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Slot Number</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="P-A-15">P-A-15</SelectItem>
                          <SelectItem value="P-B-08">P-B-08</SelectItem>
                          <SelectItem value="P-A-22">P-A-22</SelectItem>
                          <SelectItem value="P-D-05">P-D-05</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Month</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="december">December 2024</SelectItem>
                          <SelectItem value="january">January 2025</SelectItem>
                          <SelectItem value="february">February 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Amount (\u20B9)</Label>
                      <Input type="number" placeholder="2000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="online">Online Transfer</SelectItem>
                        <SelectItem value="cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction ID (Optional)</Label>
                    <Input placeholder="Enter transaction ID" />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsRecordPaymentOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleRecordPayment}>
                      Record Payment
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
                        stat.color === 'green'
                          ? 'bg-green-100'
                          : stat.color === 'orange'
                          ? 'bg-orange-100'
                          : stat.color === 'blue'
                          ? 'bg-blue-100'
                          : 'bg-red-100'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          stat.color === 'green'
                            ? 'text-green-600'
                            : stat.color === 'orange'
                            ? 'text-orange-600'
                            : stat.color === 'blue'
                            ? 'text-blue-600'
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Collected (This Month)</p>
                <h3 className="text-3xl font-bold text-green-800 mt-1">
                  \u20B9{totalCollected.toLocaleString()}
                </h3>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Total Pending</p>
                <h3 className="text-3xl font-bold text-orange-800 mt-1">
                  \u20B9{totalPending.toLocaleString()}
                </h3>
              </div>
              <div className="p-4 bg-orange-100 rounded-full">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, slot, unit, or vehicle..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="two_wheeler">Two Wheeler</SelectItem>
                <SelectItem value="four_wheeler">Four Wheeler</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </Card>

        {/* Payments Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Resident</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className={`h-4 w-4 ${payment.type === 'four_wheeler' ? 'text-blue-500' : 'text-green-500'}`} />
                        <span>{payment.slotNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{payment.residentName}</p>
                        <p className="text-xs text-gray-500">{payment.unit}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{payment.vehicleNumber}</TableCell>
                    <TableCell>{payment.month} {payment.year}</TableCell>
                    <TableCell className="font-semibold">
                      \u20B9{payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{payment.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : payment.status === 'pending'
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {payment.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {payment.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {payment.status === 'overdue' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" title="View Details" onClick={() => setViewingPayment(payment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.status !== 'paid' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Record Payment"
                              onClick={() => {
                                setSelectedPayment(payment)
                                setIsRecordPaymentOpen(true)
                              }}
                            >
                              <CreditCard className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Send Reminder"
                              onClick={() => handleSendReminder(payment)}
                            >
                              <Send className="h-4 w-4 text-blue-500" />
                            </Button>
                          </>
                        )}
                        {payment.status === 'paid' && (
                          <Button variant="ghost" size="icon" title="View Receipt">
                            <Receipt className="h-4 w-4 text-gray-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* View Payment Dialog */}
        <Dialog open={viewingPayment !== null} onOpenChange={() => setViewingPayment(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Parking payment information</DialogDescription>
            </DialogHeader>
            {viewingPayment && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Payment ID</Label>
                    <p className="font-medium">{viewingPayment.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    <Badge className={viewingPayment.status === 'paid' ? 'bg-green-100 text-green-700' : viewingPayment.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}>
                      {viewingPayment.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Slot Number</Label>
                    <p className="font-medium">{viewingPayment.slotNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Vehicle Type</Label>
                    <p className="font-medium">{viewingPayment.type === 'four_wheeler' ? 'Four Wheeler' : 'Two Wheeler'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Resident Name</Label>
                    <p className="font-medium">{viewingPayment.residentName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Unit</Label>
                    <p className="font-medium">{viewingPayment.unit}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Vehicle Number</Label>
                    <p className="font-medium">{viewingPayment.vehicleNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Amount</Label>
                    <p className="font-medium text-green-600">\u20B9{viewingPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Period</Label>
                    <p className="font-medium">{viewingPayment.month} {viewingPayment.year}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Due Date</Label>
                    <p className="font-medium">{viewingPayment.dueDate}</p>
                  </div>
                  {viewingPayment.paymentDate && (
                    <>
                      <div>
                        <Label className="text-muted-foreground text-xs">Payment Date</Label>
                        <p className="font-medium">{viewingPayment.paymentDate}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-xs">Payment Method</Label>
                        <p className="font-medium capitalize">{viewingPayment.paymentMethod}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setViewingPayment(null)}>Close</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RoleGuard>
  )
}
