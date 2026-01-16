'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Scale,
  Download,
  Calendar,
  Filter,
  Printer,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

const trialBalanceData = [
  { code: '1001', name: 'Cash in Hand', debit: 150000, credit: 0 },
  { code: '1002', name: 'Bank - HDFC', debit: 1200000, credit: 0 },
  { code: '1003', name: 'Bank - ICICI', debit: 800000, credit: 0 },
  { code: '1004', name: 'Fixed Deposits', debit: 350000, credit: 0 },
  { code: '2001', name: 'Security Deposits', debit: 0, credit: 300000 },
  { code: '2002', name: 'Advance from Residents', debit: 0, credit: 100000 },
  { code: '2003', name: 'Pending Bills', debit: 0, credit: 50000 },
  { code: '3001', name: 'Maintenance Charges', debit: 0, credit: 600000 },
  { code: '3002', name: 'Parking Fees', debit: 0, credit: 120000 },
  { code: '3003', name: 'Amenity Booking', debit: 0, credit: 80000 },
  { code: '3004', name: 'Late Payment Fees', debit: 0, credit: 30000 },
  { code: '3005', name: 'Interest Income', debit: 0, credit: 20000 },
  { code: '4001', name: 'Security Expenses', debit: 180000, credit: 0 },
  { code: '4002', name: 'Housekeeping', debit: 120000, credit: 0 },
  { code: '4003', name: 'Electricity Common', debit: 80000, credit: 0 },
  { code: '4004', name: 'Repairs & Maintenance', debit: 75000, credit: 0 },
  { code: '4005', name: 'Garden Maintenance', debit: 35000, credit: 0 },
  { code: '4006', name: 'Administrative', debit: 30000, credit: 0 },
  { code: '5001', name: 'Capital Fund', debit: 0, credit: 1720000 },
]

export default function TrialBalancePage() {
  const [period, setPeriod] = useState('current')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalDebit = trialBalanceData.reduce((sum, item) => sum + item.debit, 0)
  const totalCredit = trialBalanceData.reduce((sum, item) => sum + item.credit, 0)
  const isBalanced = totalDebit === totalCredit

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Scale className="h-8 w-8 text-indigo-600" />
            Trial Balance
          </h1>
          <p className="text-gray-600 mt-1">Verify debit and credit balances</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Balance Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={`p-6 mb-6 ${isBalanced ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isBalanced ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <AlertTriangle className="h-10 w-10 text-red-600" />
              )}
              <div>
                <h2 className={`text-xl font-bold ${isBalanced ? 'text-green-800' : 'text-red-800'}`}>
                  {isBalanced ? 'Trial Balance is Balanced' : 'Trial Balance is Not Balanced'}
                </h2>
                <p className={`text-sm ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                  {isBalanced
                    ? 'All debits equal credits - books are in order'
                    : `Difference of ${formatCurrency(Math.abs(totalDebit - totalCredit))}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">As of Date</p>
              <p className="font-semibold">December 19, 2025</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gray-600">Total Debits</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalDebit)}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-600">Total Credits</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCredit)}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Scale className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-gray-600">Difference</span>
            </div>
            <p className={`text-2xl font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(totalDebit - totalCredit))}
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Period:</span>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current FY (2025-26)</SelectItem>
              <SelectItem value="previous">Previous FY (2024-25)</SelectItem>
              <SelectItem value="q1">Q1 (Apr-Jun 2025)</SelectItem>
              <SelectItem value="q2">Q2 (Jul-Sep 2025)</SelectItem>
              <SelectItem value="q3">Q3 (Oct-Dec 2025)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1" />
          <Badge variant="outline" className="text-xs">
            {trialBalanceData.length} Accounts
          </Badge>
        </div>
      </Card>

      {/* Trial Balance Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Account Code</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead className="text-right">Debit (₹)</TableHead>
              <TableHead className="text-right">Credit (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trialBalanceData.map((item, index) => (
              <TableRow key={item.code} className="hover:bg-gray-50">
                <TableCell className="font-mono">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                </TableCell>
                <TableCell className="text-right">
                  {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                </TableCell>
              </TableRow>
            ))}
            {/* Totals Row */}
            <TableRow className="bg-gray-100 font-bold">
              <TableCell colSpan={2} className="text-right">
                TOTAL
              </TableCell>
              <TableCell className="text-right text-blue-600">
                {formatCurrency(totalDebit)}
              </TableCell>
              <TableCell className="text-right text-green-600">
                {formatCurrency(totalCredit)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
