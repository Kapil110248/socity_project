'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Package,
  Car,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  UserX,
  Bell,
  Shield,
  Camera,
  Phone,
  QrCode,
  LogIn,
  LogOut,
  Search,
  FileText,
  Upload,
  Printer,
  Filter,
  X,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

const stats = [
  { label: 'Visitors Today', value: '24', icon: Users, color: 'bg-blue-500', change: '+5' },
  { label: 'Pending Approvals', value: '8', icon: Clock, color: 'bg-yellow-500', change: '3 urgent' },
  { label: 'Parcels to Deliver', value: '12', icon: Package, color: 'bg-purple-500', change: '2 new' },
  { label: 'Vehicles In', value: '156', icon: Car, color: 'bg-green-500', change: 'of 200' },
]

const allVisitors = [
  { id: 1, name: 'Rahul Sharma', visiting: 'A-205', purpose: 'Guest', time: '2 min ago', phone: '+91 98765 43210', status: 'pending' },
  { id: 2, name: 'Delivery - Amazon', visiting: 'B-102', purpose: 'Parcel', time: '5 min ago', phone: '+91 98765 43211', status: 'pending' },
  { id: 3, name: 'Plumber - Raj', visiting: 'C-301', purpose: 'Service', time: '10 min ago', phone: '+91 98765 43212', status: 'pending' },
  { id: 4, name: 'Priya Reddy', visiting: 'D-104', purpose: 'Guest', time: '15 min ago', phone: '+91 98765 43213', status: 'approved' },
  { id: 5, name: 'Carpenter - Mohan', visiting: 'A-305', purpose: 'Service', time: '20 min ago', phone: '+91 98765 43214', status: 'approved' },
  { id: 6, name: 'Unknown Person', visiting: 'B-201', purpose: 'Guest', time: '25 min ago', phone: '+91 98765 43215', status: 'rejected' },
]

const expectedVisitors = [
  { id: 1, name: 'Sameer Khan', visiting: 'A-101', purpose: 'Guest', expectedTime: '2:00 PM', phone: '+91 98765 43216', approvedBy: 'Mr. Verma' },
  { id: 2, name: 'Electrician - Suresh', visiting: 'C-202', purpose: 'Service', expectedTime: '3:30 PM', phone: '+91 98765 43217', approvedBy: 'Mrs. Patel' },
  { id: 3, name: 'Dr. Mehta', visiting: 'B-305', purpose: 'Guest', expectedTime: '4:00 PM', phone: '+91 98765 43218', approvedBy: 'Mr. Singh' },
]

const recentActivity = [
  { id: 1, action: 'Visitor Approved', unit: 'A-205', name: 'Amit Kumar', time: '10:30 AM', status: 'approved' },
  { id: 2, action: 'Parcel Delivered', unit: 'B-102', name: 'Flipkart Package', time: '10:15 AM', status: 'delivered' },
  { id: 3, action: 'Visitor Rejected', unit: 'D-401', name: 'Unknown', time: '10:00 AM', status: 'rejected' },
  { id: 4, action: 'Helper Check-in', unit: 'A-101', name: 'Maid - Sunita', time: '9:45 AM', status: 'checkin' },
  { id: 5, action: 'Vehicle Exit', unit: 'C-205', name: 'MH 02 AB 1234', time: '9:30 AM', status: 'exit' },
]

const helpers = [
  { id: 1, name: 'Sunita Devi', type: 'Maid', units: ['A-101', 'A-102', 'A-103'], status: 'present', checkIn: '9:00 AM', checkOut: '-' },
  { id: 2, name: 'Ramu', type: 'Driver', units: ['B-201'], status: 'present', checkIn: '8:30 AM', checkOut: '-' },
  { id: 3, name: 'Lakshmi', type: 'Cook', units: ['C-301', 'C-302'], status: 'absent', checkIn: '-', checkOut: '-' },
  { id: 4, name: 'Ganesh', type: 'Gardener', units: ['Common Area'], status: 'present', checkIn: '7:00 AM', checkOut: '-' },
  { id: 5, name: 'Rita', type: 'Maid', units: ['D-101', 'D-102'], status: 'checked-out', checkIn: '9:00 AM', checkOut: '1:00 PM' },
  { id: 6, name: 'Vijay', type: 'Driver', units: ['A-205'], status: 'present', checkIn: '10:00 AM', checkOut: '-' },
]

