'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
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
    title: 'Total Invoices',
    value: '1,245',
    change: '+12%',
    icon: DollarSign,
    color: 'blue',
  },
  {
    title: 'Paid',
    value: '987',
    change: '+8%',
    icon: TrendingUp,
    color: 'green',
  },
  {
    title: 'Pending',
    value: '158',
    change: '-5%',
    icon: Calendar,
    color: 'orange',
  },
  {
    title: 'Overdue',
    value: '100',
    change: '+3',
    icon: Users,
    color: 'red',
  },
]

const invoices = [
  {
    id: 'INV-2025-001',
    unit: 'A-101',
    resident: 'Rajesh Kumar',
    amount: 15000,
    issueDate: '2024-12-01',
    dueDate: '2025-01-05',
    status: 'paid',
    paidDate: '2025-01-03',
  },
  {
    id: 'INV-2025-002',
    unit: 'B-205',
    resident: 'Priya Sharma',
    amount: 18500,
    issueDate: '2024-12-01',
    dueDate: '2025-01-05',
    status: 'paid',
    paidDate: '2025-01-04',
  },
  {
    id: 'INV-2025-003',
    unit: 'C-304',
    resident: 'Amit Patel',
    amount: 16200,
    issueDate: '2024-12-01',
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
  },
  {
    id: 'INV-2025-004',
    unit: 'A-502',
    resident: 'Neha Gupta',
    amount: 22000,
    issueDate: '2024-11-01',
    dueDate: '2024-12-20',
    status: 'overdue',
    paidDate: null,
  },
  {
    id: 'INV-2025-005',
    unit: 'D-108',
    resident: 'Vikram Singh',
    amount: 14500,
    issueDate: '2024-12-01',
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
  },
]

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <RoleGuard allowedRoles={['admin']}>

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all society invoices
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Invoice</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Generate a new invoice for a unit
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
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
                    <Label>Amount (₹)</Label>
                    <Input type="number" placeholder="15000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Monthly maintenance charge" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Invoice
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
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : 'bg-red-100'
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
              placeholder="Search by unit, resident, or invoice number..."
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
          <Button variant="outline" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Resident</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.unit}</TableCell>
                <TableCell>{invoice.resident}</TableCell>
                <TableCell className="font-semibold">
                  ₹{invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === 'paid'
                        ? 'default'
                        : invoice.status === 'overdue'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : invoice.status === 'overdue'
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View"
                      onClick={() => alert(`Viewing invoice ${invoice.id}\n\nUnit: ${invoice.unit}\nResident: ${invoice.resident}\nAmount: ₹${invoice.amount.toLocaleString()}\nStatus: ${invoice.status}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Send"
                      onClick={() => {
                        const message = `Dear ${invoice.resident}, your invoice ${invoice.id} for ₹${invoice.amount.toLocaleString()} is ${invoice.status}. Due date: ${invoice.dueDate}.`
                        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Download"
                      onClick={() => alert(`Downloading invoice ${invoice.id} as PDF...`)}
                    >
                      <Download className="h-4 w-4" />
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
