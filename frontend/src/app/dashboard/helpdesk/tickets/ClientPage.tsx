'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Send,
  Lock,
  Eye,
  Clock,
  User,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Paperclip,
  ShieldCheck,
  Building2,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/lib/stores/auth-store'
import { mockTickets } from '@/lib/mocks/tickets'
import { SupportTicket, TicketStatus, TicketMessage } from '@/types/tickets'
import { cn } from '@/lib/utils/cn'

export default function ClientPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuthStore()

  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const foundTicket = mockTickets.find(t => t.id === id)

    if (!foundTicket || !user) {
      router.push('/dashboard/helpdesk/tickets')
      return
    }

    const canView = () => {
      if (user.role === 'resident' || user.role === 'committee') {
        return foundTicket.residentId === user.id
      }
      if (user.role === 'admin') {
        if (foundTicket.isPrivate) return foundTicket.handlerId === user.id
        return true
      }
      if (user.role === 'super_admin') {
        return !foundTicket.isPrivate
      }
      return false
    }

    if (!canView()) {
      router.push('/dashboard/helpdesk/tickets')
      return
    }

    setTicket(foundTicket)
  }, [id, user, router])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [ticket?.messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !ticket || !user) return

    const message: TicketMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content: newMessage,
      createdAt: new Date().toISOString(),
    }

    setTicket(prev =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, message],
            updatedAt: new Date().toISOString(),
          }
        : null
    )

    setNewMessage('')
  }

  const handleStatusChange = (status: TicketStatus) => {
    if (!ticket) return
    setTicket({ ...ticket, status, updatedAt: new Date().toISOString() })
  }

  const handleEscalation = () => {
    if (!ticket) return
    setTicket({ ...ticket, escalatedToTech: true })
  }

  if (!ticket || !user) return null

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">#{ticket.id}</span>
            <Badge className="uppercase text-[10px]">{ticket.status}</Badge>
          </div>
          <h1 className="text-xl font-bold">{ticket.title}</h1>
        </div>
      </div>

      {/* Chat */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {ticket.messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3 max-w-[80%]',
                msg.senderId === user.id && 'ml-auto flex-row-reverse'
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-bold">
                  {msg.senderName[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <div
                  className={cn(
                    'p-3 rounded-xl text-sm',
                    msg.senderId === user.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100'
                  )}
                >
                  {msg.content}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {msg.senderName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type message..."
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
