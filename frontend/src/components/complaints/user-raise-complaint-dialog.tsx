'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Send } from 'lucide-react'

interface UserRaiseComplaintDialogProps {
    preSelectedServiceId?: string
    preSelectedServiceName?: string
    trigger?: React.ReactNode
}

export function UserRaiseComplaintDialog({ preSelectedServiceId, preSelectedServiceName, trigger }: UserRaiseComplaintDialogProps) {
    const [open, setOpen] = useState(false)
    const [serviceId, setServiceId] = useState(preSelectedServiceId || '')

    useEffect(() => {
        if (preSelectedServiceId) {
            setServiceId(preSelectedServiceId)
        }
    }, [preSelectedServiceId])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
                        <AlertCircle className="h-4 w-4" />
                        <span>Raise Complaint</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        Raise Complaint
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Service Category</Label>
                        <Select value={serviceId} onValueChange={setServiceId} disabled={!!preSelectedServiceId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="security">Security Services</SelectItem>
                                <SelectItem value="cleaning">Cleaning</SelectItem>
                                <SelectItem value="pest">Pest Control</SelectItem>
                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                <SelectItem value="electric">Electrical</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input placeholder="What is the issue?" />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe the problem in detail..." className="min-h-[100px]" />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white gap-2" onClick={() => setOpen(false)}>
                            <Send className="h-4 w-4" />
                            Submit Complaint
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
