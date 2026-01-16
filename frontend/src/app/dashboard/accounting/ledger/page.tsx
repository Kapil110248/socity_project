'use client'

import { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Search,
  Filter,
  Download,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Plus,
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

const accountGroups = [
  {
    id: 1,
    name: 'Assets',
    type: 'Asset',
    balance: 2500000,
    trend: 'up',
    accounts: [
      { id: 11, name: 'Cash in Hand', code: '1001', balance: 150000, type: 'Debit' },
      { id: 12, name: 'Bank - HDFC', code: '1002', balance: 1200000, type: 'Debit' },
      { id: 13, name: 'Bank - ICICI', code: '1003', balance: 800000, type: 'Debit' },
      { id: 14, name: 'Fixed Deposits', code: '1004', balance: 350000, type: 'Debit' },
    ],
  },
  {
    id: 2,
    name: 'Liabilities',
    type: 'Liability',
    balance: 450000,
    trend: 'down',
    accounts: [
      { id: 21, name: 'Security Deposits', code: '2001', balance: 300000, type: 'Credit' },
      { id: 22, name: 'Advance from Residents', code: '2002', balance: 100000, type: 'Credit' },
      { id: 23, name: 'Pending Bills', code: '2003', balance: 50000, type: 'Credit' },
    ],
  },
  {
    id: 3,
    name: 'Income',
    type: 'Income',
    balance: 850000,
    trend: 'up',
    accounts: [
      { id: 31, name: 'Maintenance Charges', code: '3001', balance: 600000, type: 'Credit' },
      { id: 32, name: 'Parking Fees', code: '3002', balance: 120000, type: 'Credit' },
      { id: 33, name: 'Amenity Booking', code: '3003', balance: 80000, type: 'Credit' },
      { id: 34, name: 'Late Payment Fees', code: '3004', balance: 30000, type: 'Credit' },
      { id: 35, name: 'Interest Income', code: '3005', balance: 20000, type: 'Credit' },
    ],
  },
  {
    id: 4,
    name: 'Expenses',
    type: 'Expense',
    balance: 520000,
    trend: 'up',
    accounts: [
      { id: 41, name: 'Security Expenses', code: '4001', balance: 180000, type: 'Debit' },
      { id: 42, name: 'Housekeeping', code: '4002', balance: 120000, type: 'Debit' },
      { id: 43, name: 'Electricity Common', code: '4003', balance: 80000, type: 'Debit' },
      { id: 44, name: 'Repairs & Maintenance', code: '4004', balance: 75000, type: 'Debit' },
      { id: 45, name: 'Garden Maintenance', code: '4005', balance: 35000, type: 'Debit' },
      { id: 46, name: 'Administrative', code: '4006', balance: 30000, type: 'Debit' },
    ],
  },
]

export default function GeneralLedgerPage() {
  const [expandedGroups, setExpandedGroups] = useState<number[]>([1])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleGroup = (groupId: number) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            General Ledger
          </h1>
          <p className="text-gray-600 mt-1">Chart of Accounts and Balances</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {accountGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">{group.name}</p>
                {group.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-xl font-bold">{formatCurrency(group.balance)}</p>
              <p className="text-xs text-gray-500 mt-1">{group.accounts.length} accounts</p>
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
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="asset">Assets</SelectItem>
              <SelectItem value="liability">Liabilities</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="current">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current FY</SelectItem>
              <SelectItem value="previous">Previous FY</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Ledger Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12"></TableHead>
              <TableHead>Account Code</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Debit (₹)</TableHead>
              <TableHead className="text-right">Credit (₹)</TableHead>
              <TableHead className="text-right">Balance (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountGroups.map((group) => (
              <Fragment key={group.id}>
                <TableRow
                  key={group.id}
                  className="bg-blue-50 cursor-pointer hover:bg-blue-100"
                  onClick={() => toggleGroup(group.id)}
                >
                  <TableCell>
                    {expandedGroups.includes(group.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell className="font-bold">{group.id}000</TableCell>
                  <TableCell className="font-bold">{group.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{group.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {group.type === 'Asset' || group.type === 'Expense' ? formatCurrency(group.balance) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {group.type === 'Liability' || group.type === 'Income' ? formatCurrency(group.balance) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(group.balance)}</TableCell>
                </TableRow>
                {expandedGroups.includes(group.id) && group.accounts.map((account) => (
                  <TableRow key={account.id} className="hover:bg-gray-50">
                    <TableCell></TableCell>
                    <TableCell className="text-gray-600">{account.code}</TableCell>
                    <TableCell className="pl-8">{account.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{account.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {account.type === 'Debit' ? formatCurrency(account.balance) : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {account.type === 'Credit' ? formatCurrency(account.balance) : '-'}
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(account.balance)}</TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
