'use client'

import { useState } from 'react'
import {
    User,
    Search,
    Filter,
    MoreVertical,
    Smartphone,
    Mail,
    Calendar,
    QrCode,
    Shield,
    Ban,
    CheckCircle2,
    TrendingUp,
    ExternalLink,
    Plus,
    Copy,
    Eye,
    EyeOff
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import { useUserStore } from '@/lib/stores/user-store'

export default function SuperAdminB2CUsers() {
    const { users, addUser } = useUserStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [showCredentials, setShowCredentials] = useState(false)

    // New User Form State
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })

    // Credentials State for Success Modal
    const [createdCredentials, setCreatedCredentials] = useState<{ email: string, password: string } | null>(null)

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCreateUser = () => {
        if (!newUser.name || !newUser.email || !newUser.phone) {
            toast.error('Please fill in Name, Email and Phone')
            return
        }

        // Generate a random password if not provided
        const password = newUser.password || Math.random().toString(36).slice(-8)

        const userToAdd = {
            id: `b2c-${Date.now()}`,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            registeredAt: new Date().toISOString().split('T')[0],
            activeBarcodes: 0,
            serviceRequests: 0,
            status: 'active' as const,
            password: password
        }

        addUser(userToAdd)
        setCreatedCredentials({ email: newUser.email, password: password })
        setIsAddDialogOpen(false)
        setNewUser({ name: '', email: '', phone: '', password: '' })
        toast.success('Individual client created successfully!')
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!')
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Standalone Clients (B2C)</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage and monitor individual users who are not part of any society.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white rounded-xl h-11 px-6 font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        <Plus className="h-5 w-5 mr-2" /> Add Client
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total B2C Users</p>
                    <p className="text-3xl font-black text-gray-900">{users.length}</p>
                </Card>
                <Card className="p-6 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Active Scans (Daily)</p>
                    <p className="text-3xl font-black text-teal-600">42</p>
                </Card>
                <Card className="p-6 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Bookings</p>
                    <p className="text-3xl font-black text-blue-600">128</p>
                </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white rounded-[40px] ring-1 ring-black/5 overflow-hidden">
                <CardHeader className="border-b border-gray-50 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-12 h-14 rounded-2xl border-0 bg-gray-50 focus:bg-white transition-all font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow className="border-0">
                                <TableHead className="px-8 text-[10px] font-black uppercase text-gray-400">User Details</TableHead>
                                <TableHead className="text-[10px] font-black uppercase text-gray-400">Contact</TableHead>
                                <TableHead className="text-[10px] font-black uppercase text-gray-400">Activity</TableHead>
                                <TableHead className="text-[10px] font-black uppercase text-gray-400">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors" onClick={() => setShowCredentials(!showCredentials)}>
                                        Credentials
                                        {showCredentials ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                    </div>
                                </TableHead>
                                <TableHead className="text-[10px] font-black uppercase text-gray-400">Status</TableHead>
                                <TableHead className="text-[10px] font-black uppercase text-gray-400">Joined</TableHead>
                                <TableHead className="text-[10px] font-black uppercase text-gray-400 text-right px-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="border-gray-50 group hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                <Mail className="h-3 w-3" /> {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                                                <Smartphone className="h-3 w-3" /> {user.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="rounded-full gap-1 font-bold text-[10px] border-gray-100">
                                                <QrCode className="h-3 w-3" /> {user.activeBarcodes} QR
                                            </Badge>
                                            <Badge variant="outline" className="rounded-full gap-1 font-bold text-[10px] border-gray-100">
                                                <TrendingUp className="h-3 w-3" /> {user.serviceRequests} SR
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 group/pass">
                                            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-600">
                                                {showCredentials ? user.password || '••••••••' : '••••••••'}
                                            </code>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 opacity-0 group-hover/pass:opacity-100 transition-opacity"
                                                onClick={() => copyToClipboard(user.password || '')}
                                            >
                                                <Copy className="h-3 w-3 text-gray-400" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`border-0 rounded-full text-[10px] font-black px-2 shadow-none uppercase ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            {user.registeredAt}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white shadow-sm ring-1 ring-black/5 border-0 transition-all opacity-0 group-hover:opacity-100">
                                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-0 ring-1 ring-black/5">
                                                <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase p-3">
                                                    <ExternalLink className="h-4 w-4 mr-2 text-blue-600" /> View Activity
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase p-3">
                                                    <Shield className="h-4 w-4 mr-2 text-[#1e3a5f]" /> Reset Barcodes
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase p-3 text-red-600 focus:text-red-600">
                                                    <Ban className="h-4 w-4 mr-2" /> Suspend Account
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add User Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-xl font-black text-gray-900">Add Individual Client</DialogTitle>
                        <DialogDescription className="font-medium text-gray-500">
                            Create a new B2C user account. Login credentials will be generated automatically.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold text-gray-900 uppercase tracking-wide">Usage Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Rahul Sharma"
                                className="h-11 rounded-xl bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-[#1e3a5f]"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold text-gray-900 uppercase tracking-wide">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="e.g. rahul@example.com"
                                className="h-11 rounded-xl bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-[#1e3a5f]"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-bold text-gray-900 uppercase tracking-wide">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="e.g. +91 9988776655"
                                className="h-11 rounded-xl bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-[#1e3a5f]"
                                value={newUser.phone}
                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold text-gray-900 uppercase tracking-wide">Password (Optional)</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="text"
                                    placeholder="Auto-generated if empty"
                                    className="h-11 rounded-xl bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-[#1e3a5f] pr-10"
                                    value={newUser.password || ''}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Shield className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="p-6 pt-0">
                        <div className="flex gap-3 w-full">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-xl h-11 border-gray-200 font-bold"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 rounded-xl h-11 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold"
                                onClick={handleCreateUser}
                            >
                                Create Client
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Credentials Success Dialog */}
            <Dialog open={!!createdCredentials} onOpenChange={(open) => !open && setCreatedCredentials(null)}>
                <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden">
                    <div className="bg-green-500 p-8 text-center text-white">
                        <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <DialogTitle className="text-2xl font-black mb-2">Account Created!</DialogTitle>
                        <DialogDescription className="text-green-100 font-medium">
                            Please share these login credentials with the user securely.
                        </DialogDescription>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2 relative group">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Email / Username</span>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-lg text-gray-900">{createdCredentials?.email}</p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => copyToClipboard(createdCredentials?.email || '')}
                                    >
                                        <Copy className="h-4 w-4 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2 relative group">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Password</span>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-lg text-gray-900 font-mono tracking-wider">
                                        {createdCredentials?.password}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => copyToClipboard(createdCredentials?.password || '')}
                                    >
                                        <Copy className="h-4 w-4 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm font-medium">
                            <Shield className="h-5 w-5 shrink-0" />
                            <p>For security, this password will only be shown once. Please ensure it is saved or shared immediately.</p>
                        </div>
                    </div>
                    <DialogFooter className="p-6 pt-0">
                        <Button
                            className="w-full rounded-xl h-12 bg-gray-900 text-white font-bold shadow-lg"
                            onClick={() => setCreatedCredentials(null)}
                        >
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}
