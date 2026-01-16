'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const journalEntries = [
  {
    id: 'JV-2025-001',
    date: '2025-12-19',
    narration: 'Monthly maintenance collection from Block A',
    status: 'posted',
    createdBy: 'System',
    entries: [
      { account: 'Bank - HDFC', debit: 150000, credit: 0 },
      { account: 'Maintenance Charges', debit: 0, credit: 150000 },
    ],
    totalAmount: 150000,
  },
  {
    id: 'JV-2025-002',
    date: '2025-12-18',
    narration: 'Security staff salary for December 2025',
    status: 'posted',
    createdBy: 'Admin',
    entries: [
      { account: 'Security Expenses', debit: 45000, credit: 0 },
      { account: 'Bank - HDFC', debit: 0, credit: 45000 },
    ],
    totalAmount: 45000,
  },
  {
    id: 'JV-2025-003',
    date: '2025-12-17',
    narration: 'Electricity bill payment - Common areas',
    status: 'posted',
    createdBy: 'Admin',
    entries: [
      { account: 'Electricity Common', debit: 28000, credit: 0 },
      { account: 'Bank - ICICI', debit: 0, credit: 28000 },
    ],
    totalAmount: 28000,
  },
  {
    id: 'JV-2025-004',
    date: '2025-12-16',
    narration: 'Late payment penalty collected',
    status: 'pending',
    createdBy: 'System',
    entries: [
      { account: 'Cash in Hand', debit: 5000, credit: 0 },
      { account: 'Late Payment Fees', debit: 0, credit: 5000 },
    ],
    totalAmount: 5000,
  },
  {
    id: 'JV-2025-005',
    date: '2025-12-15',
    narration: 'Garden maintenance - Monthly contract',
    status: 'draft',
    createdBy: 'Admin',
    entries: [
      { account: 'Garden Maintenance', debit: 12000, credit: 0 },
      { account: 'Pending Bills', debit: 0, credit: 12000 },
    ],
    totalAmount: 12000,
  },
  {
    id: 'JV-2025-006',
    date: '2025-12-14',
    narration: 'Clubhouse booking fees - Weekend event',
    status: 'posted',
    createdBy: 'System',
    entries: [
      { account: 'Bank - HDFC', debit: 8000, credit: 0 },
      { account: 'Amenity Booking', debit: 0, credit: 8000 },
    ],
    totalAmount: 8000,
  },
]

export default function JournalEntriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<typeof journalEntries[0] | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'posted':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Posted</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>
      case 'draft':
        return <Badge variant="secondary"><Edit className="h-3 w-3 mr-1" /> Draft</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = [
    { label: 'Total Entries', value: journalEntries.length, color: 'bg-blue-500' },
    { label: 'Posted', value: journalEntries.filter(e => e.status === 'posted').length, color: 'bg-green-500' },
    { label: 'Pending', value: journalEntries.filter(e => e.status === 'pending').length, color: 'bg-yellow-500' },
    { label: 'Draft', value: journalEntries.filter(e => e.status === 'draft').length, color: 'bg-gray-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-orange-600" />
            Journal Entries
          </h1>
          <p className="text-gray-600 mt-1">Record and manage accounting transactions</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Entry
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
                <FileText className="h-5 w-5 text-white" />
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
              placeholder="Search entries..."
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
              <SelectItem value="posted">Posted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="current">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">This Month</SelectItem>
              <SelectItem value="previous">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Journal Entries Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Voucher No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Narration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntries.map((entry) => (
              <TableRow key={entry.id} className="hover:bg-gray-50">
                <TableCell className="font-mono font-medium">{entry.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(entry.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="max-w-xs truncate">{entry.narration}</p>
                  <p className="text-xs text-gray-500">By: {entry.createdBy}</p>
                </TableCell>
                <TableCell>{getStatusBadge(entry.status)}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(entry.totalAmount)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEntry(entry)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Journal Entry - {entry.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Date:</span>
                            <span>{new Date(entry.date).toLocaleDateString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Status:</span>
                            {getStatusBadge(entry.status)}
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Narration:</p>
                            <p className="text-sm">{entry.narration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Entry Details:</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Account</TableHead>
                                  <TableHead className="text-right">Debit</TableHead>
                                  <TableHead className="text-right">Credit</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {entry.entries.map((line, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{line.account}</TableCell>
                                    <TableCell className="text-right">
                                      {line.debit > 0 ? formatCurrency(line.debit) : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {line.credit > 0 ? formatCurrency(line.credit) : '-'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {entry.status === 'draft' && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