export default function GuardDashboardPage() {
  const [visitorSearch, setVisitorSearch] = useState('')
  const [helperSearch, setHelperSearch] = useState('')
  const [showIncidentDialog, setShowIncidentDialog] = useState(false)
  const [incidentPhoto, setIncidentPhoto] = useState<File | null>(null)
  const [incidentSeverity, setIncidentSeverity] = useState('')
  const [incidentDescription, setIncidentDescription] = useState('')
  const [incidentAssignee, setIncidentAssignee] = useState('')

  const pendingVisitors = allVisitors.filter(v => v.status === 'pending')
  const filteredAllVisitors = allVisitors.filter(v =>
    v.name.toLowerCase().includes(visitorSearch.toLowerCase()) ||
    v.visiting.toLowerCase().includes(visitorSearch.toLowerCase())
  )
  const filteredExpectedVisitors = expectedVisitors.filter(v =>
    v.name.toLowerCase().includes(visitorSearch.toLowerCase()) ||
    v.visiting.toLowerCase().includes(visitorSearch.toLowerCase())
  )
  const filteredHelpers = helpers.filter(h =>
    h.name.toLowerCase().includes(helperSearch.toLowerCase()) ||
    h.units.some(u => u.toLowerCase().includes(helperSearch.toLowerCase())) ||
    h.type.toLowerCase().includes(helperSearch.toLowerCase())
  )

  const handleIncidentSubmit = () => {
    console.log('Incident Report:', {
      photo: incidentPhoto,
      severity: incidentSeverity,
      description: incidentDescription,
      assignee: incidentAssignee
    })
    setShowIncidentDialog(false)
    setIncidentPhoto(null)
    setIncidentSeverity('')
    setIncidentDescription('')
    setIncidentAssignee('')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            Guard Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Main Gate - Shift: Morning (6 AM - 2 PM)</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <QrCode className="h-4 w-4" />
            Scan QR
          </Button>
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <AlertTriangle className="h-4 w-4" />
            Emergency
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
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary">{stat.change}</Badge>
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Visitor Management with Tabs */}
        <Card className="lg:col-span-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              Visitor Management
            </h2>
            <Badge variant="destructive">{pendingVisitors.length} Pending</Badge>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search visitors by name or unit..."
              value={visitorSearch}
              onChange={(e) => setVisitorSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                <Clock className="h-4 w-4 mr-2" />
                Pending
              </TabsTrigger>
              <TabsTrigger value="all">
                <Users className="h-4 w-4 mr-2" />
                All Visitors
              </TabsTrigger>
              <TabsTrigger value="expected">
                <CheckCircle className="h-4 w-4 mr-2" />
                Expected
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3 mt-4">
              {filteredAllVisitors.filter(v => v.status === 'pending').length === 0 ? (
                <p className="text-center text-gray-500 py-4">No pending visitors</p>
              ) : (
                filteredAllVisitors.filter(v => v.status === 'pending').map((visitor) => (
                  <motion.div
                    key={visitor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-yellow-200">{visitor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{visitor.name}</p>
                        <p className="text-sm text-gray-600">
                          Unit: {visitor.visiting} • {visitor.purpose}
                        </p>
                        <p className="text-xs text-gray-500">{visitor.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-red-600 border-red-200">
                        <UserX className="h-3 w-3" />
                        Reject
                      </Button>
                      <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                        <UserCheck className="h-3 w-3" />
                        Approve
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-3 mt-4">
              {filteredAllVisitors.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No visitors found</p>
              ) : (
                filteredAllVisitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{visitor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{visitor.name}</p>
                        <p className="text-sm text-gray-600">
                          Unit: {visitor.visiting} • {visitor.purpose}
                        </p>
                        <p className="text-xs text-gray-500">{visitor.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      {getStatusBadge(visitor.status)}
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="expected" className="space-y-3 mt-4">
              {filteredExpectedVisitors.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No expected visitors</p>
              ) : (
                filteredExpectedVisitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-green-200">{visitor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{visitor.name}</p>
                        <p className="text-sm text-gray-600">
                          Unit: {visitor.visiting} • {visitor.purpose}
                        </p>
                        <p className="text-xs text-gray-500">
                          Expected: {visitor.expectedTime} • Approved by: {visitor.approvedBy}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                      <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                        <UserCheck className="h-3 w-3" />
                        Check In
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <LogIn className="h-6 w-6 text-green-600" />
              <span className="text-xs">Check In</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <LogOut className="h-6 w-6 text-red-600" />
              <span className="text-xs">Check Out</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-6 w-6 text-purple-600" />
              <span className="text-xs">Log Parcel</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Camera className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Take Photo</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Car className="h-6 w-6 text-orange-600" />
              <span className="text-xs">Vehicle Entry</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => setShowIncidentDialog(true)}
            >
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="text-xs">Report Incident</span>
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Activity */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-100' :
                    activity.status === 'rejected' ? 'bg-red-100' :
                    activity.status === 'delivered' ? 'bg-purple-100' :
                    activity.status === 'checkin' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {activity.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.status === 'rejected' && <UserX className="h-4 w-4 text-red-600" />}
                    {activity.status === 'delivered' && <Package className="h-4 w-4 text-purple-600" />}
                    {activity.status === 'checkin' && <LogIn className="h-4 w-4 text-blue-600" />}
                    {activity.status === 'exit' && <LogOut className="h-4 w-4 text-gray-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.name} • {activity.unit}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Enhanced Helper Attendance */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Helper Attendance</h2>
            <Button size="sm" variant="outline" className="gap-1">
              <Printer className="h-3 w-3" />
              Gate Pass
            </Button>
          </div>

          {/* Helper Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or unit..."
              value={helperSearch}
              onChange={(e) => setHelperSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {filteredHelpers.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No helpers found</p>
            ) : (
              filteredHelpers.map((helper) => (
                <div key={helper.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{helper.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{helper.name}</p>
                        <p className="text-xs text-gray-600">{helper.type}</p>
                      </div>
                    </div>
                    <Badge variant={
                      helper.status === 'present' ? 'default' :
                      helper.status === 'checked-out' ? 'secondary' : 'outline'
                    }>
                      {helper.status === 'present' ? 'Present' :
                       helper.status === 'checked-out' ? 'Checked Out' : 'Absent'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Units: {helper.units.join(', ')}</p>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <LogIn className="h-3 w-3 text-green-600" />
                        Check-in: {helper.checkIn}
                      </span>
                      <span className="flex items-center gap-1">
                        <LogOut className="h-3 w-3 text-red-600" />
                        Check-out: {helper.checkOut}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Enhanced Incident Report Dialog */}
      <Dialog open={showIncidentDialog} onOpenChange={setShowIncidentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Report Incident
            </DialogTitle>
            <DialogDescription>
              Provide detailed information about the incident
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Severity Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level</Label>
              <Select value={incidentSeverity} onValueChange={setIncidentSeverity}>
                <SelectTrigger id="severity" className="w-full">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Low
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      High
                    </span>
                  </SelectItem>
                  <SelectItem value="critical">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Critical
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Upload Photo (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIncidentPhoto(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                {incidentPhoto && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIncidentPhoto(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {incidentPhoto && (
                <p className="text-xs text-gray-600">Selected: {incidentPhoto.name}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the incident in detail..."
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Assignee Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="assignee">Assign To</Label>
              <Select value={incidentAssignee} onValueChange={setIncidentAssignee}>
                <SelectTrigger id="assignee" className="w-full">
                  <SelectValue placeholder="Select person to assign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security-head">Security Head</SelectItem>
                  <SelectItem value="facility-manager">Facility Manager</SelectItem>
                  <SelectItem value="maintenance">Maintenance Team</SelectItem>
                  <SelectItem value="admin">Admin Office</SelectItem>
                  <SelectItem value="emergency">Emergency Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowIncidentDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleIncidentSubmit}
              disabled={!incidentSeverity || !incidentDescription || !incidentAssignee}
              className="bg-red-600 hover:bg-red-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
