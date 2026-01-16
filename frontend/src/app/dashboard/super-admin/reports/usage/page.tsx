'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  Users,
  Smartphone,
  Globe,
  Download,
  Calendar,
  Clock,
  MousePointer,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

const dailyActiveUsers = [
  { date: 'Mon', users: 18500 },
  { date: 'Tue', users: 19200 },
  { date: 'Wed', users: 18800 },
  { date: 'Thu', users: 20100 },
  { date: 'Fri', users: 19500 },
  { date: 'Sat', users: 15200 },
  { date: 'Sun', users: 14800 },
]

const hourlyActivity = [
  { hour: '6AM', sessions: 450 },
  { hour: '8AM', sessions: 1200 },
  { hour: '10AM', sessions: 2100 },
  { hour: '12PM', sessions: 1800 },
  { hour: '2PM', sessions: 1650 },
  { hour: '4PM', sessions: 1900 },
  { hour: '6PM', sessions: 2400 },
  { hour: '8PM', sessions: 2800 },
  { hour: '10PM', sessions: 1500 },
]

const featureUsage = [
  { feature: 'Visitor Management', usage: 8500, percentage: 85 },
  { feature: 'Maintenance Payments', usage: 7200, percentage: 72 },
  { feature: 'Community Forum', usage: 4800, percentage: 48 },
  { feature: 'Helpdesk', usage: 3600, percentage: 36 },
  { feature: 'Amenity Booking', usage: 3200, percentage: 32 },
  { feature: 'Marketplace', usage: 2100, percentage: 21 },
]

const deviceBreakdown = [
  { device: 'Mobile App (Android)', percentage: 45, color: '#22c55e' },
  { device: 'Mobile App (iOS)', percentage: 30, color: '#3b82f6' },
  { device: 'Web Browser', percentage: 20, color: '#8b5cf6' },
  { device: 'Desktop App', percentage: 5, color: '#f59e0b' },
]

export default function UsageAnalyticsPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Usage Analytics</h1>
            <p className="text-gray-600">Platform usage patterns and insights</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7d">
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
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
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  +12%
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">19,234</p>
                <p className="text-sm text-gray-600">Daily Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  +8%
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">45,678</p>
                <p className="text-sm text-gray-600">Daily Sessions</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  +5%
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">8.5 min</p>
                <p className="text-sm text-gray-600">Avg Session Duration</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MousePointer className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  +3%
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">12.4</p>
                <p className="text-sm text-gray-600">Avg Actions/Session</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily Active Users */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Daily Active Users</CardTitle>
              <CardDescription>User activity over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={dailyActiveUsers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  <Area type="monotone" dataKey="users" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Peak Activity Hours</CardTitle>
              <CardDescription>Sessions by hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Feature Usage */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Most used platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureUsage.map((item) => (
                  <div key={item.feature} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.feature}</span>
                      <span className="text-sm text-gray-500">{item.usage.toLocaleString()} users</span>
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

          {/* Device Breakdown */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>How users access the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceBreakdown.map((item) => (
                  <div key={item.device} className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-sm">{item.device}</span>
                    </div>
                    <div className="flex items-center gap-3 w-48">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex-1">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <span className="text-sm font-medium w-10">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mobile Adoption Rate</p>
                    <p className="text-2xl font-bold">75%</p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-5 w-5 mr-1" />
                    <span className="font-medium">+5% this month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </RoleGuard>
  )
}
