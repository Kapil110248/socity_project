'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Phone,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Star,
  Home,
  UserCheck,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const helpers = [
  {
    id: 1,
    name: 'Sunita Devi',
    type: 'Maid',
    phone: '+91 98765 43210',
    units: ['A-101', 'A-102', 'A-103', 'A-104'],
    status: 'active',
    todayStatus: 'present',
    checkIn: '8:00 AM',
    checkOut: '-',
    rating: 4.5,
    verified: true,
    documents: true,
    workingDays: 'Mon-Sat',
  },
  {
    id: 2,
    name: 'Lakshmi',
    type: 'Cook',
    phone: '+91 98765 43211',
    units: ['B-201', 'B-202'],
    status: 'active',
    todayStatus: 'present',
    checkIn: '7:30 AM',
    checkOut: '-',
    rating: 4.8,
    verified: true,
    documents: true,
    workingDays: 'Mon-Sun',
  },
  {
    id: 3,
    name: 'Ramu',
    type: 'Driver',
    phone: '+91 98765 43212',
    units: ['C-301'],
    status: 'active',
    todayStatus: 'absent',
    checkIn: '-',
    checkOut: '-',
    rating: 4.2,
    verified: true,
    documents: false,
    workingDays: 'Mon-Sat',
  },
  {
    id: 4,
    name: 'Geeta',
    type: 'Maid',
    phone: '+91 98765 43213',
    units: ['D-401', 'D-402', 'D-403'],
    status: 'active',
    todayStatus: 'present',
    checkIn: '8:15 AM',
    checkOut: '-',
    rating: 4.0,
    verified: false,
    documents: false,
    workingDays: 'Mon-Fri',
  },
  {
    id: 5,
    name: 'Bablu',
    type: 'Helper',
    phone: '+91 98765 43214',
    units: ['A-205', 'B-105'],
    status: 'inactive',
    todayStatus: 'absent',
    checkIn: '-',
    checkOut: '-',
    rating: 3.5,
    verified: true,
    documents: true,
    workingDays: 'On Call',
  },
]

const stats = [
  { label: 'Total Helpers', value: '45', icon: Users, color: 'bg-blue-500' },
  { label: 'Present Today', value: '38', icon: CheckCircle, color: 'bg-green-500' },
  { label: 'Absent Today', value: '7', icon: XCircle, color: 'bg-red-500' },
  { label: 'Pending Verification', value: '5', icon: AlertTriangle, color: 'bg-yellow-500' },
]

export default function MaidsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8 text-purple-600" />
            Domestic Helpers Management
          </h1>
          <p className="text-gray-600 mt-1">Manage maids, cooks, drivers and other domestic staff</p>
        </div>
        <Button className="mt-4 md:mt-0 gap-2">
          <Plus className="h-4 w-4" />
          Register New Helper
        </Button>
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
              placeholder="Search helpers..."
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
              <SelectItem value="maid">Maid</SelectItem>
              <SelectItem value="cook">Cook</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="helper">Helper</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="present">Present Today</SelectItem>
              <SelectItem value="absent">Absent Today</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Helpers Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Helper</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Assigned Units</TableHead>
              <TableHead>Today's Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {helpers.map((helper) => (
              <TableRow key={helper.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {helper.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{helper.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {helper.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{helper.type}</Badge>
                  <p className="text-xs text-gray-500 mt-1">{helper.workingDays}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {helper.units.slice(0, 3).map((unit) => (
                      <Badge key={unit} variant="secondary" className="text-xs">
                        <Home className="h-3 w-3 mr-1" /> {unit}
                      </Badge>
                    ))}
                    {helper.units.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{helper.units.length - 3} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {helper.todayStatus === 'present' ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" /> Present
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" /> Absent
                      </Badge>
                    )}
                    {helper.checkIn !== '-' && (
                      <p className="text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        In: {helper.checkIn} {helper.checkOut !== '-' && `| Out: ${helper.checkOut}`}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{helper.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {helper.verified ? (
                      <Badge className="bg-green-100 text-green-800">
                        <UserCheck className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Unverified
                      </Badge>
                    )}
                    {helper.documents ? (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <FileText className="h-3 w-3" /> Docs Complete
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <FileText className="h-3 w-3" /> Docs Pending
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" /> Attendance History
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" /> View Reviews
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" /> Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" /> Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
