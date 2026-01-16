'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import {
  Calendar,
  Clock,
  IndianRupee,
  Users,
  MapPin,
  Plus,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Dumbbell,
  Waves,
  PartyPopper,
  Volleyball,
  Utensils,
  Building,
  ArrowUpRight,
  Eye,
  MoreHorizontal,
  CalendarCheck,
  AlertCircle,
  Settings,
  History,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const amenityIcons: Record<string, React.ElementType> = {
  hall: PartyPopper,
  pool: Waves,
  gym: Dumbbell,
  court: Volleyball,
  dining: Utensils,
  other: Building,
}

const amenityColors: Record<string, { bg: string; text: string; gradient: string }> = {
  hall: { bg: 'bg-pink-100', text: 'text-pink-700', gradient: 'from-pink-500 to-rose-600' },
  pool: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-cyan-600' },
  gym: { bg: 'bg-orange-100', text: 'text-orange-700', gradient: 'from-orange-500 to-amber-600' },
  court: { bg: 'bg-green-100', text: 'text-green-700', gradient: 'from-green-500 to-emerald-600' },
  dining: { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-violet-600' },
  other: { bg: 'bg-gray-100', text: 'text-gray-700', gradient: 'from-gray-500 to-slate-600' },
}

const amenities = [
  {
    id: '1',
    name: 'Clubhouse',
    type: 'hall',
    capacity: 100,
    pricePerHour: 500,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timings: { start: '09:00', end: '22:00' },
    status: 'available',
    description: 'Perfect for parties, meetings, and social gatherings. AC with sound system.',
    rating: 4.5,
    bookingsToday: 2,
  },
  {
    id: '2',
    name: 'Swimming Pool',
    type: 'pool',
    capacity: 50,
    pricePerHour: 0,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timings: { start: '06:00', end: '20:00' },
    status: 'available',
    description: 'Olympic size swimming pool with separate kids area and trained lifeguard.',
    rating: 4.8,
    bookingsToday: 15,
  },
  {
    id: '3',
    name: 'Gym & Fitness',
    type: 'gym',
    capacity: 30,
    pricePerHour: 0,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timings: { start: '05:00', end: '23:00' },
    status: 'available',
    description: 'Fully equipped modern gym with cardio, weights, and certified trainer.',
    rating: 4.6,
    bookingsToday: 28,
  },
  {
    id: '4',
    name: 'Badminton Court',
    type: 'court',
    capacity: 4,
    pricePerHour: 200,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timings: { start: '06:00', end: '22:00' },
    status: 'available',
    description: 'Indoor court with professional synthetic flooring and lighting.',
    rating: 4.3,
    bookingsToday: 8,
  },
  {
    id: '5',
    name: 'Tennis Court',
    type: 'court',
    capacity: 4,
    pricePerHour: 300,
    availableDays: ['Sat', 'Sun'],
    timings: { start: '07:00', end: '19:00' },
    status: 'maintenance',
    description: 'Outdoor tennis court with floodlights for evening play.',
    rating: 4.2,
    bookingsToday: 0,
  },
  {
    id: '6',
    name: 'Party Hall',
    type: 'hall',
    capacity: 150,
    pricePerHour: 800,
    availableDays: ['Fri', 'Sat', 'Sun'],
    timings: { start: '18:00', end: '01:00' },
    status: 'available',
    description: 'Grand hall with AC, DJ setup, catering kitchen, and outdoor deck.',
    rating: 4.9,
    bookingsToday: 1,
  },
]

const upcomingBookings = [
  {
    id: '1',
    amenity: 'Clubhouse',
    amenityType: 'hall',
    date: '2025-01-15',
    startTime: '18:00',
    endTime: '22:00',
    status: 'confirmed',
    amount: 2000,
    purpose: 'Birthday Party',
  },
  {
    id: '2',
    amenity: 'Badminton Court',
    amenityType: 'court',
    date: '2025-01-10',
    startTime: '17:00',
    endTime: '18:00',
    status: 'confirmed',
    amount: 200,
    purpose: 'Sports',
  },
]

const pastBookings = [
  {
    id: '3',
    amenity: 'Party Hall',
    amenityType: 'hall',
    date: '2024-12-25',
    startTime: '19:00',
    endTime: '23:00',
    status: 'completed',
    amount: 3200,
    purpose: 'Christmas Party',
  },
]

function BookingDialog({ amenity, onBookingComplete }: { amenity: typeof amenities[0], onBookingComplete?: (message: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const calculateTotal = () => {
    if (!startTime || !endTime) return 0
    const start = parseInt(startTime.split(':')[0])
    const end = parseInt(endTime.split(':')[0])
    const hours = end - start
    return amenity.pricePerHour * hours
  }

  const handleConfirmBooking = () => {
    setIsOpen(false)
    onBookingComplete?.(`${amenity.name} booked successfully!`)
    // Reset form
    setSelectedDate('')
    setStartTime('')
    setEndTime('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-blue-700 hover:to-purple-700 gap-2"
          disabled={amenity.status !== 'available'}
        >
          {amenity.status === 'available' ? (
            <>
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              Under Maintenance
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-blue-600" />
            Book {amenity.name}
          </DialogTitle>
          <DialogDescription>
            Select date and time for your booking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${amenityColors[amenity.type].bg}`}>
                {(() => {
                  const Icon = amenityIcons[amenity.type]
                  return <Icon className={`h-5 w-5 ${amenityColors[amenity.type].text}`} />
                })()}
              </div>
              <div>
                <p className="font-medium">{amenity.name}</p>
                <p className="text-sm text-muted-foreground">
                  {amenity.pricePerHour === 0 ? 'Free' : `Rs. ${amenity.pricePerHour}/hr`}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date *</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Available: {amenity.availableDays.join(', ')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time *</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => i + 6).map((hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                      {hour.toString().padStart(2, '0')}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>End Time *</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => i + 7).map((hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                      {hour.toString().padStart(2, '0')}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Purpose *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="party">Birthday/Anniversary Party</SelectItem>
                <SelectItem value="meeting">Meeting/Gathering</SelectItem>
                <SelectItem value="sports">Sports Activity</SelectItem>
                <SelectItem value="fitness">Fitness/Yoga</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Summary */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">
                {startTime && endTime
                  ? `${parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])} hours`
                  : '-'
                }
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="font-medium">
                {amenity.pricePerHour === 0 ? 'Free' : `Rs. ${amenity.pricePerHour}/hr`}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-blue-200">
              <span className="font-semibold">Total Amount</span>
              <span className="text-xl font-bold text-blue-600">
                {amenity.pricePerHour === 0 ? 'Free' : `Rs. ${calculateTotal()}`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-blue-700 hover:to-purple-700 gap-2" onClick={handleConfirmBooking}>
              <CheckCircle className="h-4 w-4" />
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AmenitiesPage() {
  const [activeTab, setActiveTab] = useState('amenities')
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const handleAddAmenity = () => {
    setIsAddDialogOpen(false)
    showNotification('Amenity added successfully!')
  }

  const handleViewDetails = (bookingId: string) => {
    showNotification(`Viewing booking ${bookingId}...`)
  }

  const handleModifyBooking = (bookingId: string) => {
    showNotification(`Modifying booking ${bookingId}...`)
  }

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      showNotification('Booking cancelled successfully!')
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <RoleGuard allowedRoles={['admin', 'resident']}>
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

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1e3a5f]">
                  {isAdmin ? 'Amenities Management' : 'Amenities Booking'}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isAdmin
                    ? 'Manage and monitor amenity bookings'
                    : 'Book facilities and amenities for your events'}
                </p>
              </div>
            </div>
          </div>
          {isAdmin && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 gap-2 shadow-lg shadow-teal-500/25">
                  <Plus className="h-4 w-4" />
                  Add Amenity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Amenity</DialogTitle>
                  <DialogDescription>
                    Create a new facility or amenity for residents to book
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Amenity Name</Label>
                      <Input placeholder="e.g. Mini Theater" />
                    </div>
                    <div className="space-y-2">
                      <Label>Amenity Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hall">Party Hall / Clubhouse</SelectItem>
                          <SelectItem value="pool">Swimming Pool</SelectItem>
                          <SelectItem value="gym">Gym / Fitness Center</SelectItem>
                          <SelectItem value="court">Sports Court</SelectItem>
                          <SelectItem value="dining">Dining Area</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Capacity (Persons)</Label>
                      <Input type="number" placeholder="e.g. 50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Price per Hour (₹)</Label>
                      <Input type="number" placeholder="0 for free" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe the amenity and its features..." rows={3} />
                  </div>

                  <div className="space-y-3">
                    <Label>Available Days</Label>
                    <div className="flex flex-wrap gap-4">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="flex items-center gap-2">
                          <Checkbox id={`day-${day}`} defaultChecked />
                          <label htmlFor={`day-${day}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Select defaultValue="09:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                              {hour.toString().padStart(2, '0')}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                              {hour.toString().padStart(2, '0')}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter className="pt-4 border-t">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      onClick={handleAddAmenity}
                    >
                      Create Amenity
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <TabsList className="bg-transparent border-b w-max sm:w-full justify-start rounded-none h-auto p-0 space-x-4 sm:space-x-6">
              <TabsTrigger
                value="amenities"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none px-0 pb-3 text-sm sm:text-base whitespace-nowrap"
              >
                <Building className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">All Amenities</span>
                <span className="sm:hidden">Amenities</span>
              </TabsTrigger>
              <TabsTrigger
                value="bookings"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-green-600 rounded-none px-0 pb-3 text-sm sm:text-base whitespace-nowrap"
              >
                <CalendarCheck className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">My Bookings</span>
                <span className="sm:hidden">Bookings</span>
                <Badge className="ml-1 sm:ml-2 bg-green-100 text-green-700 text-xs">{upcomingBookings.length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-gray-600 rounded-none px-0 pb-3 text-sm sm:text-base whitespace-nowrap"
              >
                <History className="h-4 w-4 mr-1 sm:mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {amenities.map((amenity, index) => {
                  const AmenityIcon = amenityIcons[amenity.type] || Building
                  const colors = amenityColors[amenity.type] || amenityColors.other

                  return (
                    <motion.div
                      key={amenity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        {/* Header */}
                        <div className={`h-36 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="absolute top-4 left-4">
                            <Badge
                              className={`border-0 ${amenity.status === 'available'
                                ? 'bg-white/90 text-green-700'
                                : 'bg-white/90 text-orange-700'
                                }`}
                            >
                              {amenity.status === 'available' && (
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                              )}
                              {amenity.status}
                            </Badge>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <AmenityIcon className="h-16 w-16 text-white/80" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-white">{amenity.name}</h3>
                          </div>
                        </div>

                        <CardContent className="p-4 space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {amenity.description}
                          </p>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{amenity.capacity} people</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{amenity.timings.start} - {amenity.timings.end}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <IndianRupee className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {amenity.pricePerHour === 0 ? 'Free' : `Rs. ${amenity.pricePerHour}/hr`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{amenity.bookingsToday} today</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Available:</span>
                            <div className="flex gap-1">
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                <span
                                  key={day}
                                  className={`px-1.5 py-0.5 rounded ${amenity.availableDays.includes(day)
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-400'
                                    }`}
                                >
                                  {day[0]}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <BookingDialog amenity={amenity} onBookingComplete={showNotification} />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="mt-6 space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => {
                const AmenityIcon = amenityIcons[booking.amenityType] || Building
                const colors = amenityColors[booking.amenityType] || amenityColors.other

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${colors.bg}`}>
                              <AmenityIcon className={`h-6 w-6 ${colors.text}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{booking.amenity}</h3>
                              <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                              <div className="flex items-center gap-3 mt-1 text-sm">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(booking.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600">
                                {booking.amount === 0 ? 'Free' : `Rs. ${booking.amount}`}
                              </p>
                              <Badge className="bg-green-100 text-green-700 border-0">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {booking.status}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(booking.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleModifyBooking(booking.id)}>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Modify Booking
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleCancelBooking(booking.id)}>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <CalendarCheck className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No upcoming bookings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Book an amenity to see your reservations here
                </p>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6 space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking, index) => {
                const AmenityIcon = amenityIcons[booking.amenityType] || Building
                const colors = amenityColors[booking.amenityType] || amenityColors.other

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg opacity-80">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gray-100`}>
                              <AmenityIcon className="h-6 w-6 text-gray-500" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{booking.amenity}</h3>
                              <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(booking.date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-muted-foreground">
                              Rs. {booking.amount}
                            </p>
                            <Badge variant="secondary">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <History className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No booking history</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your past bookings will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  )
}
