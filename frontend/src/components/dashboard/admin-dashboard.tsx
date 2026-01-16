'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Users,
  TrendingUp,
  AlertCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Home,
  Activity,
  CheckCircle2,
  Building2,
  Car,
  Package,
  Wrench,
  Calendar,
  MessageSquare,
  Bell,
  FileText,
  Send,
  Phone,
  Mail,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Clock,
  CreditCard,
  ClipboardList,
  UserCheck,
  TrendingDown,
  UserPlus,
  UserMinus,
  UserX,
  Shield,
  ClipboardCheck,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/lib/stores/auth-store'

// Income tracker data - matches IGATESECURITY design
const incomeData = [
  { name: 'Collected', value: 145867, color: '#3b82f6' },
  { name: 'Balance', value: 45867, color: '#ef4444' },
]

// Monthly revenue data
const monthlyData = [
  { month: 'Oct', amount: 123234 },
  { month: 'Nov', amount: 158982 },
  { month: 'Dec', amount: 154651 },
]

// Helpdesk tickets data - matches IGATESECURITY bar chart
const helpdeskData = [
  { month: 'Oct', open: 45, resolved: 38 },
  { month: 'Nov', open: 52, resolved: 48 },
  { month: 'Dec', open: 35, resolved: 42 },
  { month: 'Jan', open: 28, resolved: 22 },
]

