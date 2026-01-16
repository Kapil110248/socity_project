'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Receipt,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  CheckCircle2,
  Send,
  IndianRupee,
  FileText,
  Building2,
  CreditCard,
  Calendar,
  Trash2,
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
    title: 'Total Pending',
    value: '\u20B945K',
    change: '5 invoices',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Paid This Month',
    value: '\u20B93.2L',
    change: '12 payments',
    icon: CheckCircle,
    color: 'green',
  },
  {
    title: 'Due This Week',
    value: '\u20B935K',
    change: '3 invoices',
    icon: AlertCircle,
    color: 'red',
  },
  {
    title: 'Total Vendors',
    value: '28',
    change: '24 active',
    icon: Building2,
    color: 'blue',
  },
]

const vendorPayments = [
  {
    id: 'VP-001',
    vendorId: 'VEN-001',
    vendorName: 'PestFree Services',
    category: 'Pest Control',
    invoiceNumber: 'PF-2024-089',
    invoiceDate: '2024-12-01',
    dueDate: '2024-12-15',
    amount: 15000,
    gstAmount: 2700,
    totalAmount: 17700,
    description: 'Monthly Pest Control - All Blocks',
    status: 'pending',
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: 'VP-002',
    vendorId: 'VEN-002',
    vendorName: 'SecureGuard Services',
    category: 'Security',
    invoiceNumber: 'SG-2024-012',
    invoiceDate: '2024-11-30',
    dueDate: '2024-12-10',
    amount: 180000,
    gstAmount: 32400,
    totalAmount: 212400,
    description: 'Security Guard Salaries - December',
    status: 'paid',
    paymentDate: '2024-12-05',
    paymentMethod: 'online',
  },
  {
    id: 'VP-003',
    vendorId: 'VEN-003',
    vendorName: 'CleanPro Solutions',
    category: 'Housekeeping',
    invoiceNumber: 'CP-2024-156',
    invoiceDate: '2024-12-01',
    dueDate: '2024-12-15',
    amount: 65000,
    gstAmount: 11700,
    totalAmount: 76700,
    description: 'Housekeeping Services - December',
    status: 'approved',
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: 'VP-004',
    vendorId: 'VEN-004',
    vendorName: 'Kone Elevators',
    category: 'Maintenance',
    invoiceNumber: 'KONE-2024-Q4',
    invoiceDate: '2024-11-25',
    dueDate: '2024-12-20',
    amount: 35000,
    gstAmount: 6300,
    totalAmount: 41300,
    description: 'Elevator AMC - Q4 2024',
    status: 'pending',
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: 'VP-005',
    vendorId: 'VEN-005',
    vendorName: 'Green Gardens',
    category: 'Landscaping',
    invoiceNumber: 'GG-2024-078',
    invoiceDate: '2024-12-02',
    dueDate: '2024-12-17',
    amount: 25000,
    gstAmount: 4500,
    totalAmount: 29500,
    description: 'Garden Maintenance - December',
    status: 'pending',
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: 'VP-006',
    vendorId: 'VEN-006',
    vendorName: 'WaterPure Systems',
    category: 'Water Treatment',
    invoiceNumber: 'WP-2024-045',
    invoiceDate: '2024-11-28',
    dueDate: '2024-12-12',
    amount: 12000,
    gstAmount: 2160,
    totalAmount: 14160,
    description: 'Water Tank Cleaning - Quarterly',
    status: 'paid',
    paymentDate: '2024-12-03',
    paymentMethod: 'upi',
  },
]

const vendors = [
  { id: 'VEN-001', name: 'PestFree Services', category: 'Pest Control' },
  { id: 'VEN-002', name: 'SecureGuard Services', category: 'Security' },
  { id: 'VEN-003', name: 'CleanPro Solutions', category: 'Housekeeping' },
  { id: 'VEN-004', name: 'Kone Elevators', category: 'Maintenance' },
  { id: 'VEN-005', name: 'Green Gardens', category: 'Landscaping' },
  { id: 'VEN-006', name: 'WaterPure Systems', category: 'Water Treatment' },
  { id: 'VEN-007', name: 'MSEB', category: 'Electricity' },
  { id: 'VEN-008', name: 'Local Plumber', category: 'Plumbing' },
]

