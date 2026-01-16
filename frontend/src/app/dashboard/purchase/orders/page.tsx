'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Printer,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  Package,
  Calendar,
  Building,
  FileText,
  Send,
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

const purchaseOrders = [
  {
    id: 'PO-2025-001',
    prReference: 'PR-2025-001',
    date: '2025-12-19',
    vendor: {
      name: 'Green Gardens Supplies',
      contact: '+91 98765 12345',
      email: 'sales@greengardens.com',
    },
    description: 'Garden maintenance tools and equipment',
    items: [
      { name: 'Garden Shears', qty: 5, unitPrice: 450, total: 2250 },
      { name: 'Lawn Mower', qty: 1, unitPrice: 14500, total: 14500 },
      { name: 'Fertilizer (50kg)', qty: 10, unitPrice: 750, total: 7500 },
    ],
    subtotal: 24250,
    gst: 4365,
    total: 28615,
    status: 'sent',
    deliveryDate: '2025-12-25',
    paymentTerms: 'Net 30',
  },
  {
    id: 'PO-2025-002',
    prReference: 'PR-2025-003',
    date: '2025-12-18',
    vendor: {
      name: 'CleanPro Solutions',
      contact: '+91 98765 67890',
      email: 'orders@cleanpro.in',
    },
    description: 'Monthly cleaning supplies',
    items: [
      { name: 'Floor Cleaner (5L)', qty: 20, unitPrice: 220, total: 4400 },
      { name: 'Mops', qty: 10, unitPrice: 140, total: 1400 },
      { name: 'Garbage Bags (Roll)', qty: 50, unitPrice: 70, total: 3500 },
    ],
    subtotal: 9300,
    gst: 1674,
    total: 10974,
    status: 'delivered',
    deliveryDate: '2025-12-19',
    paymentTerms: 'Immediate',
  },
  {
    id: 'PO-2025-003',
    prReference: null,
    date: '2025-12-17',
    vendor: {
      name: 'SecureTech Systems',
      contact: '+91 98765 11111',
      email: 'sales@securetech.com',
    },
    description: 'Annual maintenance contract - Fire safety equipment',
    items: [
      { name: 'Fire Extinguisher Service', qty: 20, unitPrice: 500, total: 10000 },
      { name: 'Smoke Detector Battery', qty: 50, unitPrice: 150, total: 7500 },
      { name: 'Fire Hose Inspection', qty: 10, unitPrice: 300, total: 3000 },
    ],
    subtotal: 20500,
    gst: 3690,
    total: 24190,
    status: 'partially_received',
    deliveryDate: '2025-12-20',
    paymentTerms: 'Net 15',
  },
  {
    id: 'PO-2025-004',
    prReference: null,
    date: '2025-12-15',
    vendor: {
      name: 'Office Essentials',
      contact: '+91 98765 22222',
      email: 'info@officeessentials.in',
    },
    description: 'Office stationery and supplies',
    items: [
      { name: 'Printer Paper (Ream)', qty: 50, unitPrice: 280, total: 14000 },
      { name: 'Ink Cartridge', qty: 10, unitPrice: 1200, total: 12000 },
      { name: 'File Folders', qty: 100, unitPrice: 25, total: 2500 },
    ],
    subtotal: 28500,
    gst: 5130,
    total: 33630,
    status: 'draft',
    deliveryDate: null,
    paymentTerms: 'Net 30',
  },
]

export default function PurchaseOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPO, setSelectedPO] = useState<typeof purchaseOrders[0] | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary"><Edit className="h-3 w-3 mr-1" /> Draft</Badge>
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800"><Send className="h-3 w-3 mr-1" /> Sent to Vendor</Badge>
      case 'confirmed':
        return <Badge className="bg-purple-100 text-purple-800"><CheckCircle className="h-3 w-3 mr-1" /> Confirmed</Badge>
      case 'partially_received':
        return <Badge className="bg-yellow-100 text-yellow-800"><Package className="h-3 w-3 mr-1" /> Partially Received</Badge>
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800"><Truck className="h-3 w-3 mr-1" /> Delivered</Badge>
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = [
    { label: 'Total Orders', value: purchaseOrders.length, icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Pending Delivery', value: purchaseOrders.filter(p => p.status === 'sent' || p.status === 'confirmed').length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Delivered', value: purchaseOrders.filter(p => p.status === 'delivered').length, icon: Truck, color: 'bg-green-500' },
    { label: 'Draft', value: purchaseOrders.filter(p => p.status === 'draft').length, icon: FileText, color: 'bg-gray-500' },
  ]

  const totalOrderValue = purchaseOrders.reduce((sum, po) => sum + po.total, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-purple-600" />
            Purchase Orders
          </h1>
          <p className="text-gray-600 mt-1">Manage vendor orders and deliveries</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Order
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

      {/* Total Value Card */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">Total Order Value (This Month)</p>
            <p className="text-2xl md:text-3xl font-bold mt-1">{formatCurrency(totalOrderValue)}</p>
          </div>
          <ShoppingCart className="h-12 w-12 text-purple-200 opacity-50" />
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
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
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
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
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Purchase Orders Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>PO Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total (₹)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((po) => (
              <TableRow key={po.id} className="hover:bg-gray-50">
                <TableCell>
                  <p className="font-mono font-medium">{po.id}</p>
                  {po.prReference && (
                    <p className="text-xs text-gray-500">Ref: {po.prReference}</p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(po.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-gray-400" />
                    <span className="font-medium">{po.vendor.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="max-w-xs truncate">{po.description}</p>
                  <p className="text-xs text-gray-500">{po.items.length} items</p>
                </TableCell>
                <TableCell>{getStatusBadge(po.status)}</TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(po.total)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPO(po)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center justify-between">
                            <span>Purchase Order - {po.id}</span>
                            {getStatusBadge(po.status)}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Vendor Info */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Vendor Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Name:</span>
                                <p className="font-medium">{po.vendor.name}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Contact:</span>
                                <p>{po.vendor.contact}</p>
                              </div>
                              <div className="col-span-2">
                                <span className="text-gray-600">Email:</span>
                                <p>{po.vendor.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Order Info */}
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Order Date:</span>
                              <p className="font-medium">{new Date(po.date).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Delivery Date:</span>
                              <p className="font-medium">{po.deliveryDate ? new Date(po.deliveryDate).toLocaleDateString('en-IN') : 'TBD'}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Payment Terms:</span>
                              <p className="font-medium">{po.paymentTerms}</p>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <h4 className="font-semibold mb-2">Order Items</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-center">Qty</TableHead>
                                  <TableHead className="text-right">Unit Price</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {po.items.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-center">{item.qty}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                                  <TableCell className="text-right">{formatCurrency(po.subtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={3} className="text-right font-medium">GST (18%)</TableCell>
                                  <TableCell className="text-right">{formatCurrency(po.gst)}</TableCell>
                                </TableRow>
                                <TableRow className="font-bold bg-gray-50">
                                  <TableCell colSpan={3} className="text-right">Grand Total</TableCell>
                                  <TableCell className="text-right text-lg">{formatCurrency(po.total)}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-4">
                            <Button variant="outline" className="gap-2">
                              <Printer className="h-4 w-4" /> Print
                            </Button>
                            {po.status === 'draft' && (
                              <Button className="gap-2">
                                <Send className="h-4 w-4" /> Send to Vendor
                              </Button>
                            )}
                            {(po.status === 'sent' || po.status === 'confirmed') && (
                              <Button className="gap-2">
                                <Package className="h-4 w-4" /> Record Receipt
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
                    </Button>
                    {po.status === 'draft' && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
