'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/types/community'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useState } from 'react'

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(post.likes)

    const handleLike = () => {
        setLiked(!liked)
        setLikesCount(liked ? likesCount - 1 : likesCount + 1)
    }

    const categoryColors: Record<string, string> = {
        general: 'bg-gray-100 text-gray-700',
        announcement: 'bg-blue-100 text-blue-700',
        lost_found: 'bg-orange-100 text-orange-700',
        service: 'bg-purple-100 text-purple-700',
    }

    return (
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
                <Avatar>
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">{post.author.name}</h4>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                        {post.author.unit} • {new Date(post.createdAt).toLocaleDateString()}
                        {post.author.role === 'admin' && (
                            <Badge variant="secondary" className="h-5 text-[10px] bg-blue-50 text-blue-600">Admin</Badge>
                        )}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-2">
                {post.title && <h3 className="font-bold mb-2">{post.title}</h3>}
                <Badge className={cn("mb-2 hover:bg-opacity-80", categoryColors[post.type] || categoryColors.general)}>
                    {post.type.replace('_', ' ')}
                </Badge>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{post.content}</p>
            </CardContent>

            <CardFooter className="p-2 border-t flex justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={cn("gap-2 hover:text-red-600", liked ? "text-red-500" : "text-gray-500")}
                >
                    <Heart className={cn("h-4 w-4", liked && "fill-current")} />
                    <span className="text-xs">{likesCount} Likes</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-blue-600">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments.length} Comments</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                    <Share2 className="h-4 w-4" />
                    <span className="text-xs">Share</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