export default function VendorPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)
  const [isMakePaymentOpen, setIsMakePaymentOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<typeof vendorPayments[0] | null>(null)
  const [viewingPayment, setViewingPayment] = useState<typeof vendorPayments[0] | null>(null)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleAddPayment = () => {
    setIsAddPaymentOpen(false)
    showNotification('Vendor invoice added successfully!')
  }

  const handleMakePayment = () => {
    setIsMakePaymentOpen(false)
    setSelectedPayment(null)
    showNotification('Payment processed successfully!')
  }

  const handleApprove = (payment: typeof vendorPayments[0]) => {
    showNotification(`Invoice ${payment.invoiceNumber} approved for payment!`)
  }

  const handleExport = () => {
    showNotification('Payment data exported successfully!')
  }

  const totalPending = vendorPayments
    .filter(p => p.status === 'pending' || p.status === 'approved')
    .reduce((sum, p) => sum + p.totalAmount, 0)

  const totalPaid = vendorPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.totalAmount, 0)

  const filteredPayments = vendorPayments.filter((payment) => {
    const matchesSearch =
      payment.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || payment.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vendor Payments</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage and process vendor invoices and payments
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="gap-2 text-sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white gap-2 text-sm">
                  <Plus className="h-4 w-4" />
                  <span>Add Invoice</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Vendor Invoice</DialogTitle>
                  <DialogDescription>
                    Record a new vendor invoice for payment processing
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Select Vendor *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendors.map(vendor => (
                            <SelectItem key={vendor.id} value={vendor.id}>
                              {vendor.name} ({vendor.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pest_control">Pest Control</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="landscaping">Landscaping</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Invoice Number *</Label>
                      <Input placeholder="PF-2024-089" />
                    </div>
                    <div className="space-y-2">
                      <Label>Invoice Date *</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Input placeholder="Monthly Pest Control - All Blocks" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Amount (\u20B9) *</Label>
                      <Input type="number" placeholder="15000" />
                    </div>
                    <div className="space-y-2">
                      <Label>GST Amount (\u20B9)</Label>
                      <Input type="number" placeholder="2700" />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date *</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Remarks</Label>
                    <Textarea placeholder="Any additional notes..." rows={2} />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddPaymentOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddPayment}>
                      Add Invoice
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
                        stat.color === 'orange'
                          ? 'bg-orange-100'
                          : stat.color === 'green'
                          ? 'bg-green-100'
                          : stat.color === 'red'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          stat.color === 'orange'
                            ? 'text-orange-600'
                            : stat.color === 'green'
                            ? 'text-green-600'
                            : stat.color === 'red'
                            ? 'text-red-600'
                            : 'text-blue-600'
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
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Total Pending Payments</p>
                <h3 className="text-3xl font-bold text-orange-800 mt-1">
                  \u20B9{totalPending.toLocaleString()}
                </h3>
                <p className="text-sm text-orange-600 mt-1">
                  {vendorPayments.filter(p => p.status !== 'paid').length} invoices pending
                </p>
              </div>
              <div className="p-4 bg-orange-100 rounded-full">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Paid This Month</p>
                <h3 className="text-3xl font-bold text-green-800 mt-1">
                  \u20B9{totalPaid.toLocaleString()}
                </h3>
                <p className="text-sm text-green-600 mt-1">
                  {vendorPayments.filter(p => p.status === 'paid').length} payments processed
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
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
                placeholder="Search by vendor, invoice, or description..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Pest Control">Pest Control</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Landscaping">Landscaping</SelectItem>
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
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{payment.vendorName}</p>
                        <p className="text-xs text-gray-500">{payment.category}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm">
                      {payment.description}
                    </TableCell>
                    <TableCell>\u20B9{payment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      \u20B9{payment.gstAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      \u20B9{payment.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{payment.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : payment.status === 'approved'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                        }
                      >
                        {payment.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {payment.status === 'approved' && <Clock className="h-3 w-3 mr-1" />}
                        {payment.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" title="View Details" onClick={() => setViewingPayment(payment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {payment.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Approve"
                            onClick={() => handleApprove(payment)}
                          >
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          </Button>
                        )}
                        {(payment.status === 'pending' || payment.status === 'approved') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Make Payment"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setIsMakePaymentOpen(true)
                            }}
                          >
                            <CreditCard className="h-4 w-4 text-green-500" />
                          </Button>
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

        {/* Make Payment Dialog */}
        <Dialog open={isMakePaymentOpen} onOpenChange={setIsMakePaymentOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Make Payment</DialogTitle>
              <DialogDescription>
                Process payment for {selectedPayment?.vendorName}
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4 py-4">
                <Card className="p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Invoice</p>
                      <p className="font-medium">{selectedPayment.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Vendor</p>
                      <p className="font-medium">{selectedPayment.vendorName}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Description</p>
                      <p className="font-medium">{selectedPayment.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-bold text-lg text-green-600">
                        \u20B9{selectedPayment.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Due Date</p>
                      <p className="font-medium">{selectedPayment.dueDate}</p>
                    </div>
                  </div>
                </Card>
                <div className="space-y-2">
                  <Label>Payment Method *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online Transfer (NEFT/RTGS)</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Date *</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Transaction/Reference ID</Label>
                  <Input placeholder="Enter transaction ID" />
                </div>
                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Textarea placeholder="Any payment notes..." rows={2} />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsMakePaymentOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleMakePayment}>
                    Confirm Payment
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Payment Dialog */}
        <Dialog open={viewingPayment !== null} onOpenChange={() => setViewingPayment(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Invoice Details</DialogTitle>
              <DialogDescription>Vendor payment information</DialogDescription>
            </DialogHeader>
            {viewingPayment && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Invoice Number</Label>
                    <p className="font-medium">{viewingPayment.invoiceNumber}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    <Badge className={
                      viewingPayment.status === 'paid' ? 'bg-green-100 text-green-700' :
                      viewingPayment.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }>
                      {viewingPayment.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Vendor</Label>
                    <p className="font-medium">{viewingPayment.vendorName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Category</Label>
                    <p className="font-medium">{viewingPayment.category}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground text-xs">Description</Label>
                    <p className="font-medium">{viewingPayment.description}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Invoice Date</Label>
                    <p className="font-medium">{viewingPayment.invoiceDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Due Date</Label>
                    <p className="font-medium">{viewingPayment.dueDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Base Amount</Label>
                    <p className="font-medium">\u20B9{viewingPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">GST (18%)</Label>
                    <p className="font-medium">\u20B9{viewingPayment.gstAmount.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground text-xs">Total Amount</Label>
                    <p className="font-bold text-xl text-green-600">\u20B9{viewingPayment.totalAmount.toLocaleString()}</p>
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
