'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wifi,
  Bug,
  Sparkles,
  Wrench,
  Droplets,
  Camera,
  Lock,
  Paintbrush,
  Zap,
  Phone,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  Calendar,
  IndianRupee,
  Shield,
  Building2,
  ThumbsUp,
  Send,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/lib/stores/auth-store'
import { iconMap } from '@/lib/constants/icons'
import { UserRaiseComplaintDialog } from '@/components/complaints/user-raise-complaint-dialog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ServiceManagementService } from '@/services/service.service'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

// const serviceCategories = ... (Removed)



const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function ServicesPage() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('browse')

  // Queries
  const { data: categories = [], isLoading: isCatsLoading } = useQuery({
    queryKey: ['service-categories'],
    queryFn: () => ServiceManagementService.listCategories()
  })

  const { data: inquiries = [], isLoading: isInqsLoading } = useQuery({
    queryKey: ['service-inquiries'],
    queryFn: () => ServiceManagementService.listInquiries()
  })

  // Mutations
  const createInquiryMutation = useMutation({
    mutationFn: (data: any) => ServiceManagementService.createInquiry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-inquiries'] })
      setIsBookingOpen(false)
      setIsCallbackOpen(false)
      toast.success('Request submitted successfully!')
      // Clear form
      setNotes('')
      setPreferredDate('')
      setPreferredTime('')
    },
    onError: (error: any) => {
      toast.error('Failed to submit request: ' + error.message)
    }
  })

  // Form states
  const [unit, setUnit] = useState(user?.unit || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [notes, setNotes] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')

  const handleBookService = () => {
    if (!selectedCategory || !user) return

    createInquiryMutation.mutate({
      residentName: user.name,
      unit: unit,
      phone: phone,
      serviceId: selectedCategory.id,
      serviceName: selectedCategory.name,
      type: 'booking',
      preferredDate,
      preferredTime,
      notes,
    })
  }

  const handleRequestCallback = () => {
    if (!selectedCategory || !user) return

    createInquiryMutation.mutate({
      residentName: user.name,
      unit: unit,
      phone: phone,
      serviceId: selectedCategory.id,
      serviceName: selectedCategory.name,
      type: 'callback',
      notes,
    })
  }

  const colorClasses: Record<string, { bg: string; text: string; light: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Services & Bookings</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Book trusted service providers for your home
          </p>
        </div>
        <UserRaiseComplaintDialog />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="browse" className="gap-2">
            <Building2 className="h-4 w-4" />
            Browse Services
          </TabsTrigger>
          <TabsTrigger value="my-requests" className="gap-2">
            <Calendar className="h-4 w-4" />
            My Requests
          </TabsTrigger>
        </TabsList>

        {/* Browse Services Tab */}
        <TabsContent value="browse" className="mt-6">
          {isCatsLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p className="font-medium">Loading services...</p>
            </div>
          ) : !selectedCategory ? (
            /* Service Categories Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category: any) => {
                const Icon = iconMap[category.icon] || Building2
                const colors = colorClasses[category.color] || colorClasses.blue
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl ${colors.light}`}>
                            <Icon className={`h-6 w-6 ${colors.text}`} />
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-4">{category.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                           <Badge variant="outline" className="text-[10px] font-bold">
                            {category.variants?.length || 0} VARIANTS
                           </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            /* Provider List for Selected Category */
            <div>
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => setSelectedCategory(null)}
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Services
              </Button>

              <Card className="border-0 shadow-md mb-6">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${colorClasses[selectedCategory.color]?.light || 'bg-gray-100'}`}>
                      {(() => {
                        const SelectedIcon = iconMap[selectedCategory.icon] || Building2
                        return <SelectedIcon className={`h-8 w-8 ${colorClasses[selectedCategory.color]?.text || 'text-gray-600'}`} />
                      })()}
                    </div>
                    <div>
                      <CardTitle>{selectedCategory.name}</CardTitle>
                      <CardDescription>{selectedCategory.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="flex justify-end gap-3 mt-6">
                <UserRaiseComplaintDialog
                  preSelectedServiceId={selectedCategory.id}
                  preSelectedServiceName={selectedCategory.name}
                  trigger={
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
                  }
                />
                <Button
                  variant="outline"
                  onClick={() => setIsCallbackOpen(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Request Callback
                </Button>
                <Button
                  className="bg-gradient-to-r from-teal-500 to-cyan-500"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-requests" className="mt-6">
          <div className="space-y-4">
            {isInqsLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="h-10 w-10 animate-spin mb-4" />
                <p className="font-medium">Loading your requests...</p>
              </div>
            ) : inquiries.filter((inq: any) => inq.residentId === user?.id).length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No service requests yet</h3>
                  <p className="text-gray-500 mt-1">Browse services and book your first service</p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-500"
                    onClick={() => setActiveTab('browse')}
                  >
                    Browse Services
                  </Button>
                </CardContent>
              </Card>
            ) : (
              inquiries
                .filter((inq: any) => inq.residentId === user?.id)
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((request: any) => (
                  <Card key={request.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-gray-900">{request.serviceName}</h3>
                            <Badge className={statusColors[request.status] || 'bg-gray-100'}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mt-1">{request.vendorName || 'Assigning Vendor...'}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {request.preferredDate || (request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A')}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
                              <Badge variant="secondary" className="text-[10px]">
                                {request.type === 'callback' ? 'CALLBACK' : 'BOOKING'}
                              </Badge>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              Schedule an appointment for {selectedCategory?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className={`p-4 rounded-xl ${selectedCategory ? colorClasses[selectedCategory.color].light : 'bg-gray-100'}`}>
                {selectedCategory && (() => {
                  const Icon = iconMap[selectedCategory.icon] || Building2
                  return <Icon className={`h-8 w-8 ${colorClasses[selectedCategory.color].text}`} />
                })()}
              </div>
              <div>
                <p className="font-bold">{selectedCategory?.name}</p>
                <p className="text-sm text-gray-600">Assigning Best Professional</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9am">9:00 AM</SelectItem>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                    <SelectItem value="11am">11:00 AM</SelectItem>
                    <SelectItem value="12pm">12:00 PM</SelectItem>
                    <SelectItem value="2pm">2:00 PM</SelectItem>
                    <SelectItem value="3pm">3:00 PM</SelectItem>
                    <SelectItem value="4pm">4:00 PM</SelectItem>
                    <SelectItem value="5pm">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your Unit *</Label>
              <Input placeholder="e.g., A-101" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Contact Number *</Label>
              <Input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea placeholder="Any specific requirements or instructions..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-teal-500 to-cyan-500"
              onClick={handleBookService}
              disabled={createInquiryMutation.isPending}
            >
              {createInquiryMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              {createInquiryMutation.isPending ? 'Submitting...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Callback Request Dialog */}
      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Callback</DialogTitle>
            <DialogDescription>
              A professional will call you within 24 hours regarding {selectedCategory?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Your Name *</Label>
              <Input placeholder="Enter your name" value={user?.name || ''} readOnly disabled />
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Preferred Time to Call</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Any time</SelectItem>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <Textarea placeholder="Briefly describe your requirement..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCallbackOpen(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-teal-500 to-cyan-500"
              onClick={handleRequestCallback}
              disabled={createInquiryMutation.isPending}
            >
              {createInquiryMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {createInquiryMutation.isPending ? 'Submitting...' : 'Request Callback'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
