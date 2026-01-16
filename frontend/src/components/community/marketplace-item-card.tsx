'use client'

import { ShoppingBag, MessageCircle, Tag, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MarketplaceItem } from '@/types/community'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface MarketplaceItemCardProps {
    item: MarketplaceItem
}

export function MarketplaceItemCard({ item }: MarketplaceItemCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md flex flex-col h-full">
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                    <ShoppingBag className="h-12 w-12 text-gray-300" />
                )}
                <Badge className={`absolute top-3 right-3 ${item.type === 'sell' ? 'bg-green-500' : 'bg-blue-500'}`}>
                    {item.type === 'sell' ? 'FOR SALE' : 'WANTED'}
                </Badge>
            </div>

            <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="capitalize text-xs">{item.category}</Badge>
                    {item.condition && <span className="text-xs text-gray-500 capitalize">{item.condition.replace('_', ' ')}</span>}
                </div>

                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
                <p className="text-xl font-bold text-indigo-600 mt-1">
                    ₹{item.price.toLocaleString()}
                    <span className="text-xs font-normal text-gray-500 ml-1 capitalize">({item.priceType})</span>
                </p>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-[40px]">{item.description}</p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                        <p className="font-medium">{item.seller.name}</p>
                        <p className="text-gray-500">{item.seller.unit}</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 bg-gray-50">
                <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <MessageCircle className="h-4 w-4" />
                    Chat with Seller
                </Button>
            </CardFooter>
        </Card>
    )
}
