'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import api from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Image as ImageIcon,
  Upload,
  Camera,
  Wrench,
  Shield,
  Volume2,
  Sparkles,
  ArrowUpRight,
  Eye,
  MoreHorizontal,
  User,
  MapPin,
  Calendar,
  Send,
  AlertTriangle,
  ChevronRight,
  FileText,
  Trash2,
  Edit,
  UserPlus,
  History,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const stats = [
  {
    title: 'Open Complaints',
    value: '23',
    change: '+3 from last week',
    icon: AlertCircle,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    pulse: true,
  },
  {
    title: 'In Progress',
    value: '15',
    change: 'Being resolved',
    icon: Clock,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    title: 'Resolved This Month',
    value: '142',
    change: '+18% vs last month',
    icon: CheckCircle2,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    trend: 'up',
  },
  {
    title: 'Avg. Resolution',
    value: '2.3 days',
    change: 'Improved by 0.5 days',
    icon: History,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: 'up',
  },
]

const categoryIcons: Record<string, React.ElementType> = {
  maintenance: Wrench,
  cleanliness: Sparkles,
  security: Shield,
  noise: Volume2,
  other: AlertCircle,
}

const complaints = [
  {
    id: 'CMP-2025-001',
    title: 'Water Leakage in Bathroom',
    description: 'Continuous water leakage from the ceiling of bathroom. Water is dripping near the electrical switchboard which is a safety concern.',
    category: 'maintenance',
    priority: 'high',
    status: 'open',
    reportedBy: 'Rajesh Kumar',
    unit: 'A-101',
    phone: '+91 98765 43210',
    createdAt: '2 hours ago',
    date: '2025-01-12',
    assignedTo: null,
    images: [
      '/images/complaints/leak-1.jpg',
      '/images/complaints/leak-2.jpg',
    ],
    timeline: [
      { action: 'Complaint registered', time: '2 hours ago', user: 'Rajesh Kumar' },
    ],
  },
  {
    id: 'CMP-2025-002',
    title: 'Lift Not Working - Block B',
    description: 'Lift in Block B is stuck on 5th floor. The display shows error code E-102. Elderly residents are facing difficulty.',
    category: 'maintenance',
    priority: 'urgent',
    status: 'in_progress',
    reportedBy: 'Priya Sharma',
    unit: 'B-205',
    phone: '+91 98765 43211',
    createdAt: '5 hours ago',
    date: '2025-01-12',
    assignedTo: 'Maintenance Team',
    images: [
      '/images/complaints/lift-1.jpg',
    ],
    timeline: [
      { action: 'Complaint registered', time: '5 hours ago', user: 'Priya Sharma' },
      { action: 'Assigned to Maintenance Team', time: '4 hours ago', user: 'Admin' },
      { action: 'Technician dispatched', time: '3 hours ago', user: 'Maintenance Team' },
    ],
  },
  {
    id: 'CMP-2025-003',
    title: 'Noise Disturbance from A-302',
    description: 'Loud music and party noise from neighboring unit after 11 PM. This has happened multiple times in the past week.',
    category: 'noise',
    priority: 'medium',
    status: 'open',
    reportedBy: 'Amit Patel',
    unit: 'C-304',
    phone: '+91 98765 43212',
    createdAt: '1 day ago',
    date: '2025-01-11',
    assignedTo: null,
    images: [],
    timeline: [
      { action: 'Complaint registered', time: '1 day ago', user: 'Amit Patel' },
    ],
  },
  {
    id: 'CMP-2024-345',
    title: 'Garden Maintenance Required',
    description: 'Plants in the common garden area need watering and trimming. Several plants appear to be dying.',
    category: 'cleanliness',
    priority: 'low',
    status: 'resolved',
    reportedBy: 'Neha Gupta',
    unit: 'A-502',
    phone: '+91 98765 43213',
    createdAt: '3 days ago',
    date: '2025-01-09',
    assignedTo: 'Gardening Team',
    images: [
      '/images/complaints/garden-1.jpg',
      '/images/complaints/garden-2.jpg',
      '/images/complaints/garden-3.jpg',
    ],
    resolvedAt: '1 day ago',
    timeline: [
      { action: 'Complaint registered', time: '3 days ago', user: 'Neha Gupta' },
      { action: 'Assigned to Gardening Team', time: '3 days ago', user: 'Admin' },
      { action: 'Work in progress', time: '2 days ago', user: 'Gardening Team' },
      { action: 'Resolved', time: '1 day ago', user: 'Gardening Team' },
    ],
  },
  {
    id: 'CMP-2024-344',
    title: 'Security Camera Not Working',
    description: 'Camera near gate 2 is offline. This is a security concern as it covers the main entry point.',
    category: 'security',
    priority: 'high',
    status: 'in_progress',
    reportedBy: 'Vikram Singh',
    unit: 'D-108',
    phone: '+91 98765 43214',
    createdAt: '4 days ago',
    date: '2025-01-08',
    assignedTo: 'Security Team',
    images: [],
    timeline: [
      { action: 'Complaint registered', time: '4 days ago', user: 'Vikram Singh' },
      { action: 'Assigned to Security Team', time: '4 days ago', user: 'Admin' },
      { action: 'Vendor contacted for replacement', time: '2 days ago', user: 'Security Team' },
    ],
  },
]

