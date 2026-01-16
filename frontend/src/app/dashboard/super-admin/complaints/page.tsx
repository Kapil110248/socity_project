'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Clock, Filter, MessageSquare, Search, Building2, User, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockServiceComplaints } from '@/lib/mocks/services'
import { ComplaintsTable } from '@/components/complaints/complaints-table'

export default function SuperAdminComplaintsPage() {
    const stats = [
        {
            title: 'Total Complaints',
            value: mockServiceComplaints.length,
            icon: MessageSquare,
            color: 'bg-blue-500',
        },
        {
            title: 'Society Issues',
            value: mockServiceComplaints.filter(c => c.source === 'society').length,
            icon: Building2,
            color: 'bg-purple-500',
        },
        {
            title: 'Resident Issues',
            value: mockServiceComplaints.filter(c => c.source === 'resident').length,
            icon: Users,
            color: 'bg-orange-500',
        },
        {
            title: 'Individual Issues',
            value: mockServiceComplaints.filter(c => c.source === 'individual').length,
            icon: User,
            color: 'bg-blue-500',
        },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
                <p className="text-gray-500">View and track complaints from all platform entities</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <h3 className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</h3>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                                        <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            {/* Main Content */}
            <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <CardTitle className="text-lg font-semibold">Complaints List</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search complaints..." className="pl-9 w-[250px]" />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-4 grid w-full grid-cols-4 lg:w-[400px]">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="society">Society</TabsTrigger>
                            <TabsTrigger value="resident">Resident</TabsTrigger>
                            <TabsTrigger value="individual">Individual</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            <ComplaintsTable complaints={mockServiceComplaints} />
                        </TabsContent>
                        <TabsContent value="society">
                            <ComplaintsTable complaints={mockServiceComplaints.filter(c => c.source === 'society')} showSource={false} />
                        </TabsContent>
                        <TabsContent value="resident">
                            <ComplaintsTable complaints={mockServiceComplaints.filter(c => c.source === 'resident')} showSource={false} />
                        </TabsContent>
                        <TabsContent value="individual">
                            <ComplaintsTable complaints={mockServiceComplaints.filter(c => c.source === 'individual')} showSource={false} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
