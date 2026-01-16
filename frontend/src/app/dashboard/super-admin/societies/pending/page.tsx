'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  Users,
  Home,
  Mail,
  Phone,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RoleGuard } from '@/components/auth/role-guard'

const pendingSocieties = [
  {
    id: 1,
    name: 'Palm Gardens',
    city: 'Chennai',
    state: 'Tamil Nadu',
    units: 280,
    adminName: 'Vikram Singh',
    adminEmail: 'vikram@palmgardens.com',
    adminPhone: '+91 98765 43210',
    requestDate: '2024-12-18',
    plan: 'Professional',
  },
  {
    id: 2,
    name: 'Metro Heights',
    city: 'Kolkata',
    state: 'West Bengal',
    units: 150,
    adminName: 'Ananya Dutta',
    adminEmail: 'ananya@metroheights.com',
    adminPhone: '+91 87654 32109',
    requestDate: '2024-12-20',
    plan: 'Basic',
  },
  {
    id: 3,
    name: 'Garden View Residency',
    city: 'Ahmedabad',
    state: 'Gujarat',
    units: 400,
    adminName: 'Hardik Patel',
    adminEmail: 'hardik@gardenview.com',
    adminPhone: '+91 76543 21098',
    requestDate: '2024-12-21',
    plan: 'Enterprise',
  },
]

export default function PendingApprovalsPage() {
  const [selectedSociety, setSelectedSociety] = useState<typeof pendingSocieties[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleViewDetails = (society: typeof pendingSocieties[0]) => {
    setSelectedSociety(society)
    setDialogOpen(true)
  }

  return (
    <RoleGuard allowedRoles={['super_admin']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600">Review and approve new society registrations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingSocieties.length}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-500">Approved (This Month)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-gray-500">Rejected (This Month)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Awaiting Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingSocieties.map((society) => (
                <div
                  key={society.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <Building2 className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{society.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {society.plan}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {society.city}, {society.state}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Home className="h-3 w-3" />
                          {society.units} units
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Requested: {society.requestDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(society)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Society Details</DialogTitle>
              <DialogDescription>Review the registration details</DialogDescription>
            </DialogHeader>
            {selectedSociety && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-lg">{selectedSociety.name}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedSociety.city}, {selectedSociety.state}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Units</p>
                    <p className="font-medium">{selectedSociety.units}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p className="font-medium">{selectedSociety.plan}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Admin Contact</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      {selectedSociety.adminName}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {selectedSociety.adminEmail}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {selectedSociety.adminPhone}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </RoleGuard>
  )
}
