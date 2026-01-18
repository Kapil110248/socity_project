'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { Post } from '@/types/community'

interface PostCardProps {
    post: any // Using any to match backend response structure
}

export function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(post.likes || 0)

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

    const unit = post.author.ownedUnits?.[0]
        ? `${post.author.ownedUnits[0].block}-${post.author.ownedUnits[0].number}`
        : 'Resident'

    return (
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
                <Avatar>
                    <AvatarImage src={post.author.profileImg} />
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
                        {unit} • {new Date(post.createdAt).toLocaleDateString()}
                        {post.author.role !== 'resident' && (
                            <Badge variant="secondary" className="h-5 text-[10px] bg-blue-50 text-blue-600 capitalize">
                                {post.author.role.replace('_', ' ')}
                            </Badge>
                        )}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-2">
                {post.title && <h3 className="font-bold mb-2">{post.title}</h3>}
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{post.content}</p>
                {post.type && (
                    <Badge variant="secondary" className={`mt-3 text-[10px] font-medium ${categoryColors[post.type] || categoryColors.general}`}>
                        {post.type.replace('_', ' ')}
                    </Badge>
                )}
            </CardContent>

            <CardFooter className="p-2 pt-0 flex items-center justify-between border-t mt-2">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 h-9 ${liked ? 'text-red-500' : 'text-gray-500'}`}
                        onClick={handleLike}
                    >
                        <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                        <span className="text-xs font-medium">{likesCount}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 h-9 text-gray-500">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">{post.comments?.length || 0}</span>
                    </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-9 text-gray-500">
                    <Share2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
