'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  MoreHorizontal,
  CheckCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Printer,
  Share2,
  ChevronRight,
  Sparkles,
  Building2,
  Receipt,
  CreditCard,
  Banknote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const stats = [
  {
    title: 'Total Billed',
    value: '₹12,45,000',
    change: '+12% from last month',
    icon: Receipt,
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    title: 'Collected',
    value: '₹10,85,000',
    change: '87% collection rate',
    icon: Banknote,
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-100',
  },
  {
    title: 'Pending',
    value: '₹1,60,000',
    change: '24 invoices pending',
    icon: Clock,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-100',
  },
  {
    title: 'Overdue',
    value: '₹45,000',
    change: '8 invoices overdue',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-rose-500',
    bgGradient: 'from-red-50 to-rose-100',
  },
]

const invoices = [
  {
    id: 'INV-2025-001',
    unit: 'A-101',
    block: 'A',
    resident: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    amount: 15000,
    maintenance: 12000,
    utilities: 3000,
    penalty: 0,
    dueDate: '2025-01-05',
    status: 'paid',
    paidDate: '2025-01-03',
    paymentMode: 'UPI',
  },
  {
    id: 'INV-2025-002',
    unit: 'B-205',
    block: 'B',
    resident: 'Priya Sharma',
    phone: '+91 98765 43211',
    amount: 18500,
    maintenance: 12000,
    utilities: 5500,
    penalty: 1000,
    dueDate: '2025-01-05',
    status: 'paid',
    paidDate: '2025-01-04',
    paymentMode: 'Net Banking',
  },
  {
    id: 'INV-2025-003',
    unit: 'C-304',
    block: 'C',
    resident: 'Amit Patel',
    phone: '+91 98765 43212',
    amount: 16200,
    maintenance: 12000,
    utilities: 4200,
    penalty: 0,
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
    paymentMode: null,
  },
  {
    id: 'INV-2025-004',
    unit: 'A-502',
    block: 'A',
    resident: 'Neha Gupta',
    phone: '+91 98765 43213',
    amount: 24500,
    maintenance: 12000,
    utilities: 4500,
    penalty: 8000,
    dueDate: '2024-12-20',
    status: 'overdue',
    paidDate: null,
    paymentMode: null,
  },
  {
    id: 'INV-2025-005',
    unit: 'D-108',
    block: 'D',
    resident: 'Vikram Singh',
    phone: '+91 98765 43214',
    amount: 14500,
    maintenance: 12000,
    utilities: 2500,
    penalty: 0,
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
    paymentMode: null,
  },
  {
    id: 'INV-2025-006',
    unit: 'B-301',
    block: 'B',
    resident: 'Sunita Verma',
    phone: '+91 98765 43215',
    amount: 19000,
    maintenance: 12000,
    utilities: 7000,
    penalty: 0,
    dueDate: '2025-01-05',
    status: 'pending',
    paidDate: null,
    paymentMode: null,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

function SendWhatsAppButton({ invoice }: { invoice: typeof invoices[0] }) {
  const message = `Dear ${invoice.resident},

Your maintenance bill for ${invoice.unit} is ${invoice.status === 'overdue' ? 'OVERDUE' : 'due'}.

Invoice: ${invoice.id}
Amount: ₹${invoice.amount.toLocaleString()}
Due Date: ${invoice.dueDate}
${invoice.penalty > 0 ? `Penalty: ₹${invoice.penalty.toLocaleString()}` : ''}

Please pay at your earliest convenience to avoid additional penalties.

Thank you,
SocietyHub Management`

  const whatsappUrl = `https://wa.me/${invoice.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
      onClick={() => window.open(whatsappUrl, '_blank')}
      title="Send via WhatsApp"
    >
      <MessageSquare className="h-4 w-4" />
    </Button>
  )
}

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [blockFilter, setBlockFilter] = useState('all')
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [viewInvoice, setViewInvoice] = useState<typeof invoices[0] | null>(null)
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleGenerateBills = () => {
    setIsGenerateDialogOpen(false)
    showNotification('Bills generated and sent successfully!')
  }

  const handleExport = () => {
    showNotification('Data exported successfully!')
  }

  const handleBulkWhatsApp = () => {
    showNotification(`WhatsApp sent to ${selectedInvoices.length} residents!`)
  }

  const handleBulkEmail = () => {
    showNotification(`Email sent to ${selectedInvoices.length} residents!`)
  }

  const handleBulkDownload = () => {
    showNotification(`Downloading ${selectedInvoices.length} invoices as PDF...`)
  }

  const handleMarkAsPaid = (invoiceId: string) => {
    showNotification(`Invoice ${invoiceId} marked as paid!`)
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    const matchesBlock = blockFilter === 'all' || invoice.block === blockFilter
    return matchesSearch && matchesStatus && matchesBlock
  })

  const toggleSelect = (id: string) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([])
    } else {
      setSelectedInvoices(filteredInvoices.map(i => i.id))
    }
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-1"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a5f]">
                Billing Management
              </h1>
            </div>
            <p className="text-gray-500">
              Generate invoices, track payments, and send reminders
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport} className="text-xs sm:text-sm">
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25 text-xs sm:text-sm">
                  <Sparkles className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Generate Bills</span>
                  <span className="sm:hidden">Bills</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Generate Monthly Bills
                  </DialogTitle>
                  <DialogDescription>
                    Auto-generate and send invoices to all or selected units
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Billing Month</Label>
                      <Select defaultValue="jan-2025">
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jan-2025">January 2025</SelectItem>
                          <SelectItem value="dec-2024">December 2024</SelectItem>
                          <SelectItem value="nov-2024">November 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" defaultValue="2025-01-15" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bill Type</Label>
                      <Select defaultValue="both">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">Maintenance Only</SelectItem>
                          <SelectItem value="utility">Utility Only</SelectItem>
                          <SelectItem value="both">Maintenance + Utility</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Select Block</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select block" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Blocks</SelectItem>
                          <SelectItem value="A">Block A</SelectItem>
                          <SelectItem value="B">Block B</SelectItem>
                          <SelectItem value="C">Block C</SelectItem>
                          <SelectItem value="D">Block D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Apply Late Fee (After Due Date)</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Input type="number" placeholder="Amount" defaultValue="500" />
                      <Select defaultValue="fixed">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                          <SelectItem value="percent">Percentage</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">One Time</SelectItem>
                          <SelectItem value="monthly">Per Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="send-whatsapp" defaultChecked />
                    <Label htmlFor="send-whatsapp" className="text-sm">
                      Send invoice via WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-email" defaultChecked />
                    <Label htmlFor="send-email" className="text-sm">
                      Send invoice via Email
                    </Label>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Summary</p>
                        <p className="text-xs text-gray-500 mt-1">180 units × ₹12,000 avg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">₹21,60,000</p>
                        <p className="text-xs text-gray-500">Estimated Total</p>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>Cancel</Button>
                  <Button variant="outline" onClick={() => showNotification('Preview generated!')}>Preview Bills</Button>
                  <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white" onClick={handleGenerateBills}>
                    <Send className="h-4 w-4 mr-2" />
                    Generate & Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
                  <CardContent className="p-5 relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="invoices" className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="overflow-x-auto -mx-1 px-1">
                <TabsList className="bg-gray-100 w-max sm:w-auto">
                  <TabsTrigger value="invoices" className="text-xs sm:text-sm">All Invoices</TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
                  <TabsTrigger value="overdue" className="text-xs sm:text-sm">Overdue</TabsTrigger>
                </TabsList>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 w-full sm:w-48"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-24 sm:w-32 text-xs sm:text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={blockFilter} onValueChange={setBlockFilter}>
                  <SelectTrigger className="w-24 sm:w-32 text-xs sm:text-sm">
                    <SelectValue placeholder="Block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blocks</SelectItem>
                    <SelectItem value="A">Block A</SelectItem>
                    <SelectItem value="B">Block B</SelectItem>
                    <SelectItem value="C">Block C</SelectItem>
                    <SelectItem value="D">Block D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="invoices" className="space-y-4">
              {/* Bulk Actions */}
              {selectedInvoices.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-sm font-medium text-blue-700">
                    {selectedInvoices.length} selected
                  </span>
                  <div className="flex-1" />
                  <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={handleBulkWhatsApp}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    WhatsApp All
                  </Button>
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={handleBulkEmail}>
                    <Mail className="h-4 w-4 mr-1" />
                    Email All
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleBulkDownload}>
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </div>
              )}

              {/* Invoices Table */}
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                          onCheckedChange={selectAll}
                        />
                      </TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Unit / Resident</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedInvoices.includes(invoice.id)}
                            onCheckedChange={() => toggleSelect(invoice.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                              invoice.status === 'paid' ? 'bg-green-100' :
                              invoice.status === 'overdue' ? 'bg-red-100' : 'bg-orange-100'
                            }`}>
                              <Receipt className={`h-4 w-4 ${
                                invoice.status === 'paid' ? 'text-green-600' :
                                invoice.status === 'overdue' ? 'text-red-600' : 'text-orange-600'
                              }`} />
                            </div>
                            <span className="font-medium text-sm">{invoice.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{invoice.unit}</Badge>
                              <span className="font-medium text-sm">{invoice.resident}</span>
                            </div>
                            <span className="text-xs text-gray-500">{invoice.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <span className="font-bold">₹{invoice.amount.toLocaleString()}</span>
                            {invoice.penalty > 0 && (
                              <p className="text-xs text-red-500">+₹{invoice.penalty} penalty</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{invoice.dueDate}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              invoice.status === 'paid'
                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                : invoice.status === 'overdue'
                                ? 'bg-red-100 text-red-700 hover:bg-red-100'
                                : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                            }
                          >
                            {invoice.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {invoice.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {invoice.status === 'overdue' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setViewInvoice(invoice)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <SendWhatsAppButton invoice={invoice} />
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setViewInvoice(invoice)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = `mailto:${invoice.resident.toLowerCase().replace(' ', '.')}@email.com?subject=Invoice ${invoice.id}&body=Dear ${invoice.resident},%0D%0A%0D%0APlease find your invoice ${invoice.id} for amount ₹${invoice.amount.toLocaleString()}.%0D%0A%0D%0AThank you.`
                                }}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = `tel:${invoice.phone.replace(/[^0-9]/g, '')}`
                                }}>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call Resident
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                  window.print()
                                  showNotification(`Printing invoice ${invoice.id}...`)
                                }}>
                                  <Printer className="h-4 w-4 mr-2" />
                                  Print Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => showNotification(`Downloading PDF for invoice ${invoice.id}...`)}>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {invoice.status !== 'paid' && (
                                  <DropdownMenuItem className="text-green-600" onClick={() => handleMarkAsPaid(invoice.id)}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Paid
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card className="p-8 text-center border-0 shadow-md">
                <Clock className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Pending Invoices</h3>
                <p className="text-gray-500 mb-4">View and manage all pending invoices</p>
                <Button variant="outline">
                  View Pending <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="overdue">
              <Card className="p-8 text-center border-0 shadow-md">
                <AlertTriangle className="h-12 w-12 mx-auto text-red-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Overdue Invoices</h3>
                <p className="text-gray-500 mb-4">Take action on overdue payments</p>
                <Button variant="outline">
                  View Overdue <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Invoice Detail Dialog */}
        <Dialog open={!!viewInvoice} onOpenChange={() => setViewInvoice(null)}>
          <DialogContent className="max-w-lg">
            {viewInvoice && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Invoice {viewInvoice.id}</span>
                    <Badge
                      className={
                        viewInvoice.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : viewInvoice.status === 'overdue'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-orange-100 text-orange-700'
                      }
                    >
                      {viewInvoice.status}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {viewInvoice.resident.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{viewInvoice.resident}</p>
                        <p className="text-sm text-gray-500">Unit {viewInvoice.unit} • Block {viewInvoice.block}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{viewInvoice.phone}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">Maintenance Charges</span>
                      <span className="font-medium">₹{viewInvoice.maintenance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">Utility Charges</span>
                      <span className="font-medium">₹{viewInvoice.utilities.toLocaleString()}</span>
                    </div>
                    {viewInvoice.penalty > 0 && (
                      <div className="flex justify-between py-2 border-b text-red-600">
                        <span>Late Fee / Penalty</span>
                        <span className="font-medium">₹{viewInvoice.penalty.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₹{viewInvoice.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline" onClick={() => {
                      const message = `Invoice ${viewInvoice.id} - Amount: ₹${viewInvoice.amount.toLocaleString()}`
                      window.open(`https://wa.me/${viewInvoice.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank')
                      showNotification('WhatsApp opened!')
                    }}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button className="flex-1" variant="outline" onClick={() => showNotification(`Email sent to ${viewInvoice.resident}!`)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button className="flex-1" variant="outline" onClick={() => showNotification('PDF downloaded!')}>
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </RoleGuard>
  )
}
