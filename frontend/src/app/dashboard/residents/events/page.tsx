'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import {
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  Edit,
  Trash2,
  PartyPopper,
  Sparkles,
  Heart,
  Trophy,
  Briefcase,
  Music,
  ArrowUpRight,
  MoreHorizontal,
  Share2,
  Bell,
  CheckCircle,
  CalendarPlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const stats = [
  {
    title: 'Total Events',
    value: '45',
    change: '+12 this year',
    icon: Calendar,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'Upcoming',
    value: '8',
    change: 'Next 30 days',
    icon: Clock,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    pulse: true,
  },
  {
    title: 'This Month',
    value: '6',
    change: '3 you RSVP\'d',
    icon: Calendar,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    title: 'Total Attendees',
    value: '1,245',
    change: '+156 this month',
    icon: Users,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    trend: 'up',
  },
]

const categoryIcons: Record<string, React.ElementType> = {
  festival: Sparkles,
  celebration: PartyPopper,
  wellness: Heart,
  meeting: Briefcase,
  sports: Trophy,
  cultural: Music,
}

const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
  festival: { bg: 'bg-amber-100', text: 'text-amber-700', gradient: 'from-amber-500 to-orange-600' },
  celebration: { bg: 'bg-pink-100', text: 'text-pink-700', gradient: 'from-pink-500 to-rose-600' },
  wellness: { bg: 'bg-green-100', text: 'text-green-700', gradient: 'from-green-500 to-emerald-600' },
  meeting: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-indigo-600' },
  sports: { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-violet-600' },
  cultural: { bg: 'bg-cyan-100', text: 'text-cyan-700', gradient: 'from-cyan-500 to-teal-600' },
}

const events = [
  {
    id: 'EVT-001',
    title: 'Diwali Celebration',
    description: 'Community Diwali celebration with cultural programs, rangoli competition, and grand dinner.',
    date: '2025-11-12',
    time: '06:00 PM',
    venue: 'Community Hall',
    organizer: 'Cultural Committee',
    attendees: 250,
    maxAttendees: 300,
    status: 'upcoming',
    category: 'festival',
    isRsvp: true,
  },
  {
    id: 'EVT-002',
    title: 'New Year Party 2025',
    description: 'Ring in the new year with music, food, and fun. DJ night and countdown celebrations.',
    date: '2024-12-31',
    time: '08:00 PM',
    venue: 'Club House',
    organizer: 'Recreation Committee',
    attendees: 180,
    maxAttendees: 200,
    status: 'completed',
    category: 'celebration',
    isRsvp: false,
  },
  {
    id: 'EVT-003',
    title: 'Yoga Workshop',
    description: 'Free yoga and meditation session for all residents. Led by certified yoga instructor.',
    date: '2025-01-15',
    time: '07:00 AM',
    venue: 'Garden Area',
    organizer: 'Health & Wellness',
    attendees: 45,
    maxAttendees: 50,
    status: 'upcoming',
    category: 'wellness',
    isRsvp: true,
  },
  {
    id: 'EVT-004',
    title: 'Annual General Meeting',
    description: 'Discuss society matters, budget allocation, and future development plans.',
    date: '2025-01-20',
    time: '05:00 PM',
    venue: 'Community Hall',
    organizer: 'Management Committee',
    attendees: 120,
    maxAttendees: 250,
    status: 'upcoming',
    category: 'meeting',
    isRsvp: false,
  },
  {
    id: 'EVT-005',
    title: 'Kids Sports Day',
    description: 'Fun sports activities for children including races, relay, and prize distribution.',
    date: '2025-02-05',
    time: '04:00 PM',
    venue: 'Sports Ground',
    organizer: 'Recreation Committee',
    attendees: 85,
    maxAttendees: 100,
    status: 'upcoming',
    category: 'sports',
    isRsvp: true,
  },
  {
    id: 'EVT-006',
    title: 'Classical Music Night',
    description: 'An evening of Indian classical music featuring renowned artists.',
    date: '2025-01-25',
    time: '07:00 PM',
    venue: 'Open Air Theatre',
    organizer: 'Cultural Committee',
    attendees: 65,
    maxAttendees: 150,
    status: 'upcoming',
    category: 'cultural',
    isRsvp: false,
  },
]

