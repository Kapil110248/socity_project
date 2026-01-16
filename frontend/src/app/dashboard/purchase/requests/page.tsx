'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileQuestion,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Package,
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

const purchaseRequests = [
  {
    id: 'PR-2025-001',
    date: '2025-12-18',
    requestedBy: 'Admin Office',
    category: 'Maintenance',
    description: 'Garden maintenance tools and equipment',
    items: [
      { name: 'Garden Shears', qty: 5, estPrice: 500 },
      { name: 'Lawn Mower', qty: 1, estPrice: 15000 },
      { name: 'Fertilizer (50kg)', qty: 10, estPrice: 800 },
    ],
    totalEstimate: 25500,
    priority: 'medium',
    status: 'approved',
    approvedBy: 'Manager',
    approvedDate: '2025-12-19',
  },
  {
    id: 'PR-2025-002',
    date: '2025-12-17',
    requestedBy: 'Security Dept',
    category: 'Security',
    description: 'CCTV camera replacement and new installations',
    items: [
      { name: 'HD CCTV Camera', qty: 4, estPrice: 8000 },
      { name: 'DVR System', qty: 1, estPrice: 25000 },
      { name: 'Cables & Accessories', qty: 1, estPrice: 5000 },
    ],
    totalEstimate: 62000,
    priority: 'high',
    status: 'waiting_manager',
    approvedBy: null,
    approvedDate: null,
  },
  {
    id: 'PR-2025-003',
    date: '2025-12-16',
    requestedBy: 'Housekeeping',
    category: 'Cleaning',
    description: 'Monthly cleaning supplies replenishment',
    items: [
      { name: 'Floor Cleaner (5L)', qty: 20, estPrice: 250 },
      { name: 'Mops', qty: 10, estPrice: 150 },
      { name: 'Garbage Bags (Roll)', qty: 50, estPrice: 80 },
    ],
    totalEstimate: 10500,
    priority: 'low',
    status: 'converted',
    approvedBy: 'Manager',
    approvedDate: '2025-12-17',
  },
  {
    id: 'PR-2025-004',
    date: '2025-12-15',
    requestedBy: 'Admin Office',
    category: 'Electrical',
    description: 'Emergency generator maintenance parts',
    items: [
      { name: 'Generator Oil', qty: 10, estPrice: 500 },
      { name: 'Air Filter', qty: 2, estPrice: 2500 },
      { name: 'Spark Plugs', qty: 4, estPrice: 800 },
    ],
    totalEstimate: 13200,
    priority: 'high',
    status: 'rejected',
    approvedBy: 'Manager',
    approvedDate: '2025-12-16',
    rejectionReason: 'Existing contract covers maintenance parts',
  },
  {
    id: 'PR-2025-005',
    date: '2025-12-14',
    requestedBy: 'Clubhouse',
    category: 'Furniture',
    description: 'Pool side furniture replacement',
    items: [
      { name: 'Poolside Lounger', qty: 6, estPrice: 5000 },
      { name: 'Umbrella Stand', qty: 4, estPrice: 3000 },
      { name: 'Side Tables', qty: 6, estPrice: 2000 },
    ],
    totalEstimate: 54000,
    priority: 'medium',
    status: 'draft',
    approvedBy: null,
    approvedDate: null,
  },
]

export default function PurchaseRequestsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPR, setSelectedPR] = useState<typeof purchaseRequests[0] | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>
      case 'waiting_manager':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" /> Pending CM Approval</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Pending Finance</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>
      case 'converted':
        return <Badge className="bg-blue-100 text-blue-800"><ArrowRight className="h-3 w-3 mr-1" /> Converted to PO</Badge>
      case 'draft':
        return <Badge variant="secondary"><Edit className="h-3 w-3 mr-1" /> Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
      case 'low':
        return <Badge variant="secondary" className="text-xs">Low</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>
    }
  }

  const stats = [
    { label: 'Total Requests', value: purchaseRequests.length, icon: FileQuestion, color: 'bg-blue-500' },
    { label: 'Pending CM', value: purchaseRequests.filter(p => p.status === 'waiting_manager').length, icon: Clock, color: 'bg-blue-400' },
    { label: 'Pending Finance', value: purchaseRequests.filter(p => p.status === 'pending').length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Approved', value: purchaseRequests.filter(p => p.status === 'approved').length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Converted to PO', value: purchaseRequests.filter(p => p.status === 'converted').length, icon: ArrowRight, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileQuestion className="h-8 w-8 text-blue-600" />
            Purchase Requests
          </h1>
          <p className="text-gray-600 mt-1">Create and manage purchase requisitions</p>
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

      {/* Filters */}
      <Card className="p-4 mb-6">
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="waiting_manager">Pending CM</SelectItem>
              <SelectItem value="pending">Pending Finance</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Purchase Requests Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>PR Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Estimate (₹)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseRequests.map((pr) => (
              <TableRow key={pr.id} className="hover:bg-gray-50">
                <TableCell className="font-mono font-medium">{pr.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(pr.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="max-w-xs truncate font-medium">{pr.description}</p>
                  <p className="text-xs text-gray-500">{pr.items.length} items</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <User className="h-3 w-3" />
                    {pr.requestedBy}
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(pr.priority)}</TableCell>
                <TableCell>{getStatusBadge(pr.status)}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(pr.totalEstimate)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPR(pr)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Purchase Request - {pr.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Date:</span>
                              <p>{new Date(pr.date).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Status:</span>
                              <p>{getStatusBadge(pr.status)}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Requested By:</span>
                              <p>{pr.requestedBy}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Category:</span>
                              <p>{pr.category}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Description:</p>
                            <p className="text-sm">{pr.description}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Items:</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-center">Qty</TableHead>
                                  <TableHead className="text-right">Est. Price</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {pr.items.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-center">{item.qty}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.estPrice * item.qty)}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="font-bold">
                                  <TableCell colSpan={2}>Total</TableCell>
                                  <TableCell className="text-right">{formatCurrency(pr.totalEstimate)}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          {pr.status === 'waiting_manager' && (
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Approve (CM)</Button>
                              <Button variant="destructive" className="flex-1">Reject</Button>
                            </div>
                          )}
                          {pr.status === 'pending' && (
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1 bg-green-600 hover:bg-green-700">Approve (Finance)</Button>
                              <Button variant="destructive" className="flex-1">Reject</Button>
                            </div>
                          )}
                          {pr.status === 'approved' && (
                            <Button className="w-full">Convert to Purchase Order</Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    {(pr.status === 'draft' || pr.status === 'pending') && (
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
