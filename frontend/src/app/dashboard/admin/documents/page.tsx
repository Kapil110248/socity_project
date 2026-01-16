'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleGuard } from '@/components/auth/role-guard'
import {
    FileText,
    Search,
    Plus,
    Filter,
    Download,
    Eye,
    Trash2,
    FolderOpen,
    Shield,
    Home,
    Clock,
    MoreVertical,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

// Mock Data for Society documents
const societyDocuments = [
    { id: 'DOC-001', name: 'Society Bylaws 2024.pdf', type: 'Legal', size: '2.4 MB', date: '2024-12-01', visibility: 'all' },
    { id: 'DOC-002', name: 'Registration Certificate.jpg', type: 'Certificate', size: '1.1 MB', date: '2024-10-15', visibility: 'committee' },
    { id: 'DOC-003', name: 'Fire Safety Insurance.pdf', type: 'Insurance', size: '4.5 MB', date: '2024-11-20', visibility: 'committee' },
    { id: 'DOC-004', name: 'Annual Audit Report 2023.pdf', type: 'Finance', size: '3.8 MB', date: '2024-08-05', visibility: 'all' },
]

// Mock Data for Unit documents
const unitDocuments = [
    { id: 'UDOC-001', unit: 'A-101', name: 'Possession Letter.pdf', type: 'Possession', size: '1.2 MB', date: '2024-01-10' },
    { id: 'UDOC-002', unit: 'B-205', name: 'Maintenance Bill - Dec 2024.pdf', type: 'Bill', size: '0.5 MB', date: '2025-01-02' },
    { id: 'UDOC-003', unit: 'C-301', name: 'Khata Certificate.pdf', type: 'Legal', size: '2.1 MB', date: '2024-05-20' },
    { id: 'UDOC-004', unit: 'A-101', name: 'NOC for Renovation.pdf', type: 'NOC', size: '0.8 MB', date: '2024-11-12' },
]

export default function DocumentsPage() {
    const [activeTab, setActiveTab] = useState('society')
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <RoleGuard allowedRoles={['admin', 'resident']}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FolderOpen className="h-7 w-7 text-teal-600" />
                            Document Management
                        </h1>
                        <p className="text-muted-foreground">Access society rules, certificates, and personal unit papers</p>
                    </div>
                    <RoleGuard allowedRoles={['admin']}>
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2 shadow-lg">
                                    <Plus className="h-4 w-4" />
                                    Upload Document
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Upload New Document</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="doc-name">Document Name</Label>
                                        <Input id="doc-name" placeholder="e.g. Society Bylaws 2024" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select defaultValue="legal">
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="legal">Legal</SelectItem>
                                                    <SelectItem value="finance">Finance</SelectItem>
                                                    <SelectItem value="insurance">Insurance</SelectItem>
                                                    <SelectItem value="certificate">Certificate</SelectItem>
                                                    <SelectItem value="noc">NOC</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="visibility">Visibility</Label>
                                            <Select defaultValue="all">
                                                <SelectTrigger id="visibility">
                                                    <SelectValue placeholder="Select visibility" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Residents</SelectItem>
                                                    <SelectItem value="committee">Committee Only</SelectItem>
                                                    <SelectItem value="unit">Specific Unit</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file">Select File</Label>
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-teal-500 transition-colors cursor-pointer bg-gray-50/50">
                                            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => setIsModalOpen(false)}>Upload</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </RoleGuard>
                </div>

                {/* Search */}
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search documents by name, type, or unit..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Document Tabs */}
                <Tabs defaultValue="society" onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="bg-white border p-1 rounded-xl">
                        <TabsTrigger value="society" className="gap-2 rounded-lg data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                            <Shield className="h-4 w-4" />
                            Society Documents
                        </TabsTrigger>
                        <TabsTrigger value="unit" className="gap-2 rounded-lg data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                            <Home className="h-4 w-4" />
                            Unit Documents
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="society">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {societyDocuments.map((doc) => (
                                <Card key={doc.id} className="group hover:shadow-md transition-shadow relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-teal-50 rounded-xl text-teal-600">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 truncate pr-4">{doc.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline" className="text-[10px] px-1.5 h-4 uppercase">{doc.type}</Badge>
                                                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {doc.date}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 hover:text-teal-600 hover:bg-teal-50">
                                                    <Eye className="h-3 w-3" /> View
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 hover:text-teal-600 hover:bg-teal-50">
                                                    <Download className="h-3 w-3" /> Download
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="unit">
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50/50">
                                        <TableHead>Document Name</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Uploaded On</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {unitDocuments.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-500" />
                                                    <span className="font-medium">{doc.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                                                    {doc.unit}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs uppercase font-medium text-gray-500">{doc.type}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{doc.date}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-teal-600">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-teal-600">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                    <RoleGuard allowedRoles={['admin']}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </RoleGuard>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </RoleGuard>
    )
}