const categories = [
  { value: 'festival', label: 'Festival', icon: Sparkles },
  { value: 'celebration', label: 'Celebration', icon: PartyPopper },
  { value: 'wellness', label: 'Wellness', icon: Heart },
  { value: 'meeting', label: 'Meeting', icon: Briefcase },
  { value: 'sports', label: 'Sports', icon: Trophy },
  { value: 'cultural', label: 'Cultural', icon: Music },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('upcoming')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === 'all' || event.status === activeTab
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter

    return matchesSearch && matchesTab && matchesCategory
  })

  const getStatusCounts = () => ({
    all: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    completed: events.filter(e => e.status === 'completed').length,
  })

  const counts = getStatusCounts()

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <RoleGuard allowedRoles={['admin', 'resident']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Events & Activities
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isAdmin ? 'Manage society events and activities' : 'Discover and join community events'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            {isAdmin && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2 shadow-lg shadow-purple-500/25">
                    <Plus className="h-4 w-4" />
                    <span>Create Event</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Create New Event
                    </DialogTitle>
                    <DialogDescription>
                      Schedule a new event for the society
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Event Title *</Label>
                      <Input placeholder="e.g., Diwali Celebration" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Describe the event details..." rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date *</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Time *</Label>
                        <Input type="time" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Venue *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select venue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="community-hall">Community Hall</SelectItem>
                            <SelectItem value="club-house">Club House</SelectItem>
                            <SelectItem value="garden">Garden Area</SelectItem>
                            <SelectItem value="sports-ground">Sports Ground</SelectItem>
                            <SelectItem value="open-theatre">Open Air Theatre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => {
                              const Icon = cat.icon
                              return (
                                <SelectItem key={cat.value} value={cat.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {cat.label}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Max Attendees</Label>
                        <Input type="number" placeholder="100" />
                      </div>
                      <div className="space-y-2">
                        <Label>Organizer</Label>
                        <Input placeholder="e.g., Cultural Committee" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 border border-purple-100">
                      <Bell className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-900">Send Notifications</p>
                        <p className="text-xs text-purple-700">Notify all residents about this event</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2">
                        <CalendarPlus className="h-4 w-4" />
                        Create Event
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {stat.value}
                        </h3>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                          <p className="text-sm text-muted-foreground">{stat.change}</p>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor} relative`}>
                        {stat.pulse && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events by title, description, or venue..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 space-x-6">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-purple-600 rounded-none px-0 pb-3"
            >
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2" />
              Upcoming <Badge className="ml-2 bg-green-100 text-green-700">{counts.upcoming}</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-gray-600 rounded-none px-0 pb-3"
            >
              Completed <Badge variant="secondary" className="ml-2">{counts.completed}</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none px-0 pb-3"
            >
              All Events <Badge variant="secondary" className="ml-2">{counts.all}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEvents.map((event, index) => {
              const CategoryIcon = categoryIcons[event.category] || Calendar
              const colors = categoryColors[event.category] || categoryColors.meeting
              const attendeePercentage = (event.attendees / event.maxAttendees) * 100

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {/* Header Banner */}
                    <div className={`h-32 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${colors.bg} ${colors.text} border-0`}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {event.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`${
                            event.status === 'upcoming'
                              ? 'bg-white/90 text-green-700'
                              : 'bg-white/90 text-gray-700'
                          } border-0`}
                        >
                          {event.status === 'upcoming' && <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />}
                          {event.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold truncate">{event.title}</h3>
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{formatDate(event.date)}</span>
                          <span className="text-muted-foreground">at</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {/* Attendees Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Attendees
                          </span>
                          <span className="font-medium">
                            {event.attendees}/{event.maxAttendees}
                          </span>
                        </div>
                        <Progress value={attendeePercentage} className="h-2" />
                        {attendeePercentage > 90 && (
                          <p className="text-xs text-orange-600">Almost full! Book now.</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <p className="text-xs text-muted-foreground">By {event.organizer}</p>
                        <div className="flex items-center gap-1">
                          {event.status === 'upcoming' && (
                            <Button
                              size="sm"
                              className={`gap-1 ${
                                event.isRsvp
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                              }`}
                            >
                              {event.isRsvp ? (
                                <>
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  RSVP'd
                                </>
                              ) : (
                                <>
                                  <CalendarPlus className="h-3.5 w-3.5" />
                                  RSVP
                                </>
                              )}
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share Event
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CalendarPlus className="h-4 w-4 mr-2" />
                                Add to Calendar
                              </DropdownMenuItem>
                              {isAdmin && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Event
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Cancel Event
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No events found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </RoleGuard>
  )
}
