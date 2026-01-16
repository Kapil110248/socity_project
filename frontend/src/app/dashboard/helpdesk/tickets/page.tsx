'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Ticket,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Image,
  FileText,
  User,
  Calendar,
  ArrowUpRight,
  Star,
  Lock,
  Eye,
  ShieldAlert,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/lib/stores/auth-store'
import { mockTickets } from '@/lib/mocks/tickets'
import { SupportTicket, TicketStatus } from '@/types/tickets'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { CreateTicketDialog } from '@/components/tickets/create-ticket-dialog'

const categories = ['All', 'Technical', 'Maintenance', 'Other']

export default function HelpdeskTicketsPage() {
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Role Visibility Logic
  // TODO: Connect with real API filters later
  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      // 1. Basic search filter
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      // 2. Category filter
      if (selectedCategory !== 'all' && ticket.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }

      // 3. Tab filter (Status)
      if (activeTab !== 'all' && ticket.status !== activeTab) {
        return false
      }

      // 4. Role-based Visibility Rules
      if (user?.role === 'resident' || user?.role === 'committee') {
        return ticket.residentId === user.id
      }

      if (user?.role === 'admin') {
        if (ticket.isPrivate) {
          return ticket.handlerId === user.id
        }
        return true
      }

      if (user?.role === 'super_admin') {
        return !ticket.isPrivate
      }

      return false
    })
  }, [user, searchQuery, activeTab, selectedCategory])

  const stats = useMemo(() => {
    const total = filteredTickets.length
    const getCount = (status: TicketStatus) => filteredTickets.filter(t => t.status === status).length

    return [
      { label: 'Open', value: getCount('open'), color: 'bg-blue-500', percentage: total ? Math.round((getCount('open') / total) * 100) : 0 },
      { label: 'In Progress', value: getCount('in-progress'), color: 'bg-yellow-500', percentage: total ? Math.round((getCount('in-progress') / total) * 100) : 0 },
      { label: 'Resolved', value: getCount('resolved'), color: 'bg-green-500', percentage: total ? Math.round((getCount('resolved') / total) * 100) : 0 },
      { label: 'Closed', value: getCount('closed'), color: 'bg-gray-500', percentage: total ? Math.round((getCount('closed') / total) * 100) : 0 },
    ]
  }, [filteredTickets])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-transparent p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm ring-1 ring-black/5">
            <Ticket className="h-8 w-8 text-[#1e3a5f]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Support & Ticketing</h1>
            <p className="text-sm font-medium text-gray-400">Manage society issues and private consultations</p>
          </div>
        </div>
        {(user?.role === 'resident' || user?.role === 'committee') && (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white gap-2 h-12 px-8 rounded-2xl shadow-lg shadow-blue-100 font-bold"
          >
            <Plus className="h-5 w-5" />
            Create Ticket
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <div className={cn("h-2.5 w-2.5 rounded-full", stat.color)} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-[10px] font-bold text-gray-400">Tickets</span>
              </div>
              <Progress value={stat.percentage} className="h-1 mt-4" />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Advanced Filters */}
      <Card className="p-5 mb-8 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Filter by ID, Member Name or Subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 border-0 bg-gray-50/50 focus:bg-white rounded-2xl font-medium"
            />
          </div>
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-14 rounded-2xl border-0 bg-gray-50/50 font-bold text-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-2xl">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-14 w-14 p-0 rounded-2xl border-0 bg-gray-50/50 hover:bg-gray-100">
              <Filter className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="bg-gray-50/50 p-1 rounded-2xl h-auto flex-wrap md:flex-nowrap">
            <TabsTrigger value="all" className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">ALL TICKETS</TabsTrigger>
            <TabsTrigger value="open" className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">OPEN</TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">IN PROGRESS</TabsTrigger>
            <TabsTrigger value="resolved" className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">RESOLVED</TabsTrigger>
            <TabsTrigger value="closed" className="rounded-xl px-4 py-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">CLOSED</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Ticket Feed */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/dashboard/helpdesk/tickets/${ticket.id}`}>
                <Card className="group p-5 hover:shadow-xl hover:-translate-y-1 transition-all border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5 relative overflow-hidden">
                  <div className={cn("absolute left-0 top-0 bottom-0 w-2", getPriorityColor(ticket.priority))} />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center flex-wrap gap-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-black tracking-widest leading-none">#{ticket.id}</span>
                        <Badge className={cn("rounded-full px-3 py-1 text-[10px] font-black border-0 uppercase tracking-tighter", getStatusColor(ticket.status))}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                        {ticket.isPrivate ? (
                          <Badge className="bg-purple-100 text-purple-700 border-0 rounded-full px-3 py-1 text-[10px] font-black flex items-center gap-1 tracking-tighter">
                            <Lock className="h-3 w-3" /> PRIVATE
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-100 text-emerald-700 border-0 rounded-full px-3 py-1 text-[10px] font-black flex items-center gap-1 tracking-tighter">
                            <Eye className="h-3 w-3" /> PUBLIC
                          </Badge>
                        )}
                        {ticket.escalatedToTech && (
                          <Badge className="bg-rose-100 text-rose-700 border-0 rounded-full px-3 py-1 text-[10px] font-black flex items-center gap-1 tracking-tighter">
                            <ShieldAlert className="h-3 w-3" /> ESCALATED
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1e3a5f] transition-colors">{ticket.title}</h3>
                        <p className="text-sm font-medium text-gray-400 line-clamp-2">{ticket.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {ticket.residentName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-300 uppercase leading-none mb-1">Reporter</p>
                            <p className="text-xs font-bold text-gray-700 leading-none">{ticket.residentName} ({ticket.unit})</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-300 uppercase leading-none mb-1">Created</p>
                            <p className="text-xs font-bold text-gray-700 leading-none">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-300 uppercase leading-none mb-1">Chat</p>
                            <p className="text-xs font-bold text-gray-700 leading-none">{ticket.messages.length} Messsages</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3 shrink-0">
                      <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-gray-100 text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                        <ArrowUpRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTickets.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
            <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="h-10 w-10 text-gray-200" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">No matching tickets</h3>
            <p className="text-gray-400 mt-2 max-w-xs mx-auto">We couldn't find any results for your current filter settings.</p>
            <Button
              variant="outline"
              onClick={() => { setSearchQuery(''); setActiveTab('all'); setSelectedCategory('all'); }}
              className="mt-8 rounded-2xl font-bold border-2 hover:bg-gray-50 px-8 h-12"
            >
              Reset all filters
            </Button>
          </div>
        )}
      </div>

      <CreateTicketDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(data) => console.log('New Ticket Data:', data)}
      />
    </div>
  )
}
