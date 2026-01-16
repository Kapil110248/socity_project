'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PackageCheck,
  Plus,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Calendar,
  Building,
  FileText,
  Truck,
  Package,
  ClipboardCheck,
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

const goodsReceipts = [
  {
    id: 'GR-2025-001',
    poReference: 'PO-2025-002',
    date: '2025-12-19',
    vendor: 'CleanPro Solutions',
    description: 'Monthly cleaning supplies',
    type: 'goods',
    items: [
      { name: 'Floor Cleaner (5L)', ordered: 20, received: 20, rejected: 0, status: 'complete' },
      { name: 'Mops', ordered: 10, received: 10, rejected: 0, status: 'complete' },
      { name: 'Garbage Bags (Roll)', ordered: 50, received: 50, rejected: 0, status: 'complete' },
    ],
    status: 'completed',
    receivedBy: 'Store Keeper',
    qualityChecked: true,
    invoiceNo: 'INV-CP-2025-456',
  },
  {
    id: 'GR-2025-002',
    poReference: 'PO-2025-003',
    date: '2025-12-18',
    vendor: 'SecureTech Systems',
    description: 'Fire safety equipment service',
    type: 'service',
    items: [
      { name: 'Fire Extinguisher Service', ordered: 20, received: 15, rejected: 0, status: 'partial' },
      { name: 'Smoke Detector Battery', ordered: 50, received: 50, rejected: 2, status: 'complete' },
      { name: 'Fire Hose Inspection', ordered: 10, received: 0, rejected: 0, status: 'pending' },
    ],
    status: 'partial',
    receivedBy: 'Security Supervisor',
    qualityChecked: true,
    invoiceNo: null,
  },
  {
    id: 'GR-2025-003',
    poReference: 'PO-2025-001',
    date: '2025-12-17',
    vendor: 'Green Gardens Supplies',
    description: 'Garden maintenance equipment',
    type: 'goods',
    items: [
      { name: 'Garden Shears', ordered: 5, received: 5, rejected: 1, status: 'complete' },
      { name: 'Lawn Mower', ordered: 1, received: 1, rejected: 0, status: 'complete' },
      { name: 'Fertilizer (50kg)', ordered: 10, received: 8, rejected: 0, status: 'partial' },
    ],
    status: 'partial',
    receivedBy: 'Garden Supervisor',
    qualityChecked: true,
    invoiceNo: 'INV-GG-2025-123',
  },
  {
    id: 'SR-2025-001',
    poReference: null,
    date: '2025-12-16',
    vendor: 'TechFix Services',
    description: 'Elevator maintenance - Annual service',
    type: 'service',
    items: [
      { name: 'Elevator A - Service', ordered: 1, received: 1, rejected: 0, status: 'complete' },
      { name: 'Elevator B - Service', ordered: 1, received: 1, rejected: 0, status: 'complete' },
      { name: 'Elevator C - Service', ordered: 1, received: 1, rejected: 0, status: 'complete' },
    ],
    status: 'completed',
    receivedBy: 'Admin Manager',
    qualityChecked: true,
    invoiceNo: 'TF-SVC-2025-089',
  },
]

export default function GoodsReceiptsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGR, setSelectedGR] = useState<typeof goodsReceipts[0] | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> Partial</Badge>
      case 'pending':
        return <Badge variant="secondary"><Package className="h-3 w-3 mr-1" /> Pending</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getItemStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 text-xs">Complete</Badge>
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Partial</Badge>
      case 'pending':
        return <Badge variant="secondary" className="text-xs">Pending</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  const stats = [
    { label: 'Total Receipts', value: goodsReceipts.length, icon: PackageCheck, color: 'bg-blue-500' },
    { label: 'Completed', value: goodsReceipts.filter(g => g.status === 'completed').length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Partial', value: goodsReceipts.filter(g => g.status === 'partial').length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Pending QC', value: goodsReceipts.filter(g => !g.qualityChecked).length, icon: ClipboardCheck, color: 'bg-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <PackageCheck className="h-8 w-8 text-teal-600" />
            Goods & Service Receipts
          </h1>
          <p className="text-gray-600 mt-1">Record and manage deliveries from vendors</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Receipt
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
              placeholder="Search receipts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="goods">Goods Receipt</SelectItem>
              <SelectItem value="service">Service Receipt</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Receipts Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Receipt No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>QC</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goodsReceipts.map((gr) => (
              <TableRow key={gr.id} className="hover:bg-gray-50">
                <TableCell>
                  <p className="font-mono font-medium">{gr.id}</p>
                  {gr.poReference && (
                    <p className="text-xs text-gray-500">PO: {gr.poReference}</p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(gr.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-gray-400" />
                    <span>{gr.vendor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="max-w-xs truncate">{gr.description}</p>
                  <p className="text-xs text-gray-500">{gr.items.length} items</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {gr.type === 'goods' ? (
                      <><Package className="h-3 w-3 mr-1" /> Goods</>
                    ) : (
                      <><FileText className="h-3 w-3 mr-1" /> Service</>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(gr.status)}</TableCell>
                <TableCell>
                  {gr.qualityChecked ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedGR(gr)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                          <span>{gr.type === 'goods' ? 'Goods' : 'Service'} Receipt - {gr.id}</span>
                          {getStatusBadge(gr.status)}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Receipt Info */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <p className="font-medium">{new Date(gr.date).toLocaleDateString('en-IN')}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Vendor:</span>
                            <p className="font-medium">{gr.vendor}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Received By:</span>
                            <p className="font-medium">{gr.receivedBy}</p>
                          </div>
                          {gr.poReference && (
                            <div>
                              <span className="text-gray-600">PO Reference:</span>
                              <p className="font-medium">{gr.poReference}</p>
                            </div>
                          )}
                          {gr.invoiceNo && (
                            <div>
                              <span className="text-gray-600">Invoice No:</span>
                              <p className="font-medium">{gr.invoiceNo}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Quality Check:</span>
                            <p className="font-medium">
                              {gr.qualityChecked ? (
                                <span className="text-green-600 flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" /> Passed
                                </span>
                              ) : (
                                <span className="text-yellow-600 flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> Pending
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <span className="text-sm text-gray-600">Description:</span>
                          <p className="text-sm">{gr.description}</p>
                        </div>

                        {/* Items */}
                        <div>
                          <h4 className="font-semibold mb-2">Items Received</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-center">Ordered</TableHead>
                                <TableHead className="text-center">Received</TableHead>
                                <TableHead className="text-center">Rejected</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {gr.items.map((item, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell className="text-center">{item.ordered}</TableCell>
                                  <TableCell className="text-center font-medium">{item.received}</TableCell>
                                  <TableCell className="text-center">
                                    {item.rejected > 0 ? (
                                      <span className="text-red-600">{item.rejected}</span>
                                    ) : '-'}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {getItemStatusBadge(item.status)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Actions */}
                        {gr.status === 'partial' && (
                          <div className="flex gap-2 pt-4">
                            <Button className="gap-2">
                              <Package className="h-4 w-4" /> Record Additional Receipt
                            </Button>
                          </div>
                        )}
                        {!gr.invoiceNo && gr.status === 'completed' && (
                          <div className="flex gap-2 pt-4">
                            <Button variant="outline" className="gap-2">
                              <FileText className="h-4 w-4" /> Link Invoice
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
