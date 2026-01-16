'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Plus,
  Search,
  Download,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  CreditCard,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const bankAccounts = [
  {
    id: 1,
    name: 'HDFC Bank - Current Account',
    accountNo: 'XXXX XXXX 4521',
    ifsc: 'HDFC0001234',
    balance: 1200000,
    type: 'Current',
    lastSync: '2025-12-19 10:30 AM',
  },
  {
    id: 2,
    name: 'ICICI Bank - Savings Account',
    accountNo: 'XXXX XXXX 7823',
    ifsc: 'ICIC0005678',
    balance: 800000,
    type: 'Savings',
    lastSync: '2025-12-19 10:30 AM',
  },
  {
    id: 3,
    name: 'SBI - Fixed Deposit',
    accountNo: 'XXXX XXXX 1234',
    ifsc: 'SBIN0009876',
    balance: 350000,
    type: 'FD',
    lastSync: '2025-12-15 09:00 AM',
  },
]

const recentTransactions = [
  {
    id: 'TXN001',
    date: '2025-12-19',
    description: 'Maintenance Collection - Block A',
    type: 'credit',
    amount: 150000,
    bank: 'HDFC Bank',
    reference: 'NEFT/N123456789',
    status: 'completed',
  },
  {
    id: 'TXN002',
    date: '2025-12-18',
    description: 'Security Staff Salary',
    type: 'debit',
    amount: 45000,
    bank: 'HDFC Bank',
    reference: 'RTGS/R987654321',
    status: 'completed',
  },
  {
    id: 'TXN003',
    date: '2025-12-17',
    description: 'Electricity Bill Payment',
    type: 'debit',
    amount: 28000,
    bank: 'ICICI Bank',
    reference: 'IMPS/I456789123',
    status: 'completed',
  },
  {
    id: 'TXN004',
    date: '2025-12-16',
    description: 'Parking Fees Collection',
    type: 'credit',
    amount: 35000,
    bank: 'HDFC Bank',
    reference: 'UPI/123456789',
    status: 'completed',
  },
  {
    id: 'TXN005',
    date: '2025-12-16',
    description: 'Housekeeping Contractor Payment',
    type: 'debit',
    amount: 40000,
    bank: 'ICICI Bank',
    reference: 'NEFT/N789456123',
    status: 'pending',
  },
]

export default function BankManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBank, setSelectedBank] = useState('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-emerald-600" />
            Bank Management
          </h1>
          <p className="text-gray-600 mt-1">Manage bank accounts and transactions</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Sync All
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Bank
          </Button>
        </div>
      </div>

      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Total Bank Balance</p>
              <p className="text-3xl md:text-4xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
              <p className="text-emerald-100 text-sm mt-2">Across {bankAccounts.length} accounts</p>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-16 w-16 text-emerald-200 opacity-50" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Bank Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {bankAccounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <Badge variant="outline">{account.type}</Badge>
              </div>
              <h3 className="font-semibold text-gray-900">{account.name}</h3>
              <p className="text-sm text-gray-500">{account.accountNo}</p>
              <p className="text-2xl font-bold text-emerald-600 mt-3">
                {formatCurrency(account.balance)}
              </p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Last sync: {account.lastSync}
                </p>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <Eye className="h-3 w-3 mr-1" /> View
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Transactions Section */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="reconciliation">Bank Reconciliation</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            {/* Filters */}
            <div className="p-4 border-b">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Banks</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="sbi">SBI</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Transactions Table */}
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {new Date(txn.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {txn.type === 'credit' ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                        )}
                        <span>{txn.description}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{txn.bank}</TableCell>
                    <TableCell className="font-mono text-xs text-gray-500">{txn.reference}</TableCell>
                    <TableCell>
                      {txn.status === 'completed' ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" /> Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation">
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank Reconciliation</h3>
            <p className="text-gray-600 mb-4">Compare bank statements with your books to identify discrepancies</p>
            <Button>Start Reconciliation</Button>
          </Card>
        </TabsContent>

        <TabsContent value="statements">
          <Card className="p-8 text-center">
            <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank Statements</h3>
            <p className="text-gray-600 mb-4">Download and view historical bank statements</p>
            <Button>Download Statement</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
