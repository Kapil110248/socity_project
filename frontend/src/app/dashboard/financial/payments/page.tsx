'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import api from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
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
    title: 'Total Payments',
    value: '₹42,50,000',
    change: '+15%',
    icon: DollarSign,
    color: 'blue',
  },
  {
    title: 'This Month',
    value: '₹10,85,000',
    change: '+8%',
    icon: TrendingUp,
    color: 'green',
  },
  {
    title: 'Pending',
    value: '₹1,60,000',
    change: '-5%',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Total Payers',
    value: '248',
    change: '+12',
    icon: Users,
    color: 'purple',
  },
]

const payments = [
  {
    id: 'PAY-2025-001',
    invoiceId: 'INV-2025-001',
    unit: 'A-101',
    resident: 'Rajesh Kumar',
    amount: 15000,
    paymentDate: '2025-01-03',
    paymentMethod: 'UPI',
    status: 'completed',
    transactionId: 'TXN123456789',
  },
  {
    id: 'PAY-2025-002',
    invoiceId: 'INV-2025-002',
    unit: 'B-205',
    resident: 'Priya Sharma',
    amount: 18500,
    paymentDate: '2025-01-04',
    paymentMethod: 'Net Banking',
    status: 'completed',
    transactionId: 'TXN987654321',
  },
  {
    id: 'PAY-2025-003',
    invoiceId: 'INV-2025-003',
    unit: 'C-304',
    resident: 'Amit Patel',
    amount: 16200,
    paymentDate: '2025-01-05',
    paymentMethod: 'Credit Card',
    status: 'pending',
    transactionId: 'TXN456789123',
  },
  {
    id: 'PAY-2025-004',
    invoiceId: 'INV-2025-004',
    unit: 'A-502',
    resident: 'Neha Gupta',
    amount: 22000,
    paymentDate: '2025-01-02',
    paymentMethod: 'Cheque',
    status: 'failed',
    transactionId: 'CHQ741852963',
  },
  {
    id: 'PAY-2025-005',
    invoiceId: 'INV-2025-005',
    unit: 'D-108',
    resident: 'Vikram Singh',
    amount: 14500,
    paymentDate: '2025-01-06',
    paymentMethod: 'UPI',
    status: 'completed',
    transactionId: 'TXN159753468',
  },
]

export default function PaymentsPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false)

  // Fetch Payments (Income Transactions)
  const { data: paymentsData = [], isLoading } = useQuery({
    queryKey: ['payments', statusFilter, searchQuery],
    queryFn: async () => {
      const response = await api.get('/transactions')
      // Filter for type=INCOME if not done by backend
      return response.data.filter((t: any) => t.type === 'INCOME')
    },
  })

  // Mutation for recording payment
  const recordMutation = useMutation({
    mutationFn: async (newPayment: any) => {
      return api.post('/transactions/income', newPayment)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      setIsRecordDialogOpen(false)
      toast.success('Payment recorded successfully!')
    },
  })

  const handleRecordPayment = (data: any) => {
    recordMutation.mutate(data)
  }

  const normalizedPayments = paymentsData.map((p: any) => ({
    ...p,
    resident: p.receivedFrom || 'N/A',
    paymentDate: new Date(p.date).toLocaleDateString(),
    status: p.status.toLowerCase(),
  }))

  const filteredPayments = normalizedPayments

  return (
    <RoleGuard allowedRoles={['admin']}>

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all payment transactions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Record Payment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Record Manual Payment</DialogTitle>
                <DialogDescription>
                  Record a payment received through offline mode
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Invoice Number</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inv-001">INV-2025-001</SelectItem>
                        <SelectItem value="inv-002">INV-2025-002</SelectItem>
                        <SelectItem value="inv-003">INV-2025-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (₹)</Label>
                    <Input type="number" placeholder="15000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="cheque">Cheque</SelectItem>
                        <SelectItem value="dd">Demand Draft</SelectItem>
                        <SelectItem value="online">Online Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Transaction ID / Reference</Label>
                  <Input placeholder="TXN123456789" />
                </div>
                <div className="space-y-2">
                  <Label>Remarks</Label>
                  <Input placeholder="Optional notes" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsRecordDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
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
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
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
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by unit, resident, transaction ID..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Payments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Resident</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment: any) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.invoiceId}</TableCell>
                <TableCell>{payment.unit}</TableCell>
                <TableCell>{payment.resident}</TableCell>
                <TableCell className="font-semibold">
                  ₹{payment.amount.toLocaleString()}
                </TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span>{payment.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {payment.transactionId}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === 'completed'
                        ? 'default'
                        : payment.status === 'failed'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : payment.status === 'failed'
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {payment.status === 'completed' && (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {payment.status === 'failed' && <XCircle className="h-3 w-3 mr-1" />}
                    {payment.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {payment.status}
                  </Badge>
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
