'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RoleGuard } from '@/components/auth/role-guard'

const monthlyRevenue = [
  { month: 'Jan', revenue: 3200000, target: 3000000 },
  { month: 'Feb', revenue: 3350000, target: 3100000 },
  { month: 'Mar', revenue: 3600000, target: 3200000 },
  { month: 'Apr', revenue: 3450000, target: 3300000 },
  { month: 'May', revenue: 3800000, target: 3400000 },
  { month: 'Jun', revenue: 4000000, target: 3500000 },
  { month: 'Jul', revenue: 4150000, target: 3600000 },
  { month: 'Aug', revenue: 4300000, target: 3700000 },
  { month: 'Sep', revenue: 4450000, target: 3800000 },
  { month: 'Oct', revenue: 4200000, target: 3900000 },
  { month: 'Nov', revenue: 4400000, target: 4000000 },
  { month: 'Dec', revenue: 4567890, target: 4100000 },
]

const revenueByPlan = [
  { name: 'Enterprise', value: 2500000, color: '#8b5cf6' },
  { name: 'Professional', value: 1500000, color: '#3b82f6' },
  { name: 'Basic', value: 567890, color: '#6b7280' },
]

const topSocieties = [
  { name: 'Green Valley Apartments', revenue: '₹4,50,000', growth: '+12%' },
  { name: 'Lake View Residency', revenue: '₹3,80,000', growth: '+8%' },
  { name: 'Sunrise Heights', revenue: '₹3,20,000', growth: '+15%' },
  { name: 'Royal Enclave', revenue: '₹2,90,000', growth: '-3%' },
  { name: 'Silver Oaks Society', revenue: '₹1,80,000', growth: '+5%' },
]

export default function RevenueReportsPage() {
  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0)
  const avgMonthly = totalRevenue / 12

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
            <h1 className="text-2xl font-bold text-gray-900">Revenue Reports</h1>
            <p className="text-gray-600">Platform revenue analytics and insights</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="2024">
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Total Revenue (YTD)</p>
                  <p className="text-3xl font-bold">₹{(totalRevenue / 10000000).toFixed(1)}Cr</p>
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +18% vs last year
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-white/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Current MRR</p>
                  <p className="text-3xl font-bold">₹45.7L</p>
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +5% from last month
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-white/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Avg Revenue/Society</p>
                  <p className="text-3xl font-bold">₹29K</p>
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +3% from last month
                  </p>
                </div>
                <Building2 className="h-10 w-10 text-white/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Outstanding</p>
                  <p className="text-3xl font-bold">₹2.4L</p>
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
                    <ArrowDownRight className="h-3 w-3" />
                    -15% from last month
                  </p>
                </div>
                <TrendingDown className="h-10 w-10 text-white/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <Card className="border-0 shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue vs target</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `${v / 100000}L`} />
                  <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="target" stroke="#e5e7eb" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Plan */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
              <CardDescription>Distribution across plans</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={revenueByPlan}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {revenueByPlan.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {revenueByPlan.map((plan) => (
                  <div key={plan.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                    <span className="text-sm text-gray-600">{plan.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Societies */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Top Revenue Generating Societies</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSocieties.map((society, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{society.name}</p>
                      <p className="text-sm text-gray-500">Monthly Subscription</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{society.revenue}</p>
                    <p className={`text-sm ${society.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {society.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </RoleGuard>
  )
}
