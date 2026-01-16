'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  CheckCheck,
  Clock,
  User,
  Building,
  ChevronLeft,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

const conversations = [
  {
    id: 1,
    name: 'Admin Support',
    lastMessage: 'Your complaint has been resolved',
    time: '10:30 AM',
    unread: 0,
    avatar: 'AS',
    online: true,
    type: 'admin',
  },
  {
    id: 2,
    name: 'Maintenance Team',
    lastMessage: 'Plumber will visit tomorrow at 10 AM',
    time: '9:45 AM',
    unread: 2,
    avatar: 'MT',
    online: true,
    type: 'team',
  },
  {
    id: 3,
    name: 'Security Desk',
    lastMessage: 'Guest has been verified',
    time: 'Yesterday',
    unread: 0,
    avatar: 'SD',
    online: false,
    type: 'security',
  },
  {
    id: 4,
    name: 'Committee President',
    lastMessage: 'Meeting scheduled for Sunday',
    time: 'Yesterday',
    unread: 1,
    avatar: 'CP',
    online: false,
    type: 'committee',
  },
  {
    id: 5,
    name: 'Accounts Department',
    lastMessage: 'Please check your updated bill',
    time: '2 days ago',
    unread: 0,
    avatar: 'AD',
    online: true,
    type: 'accounts',
  },
]

const messages = [
  {
    id: 1,
    sender: 'me',
    message: 'Hi, I have a water leakage issue in my bathroom',
    time: '10:00 AM',
    status: 'read',
  },
  {
    id: 2,
    sender: 'admin',
    message: 'Hello! Sorry to hear that. Can you please share some photos of the leakage?',
    time: '10:02 AM',
  },
  {
    id: 3,
    sender: 'me',
    message: 'Sure, here are the photos',
    time: '10:05 AM',
    status: 'read',
    hasAttachment: true,
    attachmentType: 'image',
  },
  {
    id: 4,
    sender: 'admin',
    message: 'Thank you for sharing. I can see the issue. Our plumber will visit your unit tomorrow between 10 AM - 12 PM. Will that work for you?',
    time: '10:10 AM',
  },
  {
    id: 5,
    sender: 'me',
    message: 'Yes, that works. Thank you!',
    time: '10:12 AM',
    status: 'read',
  },
  {
    id: 6,
    sender: 'admin',
    message: 'Great! I have raised ticket TKT-001 for this. You can track the status from your dashboard. Is there anything else I can help you with?',
    time: '10:15 AM',
  },
  {
    id: 7,
    sender: 'me',
    message: 'No, that\'s all. Thanks for the quick response!',
    time: '10:16 AM',
    status: 'delivered',
  },
]

export default function HelpdeskChatPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [showMobileChat, setShowMobileChat] = useState(false)

  return (
    <div className="h-[calc(100vh-100px)] bg-gray-50">
      <div className="h-full flex">
        {/* Conversations List */}
        <div className={`w-full md:w-80 bg-white border-r flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              Messages
            </h2>
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>

          {/* Conversations */}
          <ScrollArea className="flex-1">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  setSelectedChat(conv)
                  setShowMobileChat(true)
                }}
                className={`p-4 border-b cursor-pointer ${selectedChat.id === conv.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">{conv.avatar}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conv.name}</p>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs">{conv.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileChat(false)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-600">{selectedChat.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedChat.name}</p>
                <p className="text-xs text-green-600">{selectedChat.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-3 ${
                      msg.sender === 'me'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    <p>{msg.message}</p>
                    {msg.hasAttachment && (
                      <div className="mt-2 bg-white/20 rounded-lg p-2 flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        <span className="text-sm">2 images attached</span>
                      </div>
                    )}
                    <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && (
                        msg.status === 'read' ? (
                          <CheckCheck className="h-3 w-3 text-blue-200" />
                        ) : (
                          <CheckCheck className="h-3 w-3" />
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="sm">
                <Image className="h-5 w-5 text-gray-500" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    // Handle send
                    setNewMessage('')
                  }
                }}
              />
              <Button variant="ghost" size="sm">
                <Smile className="h-5 w-5 text-gray-500" />
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
