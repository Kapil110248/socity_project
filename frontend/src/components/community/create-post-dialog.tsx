'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, MessageSquare, Image as ImageIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'

export function CreatePostDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white gap-2">
                    <Plus className="h-4 w-4" />
                    Create Post
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <MessageSquare className="h-5 w-5 text-pink-600" />
                        New Post
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General Discussion</SelectItem>
                                <SelectItem value="announcement">Announcement</SelectItem>
                                <SelectItem value="lost_found">Lost & Found</SelectItem>
                                <SelectItem value="service">Service Recommendation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea placeholder="What's on your mind?" rows={5} className="resize-none" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2 text-gray-600">
                            <ImageIcon className="h-4 w-4" />
                            Add Photo
                        </Button>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={() => setOpen(false)}>
                            Post
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
