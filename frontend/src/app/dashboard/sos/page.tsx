'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Phone,
  Shield,
  Flame,
  Stethoscope,
  Car,
  Users,
  Bell,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Volume2,
  PhoneCall,
  Radio,
  Plus,
  Cloud,
  Zap,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const emergencyTypes = [
  { id: 'fire', label: 'Fire', icon: Flame, color: 'bg-red-600', textColor: 'text-red-600', description: 'Fire emergency in building' },
  { id: 'medical', label: 'Medical', icon: Stethoscope, color: 'bg-green-600', textColor: 'text-green-600', description: 'Medical emergency' },
  { id: 'security', label: 'Security', icon: Shield, color: 'bg-blue-600', textColor: 'text-blue-600', description: 'Security threat or intrusion' },
  { id: 'disaster', label: 'Natural Disaster', icon: Cloud, color: 'bg-purple-600', textColor: 'text-purple-600', description: 'Earthquake, flood, etc.' },
]

interface EmergencyContact {
  name: string
  phone: string
  available: boolean
  category: 'security' | 'fire' | 'medical' | 'police' | 'custom'
}

const initialEmergencyContacts: EmergencyContact[] = [
  { name: 'Security Control Room', phone: '1800-XXX-XXXX', available: true, category: 'security' },
  { name: 'Fire Department', phone: '101', available: true, category: 'fire' },
  { name: 'Medical Emergency', phone: '102', available: true, category: 'medical' },
  { name: 'Police', phone: '100', available: true, category: 'police' },
]

interface Alert {
  id: number
  type: 'fire' | 'medical' | 'security' | 'disaster'
  unit: string
  date: string
  time: string
  status: 'resolved' | 'active' | 'pending'
  description: string
  resolution?: string
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    type: 'medical',
    unit: 'B-304',
    date: '2024-12-17',
    time: '14:30',
    status: 'resolved',
    description: 'Medical emergency - Elderly fall',
    resolution: 'Ambulance arrived in 8 minutes. Patient taken to City Hospital.'
  },
  {
    id: 2,
    type: 'security',
    unit: 'Parking',
    date: '2024-12-12',
    time: '22:15',
    status: 'resolved',
    description: 'Suspicious person reported',
    resolution: 'Security investigated. Person was a visitor with valid entry.'
  },
  {
    id: 3,
    type: 'fire',
    unit: 'A-102',
    date: '2024-12-05',
    time: '18:45',
    status: 'resolved',
    description: 'Kitchen fire - Minor',
    resolution: 'Fire extinguished by resident. Fire department confirmed no damage.'
  },
]

