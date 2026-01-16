'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Building2,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RoleGuard } from '@/components/auth/role-guard'

const stats = [
  {
    title: 'Total Revenue',
    value: '₹45,67,890',
    change: '+12.5%',
    trend: 'up',
    icon: CreditCard,
    color: 'bg-green-500',
  },
  {
    title: 'Active Societies',
    value: '156',
    change: '+8 this month',
    trend: 'up',
    icon: Building2,
    color: 'bg-blue-500',
  },
  {
    title: 'Total Users',
    value: '24,567',
    change: '+1,234',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    title: 'Avg. Engagement',
    value: '78%',
    change: '-2.3%',
    trend: 'down',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
]

const revenueByPlan = [
  { plan: 'Enterprise', revenue: '₹25,00,000', societies: 12, percentage: 55 },
  { plan: 'Professional', revenue: '₹15,00,000', societies: 45, percentage: 33 },
  { plan: 'Basic', revenue: '₹5,67,890', societies: 99, percentage: 12 },
]

const topSocieties = [
  { name: 'Green Valley Apartments', users: 1203, revenue: '₹4,50,000' },
  { name: 'Lake View Residency', users: 945, revenue: '₹3,80,000' },
  { name: 'Sunrise Heights', users: 856, revenue: '₹3,20,000' },
  { name: 'Royal Enclave', users: 780, revenue: '₹2,90,000' },
  { name: 'Silver Oaks Society', users: 512, revenue: '₹1,80,000' },
]

export default function PlatformReportsPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Platform Reports</h1>
            <p className="text-gray-600">Analytics and insights across all societies</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 ${stat.color} rounded-xl`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue by Plan */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByPlan.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.plan}</p>
                        <p className="text-sm text-gray-500">{item.societies} societies</p>
                      </div>
                      <p className="font-semibold">{item.revenue}</p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Societies */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Top Performing Societies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSocieties.map((society, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{society.name}</p>
                        <p className="text-sm text-gray-500">{society.users} users</p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">{society.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </RoleGuard>
  )
}