// Expense data
const expenseData = [
  { month: 'Budget', amount: 250000 },
  { month: 'Expense', amount: 185000 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

// Quick action buttons
const quickActions = [
  { icon: Bell, label: 'Broadcast', description: 'App Notification', color: 'bg-blue-500', href: '/dashboard/residents/notices' },
  { icon: Send, label: 'Announcement', description: 'Post to residents', color: 'bg-purple-500', href: '/dashboard/residents/notices' },
  { icon: MessageSquare, label: 'Survey', description: 'Create questions', color: 'bg-green-500', href: '/dashboard/residents/events' },
]

// Amenities data
const amenities = [
  { name: 'Squash Court', status: true },
  { name: 'Fitness Center', status: true },
  { name: 'Swimming Pool', status: false },
  { name: 'Clubhouse', status: true },
]

const recentActivities = [
  {
    id: 1,
    type: 'payment',
    user: 'Rajesh Kumar',
    unit: 'A-205',
    action: 'Paid maintenance of Rs. 15,000',
    time: '5 min ago',
    status: 'success',
    avatar: 'RK',
  },
  {
    id: 2,
    type: 'visitor',
    user: 'Security',
    unit: 'B-102',
    action: 'Visitor checked in - Delivery (Amazon)',
    time: '12 min ago',
    status: 'info',
    avatar: 'SC',
  },
  {
    id: 3,
    type: 'complaint',
    user: 'Priya Sharma',
    unit: 'C-304',
    action: 'Reported water leakage - High Priority',
    time: '1 hour ago',
    status: 'warning',
    avatar: 'PS',
  },
  {
    id: 4,
    type: 'booking',
    user: 'Amit Patel',
    unit: 'D-501',
    action: 'Booked Clubhouse for Birthday Party',
    time: '2 hours ago',
    status: 'success',
    avatar: 'AP',
  },
]

// Community Overview Data
const communityOverview = {
  totalUnits: 450,
  occupiedUnits: 412,
  vacantUnits: 38,
  totalUsers: 1003,
  activeUsers: 856,
  inactiveUsers: 115,
  pendingApprovalUsers: 32,
  owners: 412,
  tenants: 444,
  neverLoggedIn: 147,
}

// Quick Stats Data
const quickStats = [
  {
    title: 'Pending Approvals',
    value: communityOverview.pendingApprovalUsers,
    icon: ClipboardCheck,
    bgColor: 'bg-orange-500',
    trend: '+5 today',
    trendUp: true,
  },
  {
    title: 'Open Complaints',
    value: 28,
    icon: AlertCircle,
    bgColor: 'bg-red-500',
    trend: '-3 from yesterday',
    trendUp: false,
  },
  {
    title: 'Defaulters',
    value: 8,
    icon: TrendingDown,
    bgColor: 'bg-pink-600',
    trend: '-2 this week',
    trendUp: false,
  },
  {
    title: "Today's Visitors",
    value: 42,
    icon: Shield,
    bgColor: 'bg-blue-600',
    trend: '+12 from yesterday',
    trendUp: true,
  },
]

// Financial Overview Data
const financialOverview = {
  totalMaintenance: 1245000, // Monthly maintenance
  maintenanceCollected: 1085000,
  maintenancePending: 160000,
  totalOutstanding: 195000,
  parkingIncome: 120000,
  amenityIncome: 85000,
  totalAssetValue: 10600000,
  monthlyAssetExpense: 280000,
  pendingVendorPayments: 45000,
  paidVendorPayments: 320000,
}

export function AdminDashboard() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0)

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  // Stats matching IGATESECURITY Community Manager design (page 12, 21, 22)
  const stats = [
    {
      title: 'Total Users',
      value: '1003',
      icon: Users,
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
    },
    {
      title: 'Awaiting Approvals',
      value: '32',
      icon: UserCheck,
      bgColor: 'bg-orange-400',
      textColor: 'text-white',
    },
    {
      title: 'Open Meetings',
      value: '03',
      icon: Calendar,
      bgColor: 'bg-emerald-500',
      textColor: 'text-white',
    },
    {
      title: 'Number of Defaulters',
      value: '02',
      icon: TrendingDown,
      bgColor: 'bg-pink-500',
      textColor: 'text-white',
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden"
    >
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="h-5 w-5" />
            {showSuccess}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Header - IGATESECURITY Style */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-4 ring-white/20">
              <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white text-xl font-bold">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-teal-300 text-sm">Welcome!</p>
              <h1 className="text-2xl sm:text-3xl font-bold">{user?.name || 'Admin'}</h1>
              <p className="text-white/70 text-sm">Sharlow Bay Community</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border-0">
              <span className="w-2 h-2 bg-teal-400 rounded-full mr-1.5 animate-pulse" />
              Online
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - IGATESECURITY Style Colored Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs sm:text-sm font-medium ${stat.textColor} opacity-90`}>{stat.title}</p>
                      <h3 className={`text-2xl sm:text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</h3>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.textColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Community Overview Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">Community Overview</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Live Data</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Units Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Units</p>
                    <p className="text-2xl font-bold text-gray-900">{communityOverview.totalUnits}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      Occupied
                    </span>
                    <span className="font-semibold text-green-600">{communityOverview.occupiedUnits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Home className="h-3.5 w-3.5 text-orange-500" />
                      Vacant
                    </span>
                    <span className="font-semibold text-orange-500">{communityOverview.vacantUnits}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-blue-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Occupancy Rate</span>
                      <span className="font-bold text-blue-700">
                        {((communityOverview.occupiedUnits / communityOverview.totalUnits) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Users Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{communityOverview.totalUsers}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5 text-green-600" />
                      Active
                    </span>
                    <span className="font-semibold text-green-600">{communityOverview.activeUsers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <UserMinus className="h-3.5 w-3.5 text-gray-500" />
                      Inactive
                    </span>
                    <span className="font-semibold text-gray-500">{communityOverview.inactiveUsers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      Pending
                    </span>
                    <span className="font-semibold text-orange-500">{communityOverview.pendingApprovalUsers}</span>
                  </div>
                </div>
              </div>

              {/* Owners vs Tenants Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Residents</p>
                    <p className="text-2xl font-bold text-gray-900">{communityOverview.owners + communityOverview.tenants}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Owners
                    </span>
                    <span className="font-semibold text-emerald-700">{communityOverview.owners}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <UserPlus className="h-3.5 w-3.5 text-blue-600" />
                      Tenants
                    </span>
                    <span className="font-semibold text-blue-600">{communityOverview.tenants}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Owner Ratio</span>
                      <span className="font-bold text-emerald-700">
                        {((communityOverview.owners / (communityOverview.owners + communityOverview.tenants)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Never Logged In Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-600 rounded-lg">
                    <UserX className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Never Logged In</p>
                    <p className="text-2xl font-bold text-gray-900">{communityOverview.neverLoggedIn}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">% of Total Users</span>
                    <span className="font-semibold text-amber-700">
                      {((communityOverview.neverLoggedIn / communityOverview.totalUsers) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-amber-300 text-amber-700 hover:bg-amber-200"
                      onClick={() => showNotification('Sending reminder emails...')}
                    >
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      Send Reminders
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Overview Section - NEW */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">Financial Overview</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">This Month</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Maintenance Collection */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Maintenance</p>
                    <p className="text-xl font-bold text-gray-900">Rs. {(financialOverview.totalMaintenance / 100000).toFixed(2)}L</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      Collected
                    </span>
                    <span className="font-semibold text-green-600">Rs. {(financialOverview.maintenanceCollected / 100000).toFixed(2)}L</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      Pending
                    </span>
                    <span className="font-semibold text-orange-500">Rs. {(financialOverview.maintenancePending / 100000).toFixed(2)}L</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-green-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Collection Rate</span>
                      <span className="font-bold text-green-700">
                        {((financialOverview.maintenanceCollected / financialOverview.totalMaintenance) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outstanding Amount */}
              <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-600 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Outstanding</p>
                    <p className="text-xl font-bold text-red-700">Rs. {(financialOverview.totalOutstanding / 100000).toFixed(2)}L</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Defaulters</span>
                    <span className="font-semibold text-red-600">5 units</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Late Fees</span>
                    <span className="font-semibold text-orange-600">Rs. 15.75K</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 border-red-300 text-red-700 hover:bg-red-100"
                    onClick={() => router.push('/dashboard/admin/defaulters')}
                  >
                    View Defaulters
                  </Button>
                </div>
              </div>

              {/* Parking & Amenity Income */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Other Income</p>
                    <p className="text-xl font-bold text-gray-900">Rs. {((financialOverview.parkingIncome + financialOverview.amenityIncome) / 100000).toFixed(2)}L</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Car className="h-3.5 w-3.5 text-blue-600" />
                      Parking
                    </span>
                    <span className="font-semibold text-blue-600">Rs. {(financialOverview.parkingIncome / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-purple-600" />
                      Amenity
                    </span>
                    <span className="font-semibold text-purple-600">Rs. {(financialOverview.amenityIncome / 1000).toFixed(0)}K</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 border-blue-300 text-blue-700 hover:bg-blue-100"
                    onClick={() => router.push('/dashboard/parking/payments')}
                  >
                    View Parking
                  </Button>
                </div>
              </div>

              {/* Assets & Vendor Payments */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Assets & Expenses</p>
                    <p className="text-xl font-bold text-gray-900">Rs. {(financialOverview.totalAssetValue / 10000000).toFixed(2)}Cr</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Wrench className="h-3.5 w-3.5 text-orange-500" />
                      Monthly Exp
                    </span>
                    <span className="font-semibold text-orange-600">Rs. {(financialOverview.monthlyAssetExpense / 100000).toFixed(2)}L</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <CreditCard className="h-3.5 w-3.5 text-red-500" />
                      Vendor Due
                    </span>
                    <span className="font-semibold text-red-600">Rs. {(financialOverview.pendingVendorPayments / 1000).toFixed(0)}K</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 border-purple-300 text-purple-700 hover:bg-purple-100"
                    onClick={() => router.push('/dashboard/accounting/vendor-payments')}
                  >
                    Pay Vendors
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Widgets */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className={`text-xs ${stat.trendUp ? 'text-green-600 border-green-200 bg-green-50' : 'text-blue-600 border-blue-200 bg-blue-50'}`}>
                      {stat.trendUp ? (
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      )}
                      {stat.trend}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Purchase Requests & Helpdesk Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Purchase Requests Card - IGATESECURITY Style */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Purchase Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Open</p>
                  <p className="text-3xl font-bold text-emerald-600">03</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Un-Finalized</p>
                  <p className="text-3xl font-bold text-orange-500">00</p>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => router.push('/dashboard/financial/invoices')}
              >
                View All Requests
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Helpdesk Tickets Card - IGATESECURITY Style with Bar Chart */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">Helpdesk Tickets</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-semibold">Open Tickets</span>
                    <span className="text-blue-600 font-bold">109</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-red-500 font-semibold">Escalated Tickets</span>
                    <span className="text-red-500 font-bold">12</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={helpdeskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="open" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Open" />
                  <Bar dataKey="resolved" fill="#ef4444" radius={[4, 4, 0, 0]} name="Escalated" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Income & Expense Trackers Row - IGATESECURITY Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Income Tracker with Donut Chart - IGATESECURITY Style */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">Income Tracker</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-gray-600">Balance</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-gray-600">Collected</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-gray-500">1 Nov 2022</p>
                    <p className="text-[10px] text-gray-400">to</p>
                    <p className="text-xs text-gray-500">1 Dec 2022</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-500">Balance Amount</p>
                    <p className="text-3xl font-bold text-emerald-600">Rs. 1,45,867</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {monthlyData.map((item, idx) => (
                      <div key={idx}>
                        <p className="text-xs text-gray-500">{item.month}</p>
                        <p className="text-sm font-semibold">Rs. {(item.amount / 1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => router.push('/dashboard/financial/billing')}
                    >
                      7 Paid Intimations
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => router.push('/dashboard/financial/billing')}
                    >
                      8 Defaulters
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expense Tracker - IGATESECURITY Style */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Expense Tracker</CardTitle>
              <CardDescription>Variance Amount</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800 mb-4">Rs. 2,321,213</p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={expenseData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" stroke="#6b7280" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
                  <YAxis type="category" dataKey="month" stroke="#6b7280" fontSize={12} width={60} />
                  <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ef4444" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Button
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => router.push('/dashboard/financial/invoices')}
              >
                24 Open Purchase Request
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Quick Actions - IGATESECURITY Style */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 hover:bg-gray-50"
                    onClick={() => router.push(action.href)}
                  >
                    <div className={`p-2 rounded-xl ${action.color} mr-3`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{action.label}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">Recent Activities</CardTitle>
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`text-xs font-semibold ${activity.status === 'success' ? 'bg-green-100 text-green-700' :
                        activity.status === 'warning' ? 'bg-orange-100 text-orange-700' :
                          activity.status === 'error' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-gray-100">{activity.unit}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Set Up Amenities - IGATESECURITY Style */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">Set Up Amenities</CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-700">{amenity.name}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${amenity.status ? 'bg-teal-500' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${amenity.status ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
