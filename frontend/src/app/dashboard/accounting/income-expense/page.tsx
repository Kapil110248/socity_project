'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  CheckCircle2,
  PieChart,
  BarChart3,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const incomeStats = [
  { title: 'Total Income', value: '\u20B98.5L', change: '+12%', color: 'green' },
  { title: 'This Month', value: '\u20B91.2L', change: '+8%', color: 'blue' },
  { title: 'Maintenance', value: '\u20B96L', change: 'Major source', color: 'purple' },
  { title: 'Parking', value: '\u20B91.2L', change: '14% of total', color: 'cyan' },
]

const expenseStats = [
  { title: 'Total Expenses', value: '\u20B95.2L', change: '+5%', color: 'red' },
  { title: 'This Month', value: '\u20B975K', change: '-3%', color: 'orange' },
  { title: 'Security', value: '\u20B91.8L', change: 'Highest expense', color: 'purple' },
  { title: 'Pending', value: '\u20B945K', change: '3 bills', color: 'yellow' },
]

const incomeData = [
  {
    id: 'INC-001',
    category: 'maintenance',
    description: 'December Maintenance - Block A',
    amount: 285000,
    date: '2024-12-05',
    receivedFrom: 'Residents - Block A',
    unit: 'Multiple',
    paymentMethod: 'online',
    status: 'received',
  },
  {
    id: 'INC-002',
    category: 'parking',
    description: 'Parking Fees - December',
    amount: 48000,
    date: '2024-12-03',
    receivedFrom: 'Multiple Residents',
    unit: 'All Blocks',
    paymentMethod: 'mixed',
    status: 'received',
  },
  {
    id: 'INC-003',
    category: 'amenity',
    description: 'Club House Booking - Wedding',
    amount: 25000,
    date: '2024-12-01',
    receivedFrom: 'Rajesh Kumar',
    unit: 'A-101',
    paymentMethod: 'upi',
    status: 'received',
  },
  {
    id: 'INC-004',
    category: 'penalty',
    description: 'Late Payment Fee - November',
    amount: 8500,
    date: '2024-12-02',
    receivedFrom: 'Multiple Defaulters',
    unit: 'Various',
    paymentMethod: 'online',
    status: 'received',
  },
  {
    id: 'INC-005',
    category: 'deposit',
    description: 'Security Deposit - New Tenant',
    amount: 75000,
    date: '2024-12-04',
    receivedFrom: 'Sneha Reddy',
    unit: 'A-402',
    paymentMethod: 'cheque',
    status: 'received',
  },
  {
    id: 'INC-006',
    category: 'maintenance',
    description: 'December Maintenance - Block B',
    amount: 240000,
    date: '2024-12-06',
    receivedFrom: 'Residents - Block B',
    unit: 'Multiple',
    paymentMethod: 'online',
    status: 'pending',
  },
]

const expenseData = [
  {
    id: 'EXP-001',
    category: 'security',
    description: 'Security Guard Salaries - December',
    amount: 180000,
    date: '2024-12-01',
    paidTo: 'SecureGuard Services',
    invoiceNumber: 'SG-2024-012',
    paymentMethod: 'online',
    status: 'paid',
  },
  {
    id: 'EXP-002',
    category: 'housekeeping',
    description: 'Housekeeping Services - December',
    amount: 65000,
    date: '2024-12-02',
    paidTo: 'CleanPro Solutions',
    invoiceNumber: 'CP-2024-156',
    paymentMethod: 'online',
    status: 'paid',
  },
  {
    id: 'EXP-003',
    category: 'utilities',
    description: 'Common Area Electricity - November',
    amount: 42000,
    date: '2024-12-03',
    paidTo: 'MSEB',
    invoiceNumber: 'MSEB-9876543',
    paymentMethod: 'online',
    status: 'paid',
  },
  {
    id: 'EXP-004',
    category: 'maintenance',
    description: 'Elevator AMC - Q4',
    amount: 35000,
    date: '2024-12-05',
    paidTo: 'Kone Elevators',
    invoiceNumber: 'KONE-2024-Q4',
    paymentMethod: 'cheque',
    status: 'pending',
  },
  {
    id: 'EXP-005',
    category: 'vendor',
    description: 'Pest Control - Monthly',
    amount: 15000,
    date: '2024-12-04',
    paidTo: 'PestFree Services',
    invoiceNumber: 'PF-2024-089',
    paymentMethod: 'upi',
    status: 'approved',
  },
  {
    id: 'EXP-006',
    category: 'repairs',
    description: 'Plumbing Repairs - Block C',
    amount: 8500,
    date: '2024-12-06',
    paidTo: 'Local Plumber',
    invoiceNumber: null,
    paymentMethod: 'cash',
    status: 'paid',
  },
]

const incomeCategoryColors: Record<string, string> = {
  maintenance: 'bg-green-100 text-green-700',
  parking: 'bg-blue-100 text-blue-700',
  amenity: 'bg-purple-100 text-purple-700',
  penalty: 'bg-orange-100 text-orange-700',
  deposit: 'bg-cyan-100 text-cyan-700',
  event: 'bg-pink-100 text-pink-700',
  other: 'bg-gray-100 text-gray-700',
}

