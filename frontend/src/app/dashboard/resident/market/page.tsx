'use client'

import { ShoppingBag, Search, Filter } from 'lucide-react'
import { mockMarketplaceItems } from '@/lib/mocks/community'
import { MarketplaceItemCard } from '@/components/community/marketplace-item-card'
import { CreateListingDialog } from '@/components/community/create-listing-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MarketplacePage() {
    return (
        <div className="space-y-6 container mx-auto p-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
                        <ShoppingBag className="h-8 w-8 text-indigo-600" />
                        Marketplace
                    </h1>
                    <p className="text-muted-foreground">
                        Buy, sell, or request items within your society securely.
                    </p>
                </div>
                <CreateListingDialog />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border">
                <div className="relative w-full sm:w-[300px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search items..." className="pl-9" />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="sell">For Sale</TabsTrigger>
                    <TabsTrigger value="buy">Requested</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockMarketplaceItems.map(item => (
                            <MarketplaceItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="sell" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockMarketplaceItems.filter(i => i.type === 'sell').map(item => (
                            <MarketplaceItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="buy" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockMarketplaceItems.filter(i => i.type === 'buy').map(item => (
                            <MarketplaceItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
