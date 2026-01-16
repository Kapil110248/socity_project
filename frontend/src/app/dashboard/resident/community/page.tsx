'use client'

import { MessageSquare, Calendar } from 'lucide-react'
import { mockPosts } from '@/lib/mocks/community'
import { PostCard } from '@/components/community/post-card'
import { CreatePostDialog } from '@/components/community/create-post-dialog'
import { Card, CardContent } from '@/components/ui/card'

export default function CommunityPage() {
    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
                        <MessageSquare className="h-8 w-8 text-pink-600" />
                        Community Feed
                    </h1>
                    <p className="text-muted-foreground">
                        Connect with neighbors, see announcements, and share updates.
                    </p>
                </div>
                <CreatePostDialog />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {mockPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-2">Upcoming Events</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                    <div className="bg-white/20 p-2 rounded text-center min-w-[50px]">
                                        <span className="block text-xs font-bold opacity-70">MAR</span>
                                        <span className="block text-xl font-bold">15</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Holi Celebration</p>
                                        <p className="text-xs opacity-80">Central Park • 10:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                    <div className="bg-white/20 p-2 rounded text-center min-w-[50px]">
                                        <span className="block text-xs font-bold opacity-70">MAR</span>
                                        <span className="block text-xl font-bold">22</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">AGM Meeting</p>
                                        <p className="text-xs opacity-80">Clubhouse • 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Useful Contacts</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex justify-between">
                                    <span>Main Gate</span>
                                    <span className="font-medium">Intercom: 101</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Facility Manager</span>
                                    <span className="font-medium">+91 98765 00000</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Clubhouse</span>
                                    <span className="font-medium">Intercom: 105</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