const categories = [
  { value: 'maintenance', label: 'Maintenance', icon: Wrench },
  { value: 'cleanliness', label: 'Cleanliness', icon: Sparkles },
  { value: 'security', label: 'Security', icon: Shield },
  { value: 'noise', label: 'Noise', icon: Volume2 },
  { value: 'other', label: 'Other', icon: AlertCircle },
]

function ComplaintDetailDialog({ complaint, onResolve, onAssign }: { complaint: typeof complaints[0], onResolve?: (id: string) => void, onAssign?: (id: string) => void }) {
  const CategoryIcon = categoryIcons[complaint.category] || AlertCircle
  const [isOpen, setIsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [commentSuccess, setCommentSuccess] = useState(false)

  const handleSendComment = () => {
    if (comment.trim()) {
      setCommentSuccess(true)
      setComment('')
      setTimeout(() => setCommentSuccess(false), 2000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <span className="text-muted-foreground font-normal">{complaint.id}</span>
              </DialogTitle>
              <h3 className="text-xl font-semibold mt-1">{complaint.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${
                  complaint.priority === 'urgent'
                    ? 'bg-red-100 text-red-700'
                    : complaint.priority === 'high'
                    ? 'bg-orange-100 text-orange-700'
                    : complaint.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {complaint.priority === 'urgent' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {complaint.priority}
              </Badge>
              <Badge
                className={`${
                  complaint.status === 'resolved'
                    ? 'bg-green-100 text-green-700'
                    : complaint.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {complaint.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Complaint Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                  {complaint.reportedBy.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Reported By</p>
                <p className="font-medium">{complaint.reportedBy}</p>
                <p className="text-xs text-muted-foreground">{complaint.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className={`p-2 rounded-lg ${
                complaint.category === 'maintenance' ? 'bg-blue-100' :
                complaint.category === 'security' ? 'bg-red-100' :
                complaint.category === 'noise' ? 'bg-orange-100' :
                complaint.category === 'cleanliness' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CategoryIcon className={`h-5 w-5 ${
                  complaint.category === 'maintenance' ? 'text-blue-600' :
                  complaint.category === 'security' ? 'text-red-600' :
                  complaint.category === 'noise' ? 'text-orange-600' :
                  complaint.category === 'cleanliness' ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium capitalize">{complaint.category}</p>
                <p className="text-xs text-muted-foreground">{complaint.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-medium">Description</h4>
            <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              {complaint.description}
            </p>
          </div>

          {/* Images */}
          {complaint.images.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Attached Photos ({complaint.images.length})
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {complaint.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity border"
                  >
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-xs text-gray-500 mt-1">Photo {idx + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assigned To */}
          {complaint.assignedTo && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Assigned To</p>
                <p className="text-sm text-blue-700">{complaint.assignedTo}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <History className="h-4 w-4" />
              Activity Timeline
            </h4>
            <div className="space-y-3 pl-2">
              {complaint.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-2 w-2 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    {idx < complaint.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="text-sm font-medium">{event.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.time} by {event.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium flex items-center gap-2">
              Add Comment
              {commentSuccess && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Comment added!
                </span>
              )}
            </h4>
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your comment..."
                className="flex-1"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendComment}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          {complaint.status !== 'resolved' && (
            <div className="flex gap-2 pt-4 border-t">
              {!complaint.assignedTo && (
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    onAssign?.(complaint.id)
                    setIsOpen(false)
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                  Assign
                </Button>
              )}
              <Button
                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  onResolve?.(complaint.id)
                  setIsOpen(false)
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark as Resolved
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ComplaintsPage() {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState<string | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  const isResident = user?.role === 'resident'

  // Fetch Complaints
  const { data: complaintsData = [], isLoading } = useQuery({
    queryKey: ['complaints', activeTab, categoryFilter, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (activeTab !== 'all') params.append('status', activeTab.toUpperCase())
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      if (searchQuery) params.append('search', searchQuery)

      const response = await api.get(`/complaints?${params.toString()}`)
      return response.data
    },
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (newComplaint: any) => {
      return api.post('/complaints', newComplaint)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      setIsNewComplaintOpen(false)
      toast.success('Complaint submitted successfully!')
      resetForm()
    },
  })

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return api.patch(`/complaints/${id}/status`, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      toast.success('Status updated!')
    },
  })

  const resetForm = () => {
    setNewTitle('')
    setNewCategory('')
    setNewPriority('')
    setNewDescription('')
    setUploadedImages([])
  }

  // Handle complaint submission
  const handleSubmitComplaint = () => {
    createMutation.mutate({
      title: newTitle,
      category: newCategory,
      priority: newPriority.toUpperCase(),
      description: newDescription,
      images: uploadedImages,
    })
  }

  // Handle resolve complaint
  const handleResolve = (complaintId: any) => {
    statusMutation.mutate({ id: parseInt(complaintId), status: 'RESOLVED' })
  }

  // Handle assign staff
  const handleAssign = (complaintId: any) => {
    toast.success('Assign functionality coming soon')
  }

  // Handle delete complaint
  const handleDelete = async (complaintId: any) => {
    if (confirm(`Are you sure you want to delete complaint ${complaintId}?`)) {
      try {
        await api.delete(`/complaints/${complaintId}`)
        queryClient.invalidateQueries({ queryKey: ['complaints'] })
        toast.success('Complaint deleted')
      } catch (error) {
        toast.error('Failed to delete')
      }
    }
  }

  // Final mapping for UI (handling any type diffs between API and Mock)
  const normalizedComplaints = complaintsData.map((c: any) => ({
    ...c,
    reportedBy: c.reportedBy?.name || 'Resident',
    date: new Date(c.createdAt).toLocaleDateString(),
    createdAt: 'recent', // Maintaining the "2 hours ago" feel or just simplifying
    priority: c.priority.toLowerCase(),
    status: c.status.toLowerCase(),
  }))

  const filteredComplaints = normalizedComplaints

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files).slice(0, 4 - uploadedImages.length).map(file => URL.createObjectURL(file))
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 4))
    }
  }

  const showNotification = (message: string) => {
    setShowSuccess(message)
    setTimeout(() => setShowSuccess(null), 3000)
  }

  const getStatusCounts = () => {
    return {
      all: normalizedComplaints.length,
      open: normalizedComplaints.filter((c: any) => c.status === 'open').length,
      in_progress: normalizedComplaints.filter((c: any) => c.status === 'in_progress').length,
      resolved: normalizedComplaints.filter((c: any) => c.status === 'resolved').length,
    }
  }

  const counts = getStatusCounts()

  const displayStats = isResident
    ? [
        { ...stats[0], title: 'My Open Complaints', value: '2' },
        { ...stats[1], title: 'In Progress', value: '1' },
        { ...stats[2], title: 'Resolved', value: '8' },
        { ...stats[3], title: 'Avg. Resolution', value: '2.5 days' },
      ]
    : stats

  return (
    <RoleGuard allowedRoles={['admin', 'resident']}>
      <div className="space-y-6">
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

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-600">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {isAdmin ? 'Complaints Management' : 'My Complaints'}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isAdmin
                    ? 'Track and resolve resident complaints efficiently'
                    : 'View and raise complaints or maintenance requests'}
                </p>
              </div>
            </div>
          </div>

          <Dialog open={isNewComplaintOpen} onOpenChange={setIsNewComplaintOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-blue-700 hover:to-purple-700 text-white gap-2 shadow-lg shadow-teal-500/25">
                <Plus className="h-4 w-4" />
                <span>New Complaint</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Register New Complaint
                </DialogTitle>
                <DialogDescription>
                  Submit a new complaint or maintenance request. Attach photos for faster resolution.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Complaint Title *</Label>
                  <Input 
                    placeholder="Brief title describing the issue" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={newCategory} onValueChange={setNewCategory}>
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
                  <div className="space-y-2">
                    <Label>Priority *</Label>
                    <Select value={newPriority} onValueChange={setNewPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-gray-400" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-400" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-orange-400" />
                            High
                          </div>
                        </SelectItem>
                        <SelectItem value="urgent">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            Urgent
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location / Unit</Label>
                  <Input placeholder="e.g., A-101, Common Area, Parking Lot B" />
                </div>

                <div className="space-y-2">
                  <Label>Detailed Description *</Label>
                  <Textarea
                    placeholder="Describe the issue in detail. Include what, where, when, and any other relevant information..."
                    rows={4}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>Attach Photos</Label>
                  <div className="grid grid-cols-4 gap-3">
                    <div
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-6 w-6 text-gray-400" />
                      <span className="text-xs text-gray-500">Camera</span>
                    </div>
                    <div
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-6 w-6 text-gray-400" />
                      <span className="text-xs text-gray-500">Upload</span>
                    </div>
                    {[0, 1].map((idx) => (
                      <div key={idx} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
                        {uploadedImages[idx] ? (
                          <>
                            <img src={uploadedImages[idx]} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Photos help us understand and resolve issues faster. You can attach up to 4 images.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsNewComplaintOpen(false)}>Cancel</Button>
                  <Button
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-blue-700 hover:to-purple-700 gap-2"
                    onClick={handleSubmitComplaint}
                  >
                    <Send className="h-4 w-4" />
                    Submit Complaint
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayStats.map((stat, index) => {
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
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {stat.value}
                        </h3>
                        <div className="flex items-center gap-1 mt-2">
                          {stat.trend === 'up' && (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          )}
                          <p className="text-sm text-muted-foreground">{stat.change}</p>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor} relative`}>
                        {stat.pulse && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Filters & Search */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by ID, title, unit, or reporter..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs & Table */}
        <Card className="border-0 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader className="border-b pb-0">
              <TabsList className="bg-transparent h-auto p-0 space-x-6">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none px-0 pb-3"
                >
                  All <Badge variant="secondary" className="ml-2">{counts.all}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="open"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-red-600 rounded-none px-0 pb-3"
                >
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2" />
                  Open <Badge className="ml-2 bg-red-100 text-red-700">{counts.open}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="in_progress"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-orange-600 rounded-none px-0 pb-3"
                >
                  In Progress <Badge className="ml-2 bg-orange-100 text-orange-700">{counts.in_progress}</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="resolved"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-green-600 rounded-none px-0 pb-3"
                >
                  Resolved <Badge className="ml-2 bg-green-100 text-green-700">{counts.resolved}</Badge>
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Complaint</TableHead>
                    {isAdmin && <TableHead className="font-semibold">Reporter</TableHead>}
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    {isAdmin && <TableHead className="font-semibold">Assigned</TableHead>}
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredComplaints.map((complaint: any, index: number) => {
                      const CategoryIcon = categoryIcons[complaint.category] || AlertCircle
                      return (
                        <motion.tr
                          key={complaint.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-muted/50"
                        >
                          <TableCell>
                            <div>
                              <p className="text-xs text-muted-foreground">{complaint.id}</p>
                              <p className="font-medium">{complaint.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">{complaint.createdAt}</span>
                                {complaint.images.length > 0 && (
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <ImageIcon className="h-3 w-3" />
                                    {complaint.images.length}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-xs">
                                    {complaint.reportedBy.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{complaint.reportedBy}</p>
                                  <p className="text-xs text-muted-foreground">{complaint.unit}</p>
                                </div>
                              </div>
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg ${
                                complaint.category === 'maintenance' ? 'bg-blue-100' :
                                complaint.category === 'security' ? 'bg-red-100' :
                                complaint.category === 'noise' ? 'bg-orange-100' :
                                complaint.category === 'cleanliness' ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                <CategoryIcon className={`h-4 w-4 ${
                                  complaint.category === 'maintenance' ? 'text-blue-600' :
                                  complaint.category === 'security' ? 'text-red-600' :
                                  complaint.category === 'noise' ? 'text-orange-600' :
                                  complaint.category === 'cleanliness' ? 'text-green-600' : 'text-gray-600'
                                }`} />
                              </div>
                              <span className="capitalize text-sm">{complaint.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`font-medium ${
                                complaint.priority === 'urgent'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-100'
                                  : complaint.priority === 'high'
                                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                                  : complaint.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {complaint.priority === 'urgent' && (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {complaint.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`font-medium ${
                                complaint.status === 'resolved'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                  : complaint.status === 'in_progress'
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {complaint.status === 'open' && (
                                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                              )}
                              {complaint.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              {complaint.assignedTo ? (
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-3 w-3 text-blue-600" />
                                  </div>
                                  <span className="text-sm">{complaint.assignedTo}</span>
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 gap-1"
                                  onClick={() => handleAssign(complaint.id)}
                                >
                                  <UserPlus className="h-3 w-3" />
                                  Assign
                                </Button>
                              )}
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <ComplaintDetailDialog complaint={complaint} onResolve={handleResolve} onAssign={handleAssign} />

                              {isAdmin && complaint.status !== 'resolved' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 gap-1"
                                  onClick={() => handleResolve(complaint.id)}
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Resolve
                                </Button>
                              )}

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onSelect={() => toast.success(`Viewing details for ${complaint.id}`)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={() => toast.success(`Comment feature coming soon`)}>
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Add Comment
                                  </DropdownMenuItem>
                                  {isAdmin && (
                                    <>
                                      <DropdownMenuItem onSelect={() => handleAssign(complaint.id)}>
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Assign Staff
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onSelect={() => toast.success(`Priority change feature coming soon`)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Change Priority
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" onSelect={() => handleDelete(complaint.id)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
              </div>

              {filteredComplaints.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted mb-4">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No complaints found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </RoleGuard>
  )
}