const expenseCategoryColors: Record<string, string> = {
  salary: 'bg-blue-100 text-blue-700',
  security: 'bg-indigo-100 text-indigo-700',
  housekeeping: 'bg-green-100 text-green-700',
  utilities: 'bg-yellow-100 text-yellow-700',
  maintenance: 'bg-orange-100 text-orange-700',
  repairs: 'bg-red-100 text-red-700',
  vendor: 'bg-purple-100 text-purple-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function IncomeExpensePage() {
  const [activeTab, setActiveTab] = useState('income')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false)
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleAddIncome = () => {
    setIsAddIncomeOpen(false)
    showNotification('Income recorded successfully!')
  }

  const handleAddExpense = () => {
    setIsAddExpenseOpen(false)
    showNotification('Expense recorded successfully!')
  }

  const handleExport = () => {
    showNotification('Data exported successfully!')
  }

  const totalIncome = incomeData.filter(i => i.status === 'received').reduce((sum, i) => sum + i.amount, 0)
  const totalExpenses = expenseData.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0)
  const netBalance = totalIncome - totalExpenses

  const filteredIncome = incomeData.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.receivedFrom.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredExpenses = expenseData.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paidTo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Income & Expense Tracking</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Track all society income and expenses
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="gap-2 text-sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Income (This Month)</p>
                <h3 className="text-3xl font-bold text-green-800 mt-1">
                  \u20B9{totalIncome.toLocaleString()}
                </h3>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <ArrowUpRight className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Total Expenses (This Month)</p>
                <h3 className="text-3xl font-bold text-red-800 mt-1">
                  \u20B9{totalExpenses.toLocaleString()}
                </h3>
              </div>
              <div className="p-4 bg-red-100 rounded-full">
                <ArrowDownRight className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </Card>
          <Card className={`p-6 ${netBalance >= 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${netBalance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>Net Balance</p>
                <h3 className={`text-3xl font-bold mt-1 ${netBalance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                  \u20B9{Math.abs(netBalance).toLocaleString()}
                </h3>
                <p className={`text-xs mt-1 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {netBalance >= 0 ? 'Surplus' : 'Deficit'}
                </p>
              </div>
              <div className={`p-4 rounded-full ${netBalance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                <IndianRupee className={`h-8 w-8 ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-2">
              <TabsTrigger value="income" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Income
              </TabsTrigger>
              <TabsTrigger value="expenses" className="gap-2">
                <TrendingDown className="h-4 w-4" />
                Expenses
              </TabsTrigger>
            </TabsList>
            <div>
              {activeTab === 'income' ? (
                <Dialog open={isAddIncomeOpen} onOpenChange={setIsAddIncomeOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                      <Plus className="h-4 w-4" />
                      Record Income
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Record New Income</DialogTitle>
                      <DialogDescription>Add a new income entry</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance Charges</SelectItem>
                            <SelectItem value="parking">Parking Fees</SelectItem>
                            <SelectItem value="amenity">Amenity Booking</SelectItem>
                            <SelectItem value="penalty">Late Payment Fee</SelectItem>
                            <SelectItem value="deposit">Security Deposit</SelectItem>
                            <SelectItem value="event">Event Fees</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <Input placeholder="Brief description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Amount (\u20B9) *</Label>
                          <Input type="number" placeholder="50000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Date *</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Received From *</Label>
                          <Input placeholder="Name / Unit" />
                        </div>
                        <div className="space-y-2">
                          <Label>Payment Method</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="online">Online Transfer</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="cheque">Cheque</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea placeholder="Additional notes..." rows={2} />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddIncomeOpen(false)}>Cancel</Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddIncome}>Record Income</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                      <Plus className="h-4 w-4" />
                      Record Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Record New Expense</DialogTitle>
                      <DialogDescription>Add a new expense entry</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="housekeeping">Housekeeping</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="maintenance">Maintenance/AMC</SelectItem>
                            <SelectItem value="repairs">Repairs</SelectItem>
                            <SelectItem value="vendor">Vendor Payment</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <Input placeholder="Brief description" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Amount (\u20B9) *</Label>
                          <Input type="number" placeholder="15000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Date *</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Paid To *</Label>
                          <Input placeholder="Vendor/Service name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Invoice Number</Label>
                          <Input placeholder="INV-2024-001" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online Transfer</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea placeholder="Additional notes..." rows={2} />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>Cancel</Button>
                        <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddExpense}>Record Expense</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {activeTab === 'income' ? (
                    <>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="parking">Parking</SelectItem>
                      <SelectItem value="amenity">Amenity</SelectItem>
                      <SelectItem value="penalty">Penalty</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="repairs">Repairs</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {activeTab === 'income' ? (
                    <>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Income Tab */}
          <TabsContent value="income">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Received From</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncome.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <Badge className={incomeCategoryColors[item.category]}>
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{item.receivedFrom}</p>
                            <p className="text-xs text-gray-500">{item.unit}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          +\u20B9{item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm">{item.date}</TableCell>
                        <TableCell>
                          <Badge className={item.status === 'received' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
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
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Paid To</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <Badge className={expenseCategoryColors[item.category]}>
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{item.paidTo}</p>
                            {item.invoiceNumber && (
                              <p className="text-xs text-gray-500">{item.invoiceNumber}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-red-600">
                          -\u20B9{item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm">{item.date}</TableCell>
                        <TableCell>
                          <Badge className={
                            item.status === 'paid' ? 'bg-green-100 text-green-700' :
                            item.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
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
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