export default function SOSPage() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [alertTriggered, setAlertTriggered] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [alertTimestamp, setAlertTimestamp] = useState<string>('')
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(initialEmergencyContacts)
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContactName, setNewContactName] = useState('')
  const [newContactPhone, setNewContactPhone] = useState('')
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [showAlertDetails, setShowAlertDetails] = useState(false)

  const handleSOSClick = (type: string) => {
    setSelectedType(type)
    setShowConfirm(true)
  }

  const triggerAlert = () => {
    setShowConfirm(false)
    setAlertTriggered(true)
    const timestamp = new Date().toLocaleString()
    setAlertTimestamp(timestamp)

    // In real app, this would trigger API calls to all emergency contacts
    setTimeout(() => {
      setAlertTriggered(false)
      setShowSuccessDialog(true)
    }, 2000)
  }

  const handleAddContact = () => {
    if (newContactName && newContactPhone) {
      const newContact: EmergencyContact = {
        name: newContactName,
        phone: newContactPhone,
        available: true,
        category: 'custom'
      }
      setEmergencyContacts([...emergencyContacts, newContact])
      setNewContactName('')
      setNewContactPhone('')
      setShowAddContact(false)
    }
  }

  const getEmergencyIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return Flame
      case 'medical':
        return Stethoscope
      case 'security':
        return Shield
      case 'disaster':
        return Cloud
      default:
        return AlertTriangle
    }
  }

  const getEmergencyColor = (type: string) => {
    switch (type) {
      case 'fire':
        return 'bg-red-100 text-red-600'
      case 'medical':
        return 'bg-green-100 text-green-600'
      case 'security':
        return 'bg-blue-100 text-blue-600'
      case 'disaster':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security':
        return Shield
      case 'fire':
        return Flame
      case 'medical':
        return Stethoscope
      case 'police':
        return Shield
      default:
        return Phone
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Alert Banner when triggered */}
      <AnimatePresence>
        {alertTriggered && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 z-50 flex items-center justify-center gap-4"
          >
            <Volume2 className="h-6 w-6 animate-pulse" />
            <span className="font-bold text-lg">EMERGENCY ALERT TRIGGERED - Calling all contacts...</span>
            <Radio className="h-6 w-6 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4"
        >
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900">Emergency SOS</h1>
        <p className="text-gray-600 mt-2">Immediate emergency assistance at your fingertips</p>
      </div>

      {/* SOS PANIC Button - Large and Prominent */}
      <div className="flex justify-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSOSClick('panic')}
          className="w-64 h-64 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-2xl flex flex-col items-center justify-center text-white hover:from-red-700 hover:to-red-900 transition-all border-8 border-red-300"
        >
          <Bell className="h-20 w-20 mb-3 animate-pulse" />
          <span className="text-4xl font-bold">SOS PANIC</span>
          <span className="text-lg opacity-90 mt-2">Press for Immediate Help</span>
        </motion.button>
      </div>

      {/* Emergency Types Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Emergency Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  onClick={() => handleSOSClick(type.id)}
                  className={`w-full h-28 flex-col gap-2 hover:text-white ${type.color.replace('bg-', 'hover:bg-')}`}
                >
                  <Icon className="h-10 w-10" />
                  <span className="font-medium text-sm">{type.label}</span>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              Emergency Contacts
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddContact(true)}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => {
              const CategoryIcon = getCategoryIcon(contact.category)
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <CategoryIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </div>
                  <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                    <PhoneCall className="h-4 w-4" />
                    Call
                  </Button>
                </div>
              )
            })}
          </div>
        </Card>

        {/* My Location */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Your Location
          </h2>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Unit: A-205, Tower A</p>
              <p className="text-sm text-gray-500">2nd Floor, Wing A</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-600">Nearest Exit</p>
              <p className="font-medium">Staircase A - 10m</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-gray-600">Assembly Point</p>
              <p className="font-medium">Garden Area</p>
            </div>
          </div>
        </Card>

        {/* Alert History */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Alert History
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = getEmergencyIcon(alert.type)
              const colorClass = getEmergencyColor(alert.type)
              return (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedAlert(alert)
                    setShowAlertDetails(true)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{alert.description}</p>
                      <p className="text-sm text-gray-600">
                        Unit: {alert.unit} • {alert.date} at {alert.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={alert.status === 'resolved' ? 'secondary' : alert.status === 'active' ? 'destructive' : 'default'}>
                    {alert.status === 'resolved' ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Resolved</>
                    ) : alert.status === 'active' ? (
                      <><XCircle className="h-3 w-3 mr-1" /> Active</>
                    ) : (
                      <><Clock className="h-3 w-3 mr-1" /> Pending</>
                    )}
                  </Badge>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              Confirm Emergency Alert
            </DialogTitle>
            <DialogDescription>
              This will immediately notify all emergency contacts and security personnel.
              Are you sure you want to trigger this alert?
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 p-4 rounded-lg my-4">
            <p className="text-sm text-red-800">
              <strong>The following will be notified:</strong>
            </p>
            <ul className="text-sm text-red-700 mt-2 space-y-1">
              <li>• Security Control Room</li>
              <li>• Fire Department</li>
              <li>• Medical Emergency Services</li>
              <li>• Police</li>
              <li>• All Custom Emergency Contacts</li>
            </ul>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={triggerAlert}>
              <Bell className="h-4 w-4 mr-2" />
              Trigger Alert
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              Alert Sent Successfully
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Your location shared</p>
                  <p className="text-sm text-green-700">Unit A-205, Tower A, 2nd Floor</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Security notified</p>
                  <p className="text-sm text-green-700">Response team dispatched</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Emergency contacts notified</p>
                  <p className="text-sm text-green-700">{emergencyContacts.length} contacts alerted</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Timestamp</p>
                  <p className="text-sm text-green-700">{alertTimestamp}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Help is on the way!</strong> Stay calm and wait for assistance. Keep your phone nearby.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Custom Emergency Contact
            </DialogTitle>
            <DialogDescription>
              Add a personal emergency contact to your list.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input
                id="contact-name"
                placeholder="e.g., Family Doctor, Neighbor"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input
                id="contact-phone"
                placeholder="e.g., +91 98765 43210"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => {
              setShowAddContact(false)
              setNewContactName('')
              setNewContactPhone('')
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddContact} disabled={!newContactName || !newContactPhone}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Details Dialog */}
      <Dialog open={showAlertDetails} onOpenChange={setShowAlertDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Alert Details
            </DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                {(() => {
                  const Icon = getEmergencyIcon(selectedAlert.type)
                  const colorClass = getEmergencyColor(selectedAlert.type)
                  return (
                    <div className={`p-3 rounded-lg ${colorClass}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  )
                })()}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedAlert.description}</h3>
                  <Badge className="mt-2" variant={selectedAlert.status === 'resolved' ? 'secondary' : selectedAlert.status === 'active' ? 'destructive' : 'default'}>
                    {selectedAlert.status === 'resolved' ? 'Resolved' : selectedAlert.status === 'active' ? 'Active' : 'Pending'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 border-t pt-3">
                <div>
                  <p className="text-sm text-gray-600">Unit</p>
                  <p className="font-medium">{selectedAlert.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium">{selectedAlert.date} at {selectedAlert.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium capitalize">{selectedAlert.type}</p>
                </div>
                {selectedAlert.resolution && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Resolution Details</p>
                    <p className="text-sm text-green-800">{selectedAlert.resolution}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setShowAlertDetails(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
