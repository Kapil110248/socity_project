'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Search,
  Filter,
  Download,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Send,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RoleGuard } from '@/components/auth/role-guard'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

import { toast } from 'react-hot-toast'

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: invoices = [], isLoading, refetch } = useQuery<any[]>({
    queryKey: ['platform-invoices'],
    queryFn: async () => {
      const response = await api.get('/platform-invoices')
      return response.data
    }
  })

  const updateStatusMutation = async (id: number, status: string) => {
    try {
      await api.patch(`/platform-invoices/${id}/status`, { status })
      toast.success(`Invoice marked as ${status}`)
      refetch()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const generateInvoices = async () => {
    toast.loading('Generating invoices...')
    try {
      // Logic for generating invoices for all active societies
      // This is a placeholder for a real batch generation API
      await api.post('/platform-invoices', {
        societyId: invoices[0]?.societyId || 1, // Fallback for demo
        amount: 25000,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        invoiceNo: `INV-${Date.now()}`
      })
      toast.dismiss()
      toast.success('Invoices generated successfully')
      refetch()
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate invoices')
    }
  }

  const exportInvoices = () => {
    toast.success('Exporting invoices to CSV...')
    // Mock export logic
  }

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.societyName?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter.toUpperCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case 'PENDING':
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case 'OVERDUE':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === 'PAID').length,
    pending: invoices.filter((i) => i.status === 'PENDING').length,
    overdue: invoices.filter((i) => i.status === 'OVERDUE').length,
  }

  return (
    <RoleGuard allowedRoles={['super_admin']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600">View and manage platform invoices</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportInvoices}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={generateInvoices}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Invoices
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Invoices</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.paid}</p>
                  <p className="text-sm text-gray-500">Paid</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.overdue}</p>
                  <p className="text-sm text-gray-500">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by invoice ID or society..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
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
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Society</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ) : filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono font-medium">{inv.invoiceNo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          {inv.societyName}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{inv.amount}</TableCell>
                      <TableCell>{getStatusBadge(inv.status)}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(inv.issueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(inv.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => toast.success('Viewing invoice details...')}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toast.success('Downloading invoice...')}>
                            <Download className="h-4 w-4" />
                          </Button>
                          {inv.status !== 'PAID' && (
                            <Button variant="ghost" size="icon" onClick={() => updateStatusMutation(inv.id, 'PAID')}>
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </RoleGuard>
  )
}
