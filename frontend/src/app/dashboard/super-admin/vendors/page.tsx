'use client'

import { motion } from 'framer-motion'
import { Users, Plus, Building2, Star, Mail, Phone, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockPlatformVendors } from '@/lib/mocks/platform-vendors'
import Link from 'next/link'

export default function SuperAdminVendorsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">Vendor Management</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage platform-owned vendors and their assignments</p>
                </div>
                <Link href="/dashboard/super-admin/vendors/new">
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl px-6 shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Platform Vendor
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Platform Vendors</p>
                            <p className="text-3xl font-black text-gray-900">{mockPlatformVendors.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-teal-50 text-teal-600">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Society Connections</p>
                            <p className="text-3xl font-black text-gray-900">12</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-0 shadow-sm bg-white rounded-3xl ring-1 ring-black/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
                            <Star className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg. Partner Rating</p>
                            <p className="text-3xl font-black text-gray-900">4.7</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white rounded-[40px] ring-1 ring-black/5 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Platform Vendors List</h2>
                    <Badge variant="outline" className="rounded-full px-4 py-1 font-bold text-xs">SUPER ADMIN OWNED</Badge>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor Details</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Societies</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockPlatformVendors.map((vendor, index) => (
                                <motion.tr
                                    key={vendor.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-bold text-gray-900">{vendor.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">ID: {vendor.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge variant="secondary" className="capitalize bg-purple-50 text-purple-700 border-purple-100">
                                            {vendor.category}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="h-3 w-3" /> {vendor.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="h-3 w-3" /> {vendor.contact}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 font-bold text-xs ring-1 ring-blue-100">
                                            {Math.floor(Math.random() * 5) + 1}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <Badge className={vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                            {vendor.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Details
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
