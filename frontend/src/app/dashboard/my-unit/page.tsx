'use client'

import { motion } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import { useAuthStore } from '@/lib/stores/auth-store'
import {
  Home,
  Users,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  DollarSign,
  Clock,
  Car,
  PawPrint,
  Plus,
  Edit,
  ChevronRight,
  Shield,
  Key,
  Package,
  UserPlus,
  FileText,
  Bell,
  Upload,
  Building2,
  UserCheck,
  CalendarClock,
  Syringe,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

// Mock data - replace with actual API calls
const allUnits = [
  {
    id: '1',
    unitNumber: 'A-205',
    block: 'Tower A',
    floor: '2nd Floor',
    type: '3 BHK',
    area: '1,450 sq.ft',
    status: 'Owner Occupied',
    moveInDate: 'Jan 15, 2023',
    ownershipType: 'Owner',
    isRented: false,
  },
  {
    id: '2',
    unitNumber: 'B-301',
    block: 'Tower B',
    floor: '3rd Floor',
    type: '2 BHK',
    area: '1,100 sq.ft',
    status: 'Rented Out',
    moveInDate: 'Mar 10, 2022',
    ownershipType: 'Owner',
    isRented: true,
  },
]

const residents = [
  {
    name: 'Rajesh Kumar',
    relation: 'Owner',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    age: 45,
    isOwner: true,
    avatar: null,
  },
  {
    name: 'Priya Kumar',
    relation: 'Spouse',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    age: 42,
    isOwner: false,
    avatar: null,
  },
  {
    name: 'Aarav Kumar',
    relation: 'Son',
    phone: '+91 98765 43212',
    email: 'aarav@example.com',
    age: 18,
    isOwner: false,
    avatar: null,
  },
]

const pets = [
  {
    id: '1',
    name: 'Bruno',
    type: 'Dog',
    breed: 'Golden Retriever',
    vaccinations: [
      {
        id: '1',
        name: 'Rabies',
        date: '2024-06-15',
        nextDue: '2025-06-15',
        certificate: 'rabies-cert-2024.pdf',
      },
      {
        id: '2',
        name: 'DHPP',
        date: '2024-05-20',
        nextDue: '2025-05-20',
        certificate: 'dhpp-cert-2024.pdf',
      },
    ],
  },
  {
    id: '2',
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Persian',
    vaccinations: [
      {
        id: '3',
        name: 'Rabies',
        date: '2024-07-10',
        nextDue: '2025-07-10',
        certificate: 'rabies-cat-2024.pdf',
      },
      {
        id: '4',
        name: 'FVRCP',
        date: '2024-06-25',
        nextDue: '2025-06-25',
        certificate: 'fvrcp-cert-2024.pdf',
      },
    ],
  },
]

const tenantInfo = {
  name: 'Amit Sharma',
  phone: '+91 99887 76655',
  email: 'amit.sharma@example.com',
  moveInDate: 'Apr 1, 2024',
  agreementEndDate: 'Mar 31, 2026',
  avatar: null,
  vehicles: [
    {
      id: 't1',
      number: 'MH 02 XY 9876',
      type: 'Car',
      brand: 'Maruti Swift',
      color: 'Silver',
      parkingSlot: 'B-301-1',
    },
  ],
}

const vehicles = [
  {
    id: '1',
    number: 'MH 02 AB 1234',
    type: 'Car',
    brand: 'Honda City',
    color: 'White',
    parkingSlot: 'A-205-1',
  },
  {
    id: '2',
    number: 'MH 02 CD 5678',
    type: 'Bike',
    brand: 'Royal Enfield',
    color: 'Black',
    parkingSlot: 'A-205-2',
  },
]

const paymentHistory = [
  {
    id: 'INV-2024-001',
    month: 'December 2024',
    amount: 8500,
    dueDate: '2024-12-05',
    paidDate: '2024-12-03',
    status: 'paid',
    type: 'Maintenance',
  },
  {
    id: 'INV-2024-002',
    month: 'November 2024',
    amount: 8500,
    dueDate: '2024-11-05',
    paidDate: '2024-11-02',
    status: 'paid',
    type: 'Maintenance',
  },
  {
    id: 'INV-2024-003',
    month: 'October 2024',
    amount: 8500,
    dueDate: '2024-10-05',
    paidDate: '2024-10-04',
    status: 'paid',
    type: 'Maintenance',
  },
]

const pendingPayments = [
  {
    id: 'INV-2025-001',
    description: 'Monthly Maintenance - January 2025',
    amount: 8500,
    dueDate: '2025-01-05',
    status: 'pending',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function MyUnitPage() {
  const { user } = useAuthStore()
  const [selectedUnit, setSelectedUnit] = useState(allUnits[0])
  const [isAddFlatOpen, setIsAddFlatOpen] = useState(false)
  const [isTenantDialogOpen, setIsTenantDialogOpen] = useState(false)
  const [isVaccinationDialogOpen, setIsVaccinationDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<any>(null)

  return (
    <RoleGuard allowedRoles={['resident']}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">My Units</h1>
            <p className="text-gray-500 mt-1">
              Manage your properties and family members
            </p>
          </div>
          <Dialog open={isAddFlatOpen} onOpenChange={setIsAddFlatOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 text-teal-600 border-teal-200 hover:bg-teal-50"
              >
                <Plus className="h-4 w-4" />
                Add Another Flat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Another Flat</DialogTitle>
                <DialogDescription>
                  Register another property owned by you in the society
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="unitNumber">Unit Number</Label>
                  <Input id="unitNumber" placeholder="e.g., C-402" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="block">Block/Tower</Label>
                    <Input id="block" placeholder="Tower C" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input id="floor" placeholder="4th Floor" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" placeholder="2 BHK" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Input id="area" placeholder="1200 sq.ft" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddFlatOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert('Flat registration submitted for approval')
                    setIsAddFlatOpen(false)
                  }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500"
                >
                  Submit for Approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Multiple Flats Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs
            defaultValue={allUnits[0].id}
            onValueChange={(value) => {
              const unit = allUnits.find((u) => u.id === value)
              if (unit) setSelectedUnit(unit)
            }}
          >
            <TabsList className="w-full md:w-auto">
              {allUnits.map((unit) => (
                <TabsTrigger key={unit.id} value={unit.id} className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {unit.unitNumber}
                </TabsTrigger>
              ))}
            </TabsList>

            {allUnits.map((unit) => (
              <TabsContent key={unit.id} value={unit.id} className="mt-6 space-y-6">
                {/* Unit Details Card */}
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-4 bg-white/10 backdrop-blur rounded-2xl">
                        <Home className="h-8 w-8 text-teal-300" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                          Unit {unit.unitNumber}
                        </h2>
                        <p className="text-white/70 mt-1">
                          {unit.block} | {unit.floor}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <div className="flex items-center text-sm text-white/80">
                            <MapPin className="h-4 w-4 mr-1" />
                            {unit.type} | {unit.area}
                          </div>
                          <Badge className={unit.isRented ? "bg-orange-500/20 text-orange-300 border-orange-500/30" : "bg-teal-500/20 text-teal-300 border-teal-500/30"}>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {unit.status}
                          </Badge>
                          <Badge className="bg-white/10 text-white/80 border-white/20">
                            <Key className="h-3 w-3 mr-1" />
                            {unit.ownershipType}
                          </Badge>
                        </div>
                        <p className="text-xs text-white/60 mt-3">
                          Move-in Date: {unit.moveInDate}
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4">
                      <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur min-w-[80px]">
                        <Users className="h-5 w-5 mx-auto text-teal-300" />
                        <p className="text-2xl font-bold mt-1">{unit.isRented ? 1 : residents.length}</p>
                        <p className="text-xs text-white/70">{unit.isRented ? 'Tenant' : 'Members'}</p>
                      </div>
                      {!unit.isRented && (
                        <>
                          <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur min-w-[80px]">
                            <PawPrint className="h-5 w-5 mx-auto text-pink-300" />
                            <p className="text-2xl font-bold mt-1">{pets.length}</p>
                            <p className="text-xs text-white/70">Pets</p>
                          </div>
                          <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur min-w-[80px]">
                            <Car className="h-5 w-5 mx-auto text-cyan-300" />
                            <p className="text-2xl font-bold mt-1">{vehicles.length}</p>
                            <p className="text-xs text-white/70">Vehicles</p>
                          </div>
                        </>
                      )}
                      {unit.isRented && (
                        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur min-w-[80px]">
                          <Car className="h-5 w-5 mx-auto text-cyan-300" />
                          <p className="text-2xl font-bold mt-1">{tenantInfo.vehicles.length}</p>
                          <p className="text-xs text-white/70">Vehicles</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Pending Payments Alert */}
        {pendingPayments.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="p-4 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Payment Due
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    You have {pendingPayments.length} pending payment(s)
                  </p>
                  <div className="mt-3 space-y-2">
                    {pendingPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-xl shadow-sm gap-3"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            Due: {payment.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-xl font-bold text-gray-900">
                            Rs. {payment.amount.toLocaleString()}
                          </p>
                          <Button
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/30"
                            onClick={() => alert(`Redirecting to payment gateway...\n\nAmount: Rs. ${payment.amount.toLocaleString()}\nDescription: ${payment.description}`)}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:bg-teal-50 hover:border-teal-300"
              onClick={() => alert('Opening Helpdesk...')}
            >
              <div className="p-2 bg-teal-100 rounded-lg">
                <FileText className="h-5 w-5 text-teal-600" />
              </div>
              <span className="text-sm font-medium">Raise Complaint</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => alert('Opening Pre-approve Visitor...')}
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Pre-approve Visitor</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
              onClick={() => alert('Opening Book Amenity...')}
            >
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium">Book Amenity</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:bg-orange-50 hover:border-orange-300"
              onClick={() => alert('Opening Parcel List...')}
            >
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium">My Parcels</span>
            </Button>
          </div>
        </motion.div>

        {/* Residents & Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Residents */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1e3a5f]">
                    Family Members
                  </h3>
                  <p className="text-sm text-gray-500">
                    {residents.length} members registered
                  </p>
                </div>
                <div className="p-2 bg-teal-100 rounded-xl">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
              </div>
              <div className="space-y-3">
                {residents.map((resident, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-white shadow">
                      <AvatarImage src={resident.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-semibold">
                        {resident.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">
                          {resident.name}
                        </p>
                        {resident.isOwner && (
                          <Badge className="bg-teal-100 text-teal-700 text-xs">
                            Owner
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {resident.relation} | Age {resident.age}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <a
                          href={`tel:${resident.phone}`}
                          className="text-xs text-teal-600 hover:text-teal-700 flex items-center"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          {resident.phone}
                        </a>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-600">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-dashed border-teal-300 text-teal-600 hover:bg-teal-50"
                onClick={() => alert('Add Family Member\n\nOpening form to add a new family member to your unit...')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Family Member
              </Button>
            </Card>
          </motion.div>

          {/* Vehicles */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1e3a5f]">
                    Registered Vehicles
                  </h3>
                  <p className="text-sm text-gray-500">
                    {vehicles.length} vehicles registered
                  </p>
                </div>
                <div className="p-2 bg-cyan-100 rounded-xl">
                  <Car className="h-5 w-5 text-cyan-600" />
                </div>
              </div>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="p-4 rounded-xl border border-gray-100 hover:border-teal-300 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#1e3a5f]">
                            {vehicle.number}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {vehicle.brand} | {vehicle.color}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          Parking: {vehicle.parkingSlot}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-dashed border-cyan-300 text-cyan-600 hover:bg-cyan-50"
                onClick={() => alert('Register New Vehicle\n\nOpening form to register a new vehicle...')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Register New Vehicle
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Tenant Management Section */}
        {selectedUnit.isRented && (
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1e3a5f]">
                    Tenant Information
                  </h3>
                  <p className="text-sm text-gray-500">
                    Current tenant details for Unit {selectedUnit.unitNumber}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog open={isTenantDialogOpen} onOpenChange={setIsTenantDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-teal-600 border-teal-200 hover:bg-teal-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Tenant
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Tenant Information</DialogTitle>
                        <DialogDescription>
                          Update tenant details and agreement information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tenantName">Tenant Name</Label>
                          <Input id="tenantName" defaultValue={tenantInfo.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tenantPhone">Phone</Label>
                            <Input id="tenantPhone" defaultValue={tenantInfo.phone} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tenantEmail">Email</Label>
                            <Input id="tenantEmail" defaultValue={tenantInfo.email} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="moveInDate">Move-in Date</Label>
                            <Input id="moveInDate" type="date" defaultValue="2024-04-01" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="agreementEndDate">Agreement End Date</Label>
                            <Input id="agreementEndDate" type="date" defaultValue="2026-03-31" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsTenantDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            alert('Tenant information updated successfully')
                            setIsTenantDialogOpen(false)
                          }}
                          className="bg-gradient-to-r from-teal-500 to-cyan-500"
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                    <Avatar className="h-14 w-14 ring-2 ring-white shadow">
                      <AvatarImage src={tenantInfo.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold text-lg">
                        {tenantInfo.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg">{tenantInfo.name}</p>
                      <div className="flex flex-col gap-1 mt-1">
                        <a
                          href={`tel:${tenantInfo.phone}`}
                          className="text-sm text-teal-600 hover:text-teal-700 flex items-center"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          {tenantInfo.phone}
                        </a>
                        <a
                          href={`mailto:${tenantInfo.email}`}
                          className="text-sm text-teal-600 hover:text-teal-700 flex items-center"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          {tenantInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <Calendar className="h-4 w-4" />
                        <p className="text-xs font-medium">Move-in Date</p>
                      </div>
                      <p className="font-semibold text-gray-900">{tenantInfo.moveInDate}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                      <div className="flex items-center gap-2 text-orange-600 mb-1">
                        <CalendarClock className="h-4 w-4" />
                        <p className="text-xs font-medium">Agreement Ends</p>
                      </div>
                      <p className="font-semibold text-gray-900">{tenantInfo.agreementEndDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Car className="h-4 w-4 text-cyan-600" />
                    Tenant Vehicles
                  </h4>
                  <div className="space-y-2">
                    {tenantInfo.vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="p-4 rounded-xl border border-gray-100 hover:border-teal-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-[#1e3a5f]">{vehicle.number}</p>
                              <Badge variant="outline" className="text-xs">
                                {vehicle.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {vehicle.brand} | {vehicle.color}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              Parking: {vehicle.parkingSlot}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Enhanced Pets Section with Vaccination Records */}
        {!selectedUnit.isRented && pets.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1e3a5f]">
                    Registered Pets & Vaccinations
                  </h3>
                  <p className="text-sm text-gray-500">
                    {pets.length} pets registered with vaccination records
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-dashed border-pink-300 text-pink-600 hover:bg-pink-50"
                    onClick={() => alert('Register New Pet\n\nOpening form to register a new pet...')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pet
                  </Button>
                  <div className="p-2 bg-pink-100 rounded-xl">
                    <PawPrint className="h-5 w-5 text-pink-600" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {pets.map((pet) => (
                  <Card key={pet.id} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-full shadow">
                          <PawPrint className="h-6 w-6 text-pink-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{pet.name}</p>
                          <p className="text-sm text-gray-500">{pet.type} | {pet.breed}</p>
                        </div>
                      </div>
                      <Dialog
                        open={isVaccinationDialogOpen && selectedPet?.id === pet.id}
                        onOpenChange={(open) => {
                          setIsVaccinationDialogOpen(open)
                          if (open) setSelectedPet(pet)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-pink-300 text-pink-600 hover:bg-pink-100"
                            onClick={() => setSelectedPet(pet)}
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Upload Vaccination Certificate</DialogTitle>
                            <DialogDescription>
                              Upload vaccination certificate for {pet.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="vaccineName">Vaccination Name</Label>
                              <Input id="vaccineName" placeholder="e.g., Rabies, DHPP" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="vaccineDate">Vaccination Date</Label>
                                <Input id="vaccineDate" type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="nextDue">Next Due Date</Label>
                                <Input id="nextDue" type="date" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="certificate">Certificate File</Label>
                              <Input id="certificate" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                              <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max 5MB)</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsVaccinationDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                alert('Vaccination certificate uploaded successfully')
                                setIsVaccinationDialogOpen(false)
                              }}
                              className="bg-gradient-to-r from-pink-500 to-purple-500"
                            >
                              Upload Certificate
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-purple-600" />
                        Vaccination Records
                      </h4>
                      {pet.vaccinations.map((vaccination) => {
                        const isUpcoming = new Date(vaccination.nextDue) > new Date()
                        const daysUntilDue = Math.ceil((new Date(vaccination.nextDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

                        return (
                          <div
                            key={vaccination.id}
                            className="p-3 bg-white rounded-lg border border-purple-100"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 text-sm">
                                    {vaccination.name}
                                  </p>
                                  <Badge
                                    className={
                                      daysUntilDue <= 30 && daysUntilDue > 0
                                        ? "bg-orange-100 text-orange-700 text-xs"
                                        : isUpcoming
                                        ? "bg-green-100 text-green-700 text-xs"
                                        : "bg-red-100 text-red-700 text-xs"
                                    }
                                  >
                                    {daysUntilDue <= 30 && daysUntilDue > 0
                                      ? "Due Soon"
                                      : isUpcoming
                                      ? "Valid"
                                      : "Overdue"}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                                  <div>
                                    <p className="text-gray-500">Vaccinated</p>
                                    <p className="font-medium">{vaccination.date}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Next Due</p>
                                    <p className="font-medium">{vaccination.nextDue}</p>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                onClick={() => alert(`Viewing certificate: ${vaccination.certificate}`)}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Payment History */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">
                  Payment History
                </h3>
                <p className="text-sm text-gray-500">Recent transactions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-teal-600 border-teal-200 hover:bg-teal-50"
                  onClick={() => alert('Downloading payment history as PDF...')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <div className="p-2 bg-green-100 rounded-xl">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Invoice</TableHead>
                    <TableHead className="font-semibold">Period</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Due Date</TableHead>
                    <TableHead className="font-semibold">Paid Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-[#1e3a5f]">
                        {payment.id}
                      </TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        Rs. {payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-500">{payment.dueDate}</TableCell>
                      <TableCell className="text-gray-500">{payment.paidDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                          onClick={() => alert(`Invoice Details:\n\nID: ${payment.id}\nPeriod: ${payment.month}\nType: ${payment.type}\nAmount: Rs. ${payment.amount.toLocaleString()}\nDue Date: ${payment.dueDate}\nPaid Date: ${payment.paidDate}\nStatus: ${payment.status}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                View All Transactions
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </RoleGuard>
  )
}
