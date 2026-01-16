'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Plus,
  Search,
  Heart,
  MessageCircle,
  MapPin,
  Clock,
  User,
  Filter,
  Grid,
  List,
  Tag,
  Phone,
  IndianRupee,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const listings = [
  {
    id: 1,
    title: 'Sony Bravia 55" 4K Smart TV',
    description: 'Excellent condition, 2 years old. Comes with original remote and wall mount bracket. Selling due to upgrade.',
    price: 35000,
    originalPrice: 75000,
    category: 'Electronics',
    condition: 'Like New',
    images: ['/placeholder-tv.jpg'],
    seller: {
      name: 'Rahul Sharma',
      unit: 'A-501',
      phone: '+91 98765 43210',
      rating: 4.8,
    },
    postedAt: '2025-12-17',
    views: 45,
    likes: 12,
    status: 'available',
  },
  {
    id: 2,
    title: 'Ikea Study Table with Chair',
    description: 'Wooden study table with ergonomic chair. Perfect for work from home setup. Minor scratches on the surface.',
    price: 8000,
    originalPrice: 15000,
    category: 'Furniture',
    condition: 'Good',
    images: ['/placeholder-table.jpg'],
    seller: {
      name: 'Priya Patel',
      unit: 'B-203',
      phone: '+91 98765 11111',
      rating: 4.5,
    },
    postedAt: '2025-12-16',
    views: 32,
    likes: 8,
    status: 'available',
  },
  {
    id: 3,
    title: 'Kids Bicycle - Hero Blast',
    description: 'Suitable for 5-8 year olds. Used for 1 year, in great condition. Training wheels included.',
    price: 2500,
    originalPrice: 5500,
    category: 'Kids',
    condition: 'Good',
    images: ['/placeholder-bike.jpg'],
    seller: {
      name: 'Amit Singh',
      unit: 'C-102',
      phone: '+91 98765 22222',
      rating: 4.9,
    },
    postedAt: '2025-12-15',
    views: 67,
    likes: 15,
    status: 'sold',
  },
  {
    id: 4,
    title: 'Samsung Refrigerator 340L',
    description: 'Double door frost-free refrigerator. 3 years old, works perfectly. Moving out, hence selling.',
    price: 18000,
    originalPrice: 38000,
    category: 'Appliances',
    condition: 'Good',
    images: ['/placeholder-fridge.jpg'],
    seller: {
      name: 'Sneha Kapoor',
      unit: 'D-405',
      phone: '+91 98765 33333',
      rating: 4.7,
    },
    postedAt: '2025-12-14',
    views: 89,
    likes: 23,
    status: 'available',
  },
  {
    id: 5,
    title: 'Yoga Mat + Resistance Bands Set',
    description: 'Premium yoga mat (6mm thick) with carrying bag and set of 5 resistance bands. Never used.',
    price: 1200,
    originalPrice: 2500,
    category: 'Sports',
    condition: 'New',
    images: ['/placeholder-yoga.jpg'],
    seller: {
      name: 'Vikram Mehta',
      unit: 'A-102',
      phone: '+91 98765 44444',
      rating: 4.6,
    },
    postedAt: '2025-12-13',
    views: 28,
    likes: 6,
    status: 'available',
  },
  {
    id: 6,
    title: 'Books Collection - Fiction & Self-Help',
    description: 'Collection of 25+ books including bestsellers from various authors. Take all for the mentioned price.',
    price: 800,
    originalPrice: null,
    category: 'Books',
    condition: 'Good',
    images: ['/placeholder-books.jpg'],
    seller: {
      name: 'Neha Gupta',
      unit: 'B-401',
      phone: '+91 98765 55555',
      rating: 4.4,
    },
    postedAt: '2025-12-12',
    views: 41,
    likes: 9,
    status: 'available',
  },
]

const categories = [
  'All',
  'Electronics',
  'Furniture',
  'Appliances',
  'Kids',
  'Sports',
  'Books',
  'Clothing',
  'Others',
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedListing, setSelectedListing] = useState<typeof listings[0] | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price)
  }

  const getConditionBadge = (condition: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-green-100 text-green-800',
      'Like New': 'bg-blue-100 text-blue-800',
      'Good': 'bg-yellow-100 text-yellow-800',
      'Fair': 'bg-orange-100 text-orange-800',
    }
    return colors[condition] || 'bg-gray-100 text-gray-800'
  }

  const stats = [
    { label: 'Active Listings', value: listings.filter(l => l.status === 'available').length, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Sold This Month', value: 8, icon: Tag, color: 'bg-green-500' },
    { label: 'My Listings', value: 2, icon: User, color: 'bg-purple-500' },
    { label: 'Saved Items', value: 5, icon: Heart, color: 'bg-red-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-emerald-600" />
            Buy & Sell Marketplace
          </h1>
          <p className="text-gray-600 mt-1">Buy and sell items within your community</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <Heart className="h-4 w-4" />
            Saved
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Sell Item
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="latest">
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Listings Grid */}
      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {listings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Card className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${listing.status === 'sold' ? 'opacity-60' : ''}`}>
                  {viewMode === 'grid' ? (
                    <>
                      {/* Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShoppingBag className="h-16 w-16 text-gray-400" />
                        </div>
                        {listing.status === 'sold' && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-red-600 text-white text-lg px-4 py-1">SOLD</Badge>
                          </div>
                        )}
                        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </button>
                        <Badge className={`absolute top-2 left-2 ${getConditionBadge(listing.condition)}`}>
                          {listing.condition}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">{listing.category}</Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(listing.postedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-emerald-600 flex items-center">
                            <IndianRupee className="h-4 w-4" />{formatPrice(listing.price)}
                          </span>
                          {listing.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{formatPrice(listing.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {listing.seller.unit}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" /> {listing.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex p-4 gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{listing.category}</Badge>
                          <Badge className={`text-xs ${getConditionBadge(listing.condition)}`}>{listing.condition}</Badge>
                          {listing.status === 'sold' && <Badge variant="destructive">Sold</Badge>}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{listing.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-emerald-600 flex items-center">
                            <IndianRupee className="h-4 w-4" />{formatPrice(listing.price)}
                          </span>
                          <span className="text-xs text-gray-500">{listing.seller.unit}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{listing.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Image */}
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-20 w-20 text-gray-400" />
                  </div>

                  {/* Price and Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-emerald-600 flex items-center">
                        <IndianRupee className="h-5 w-5" />{formatPrice(listing.price)}
                      </span>
                      {listing.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ₹{formatPrice(listing.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{listing.category}</Badge>
                      <Badge className={getConditionBadge(listing.condition)}>{listing.condition}</Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600">{listing.description}</p>
                  </div>

                  {/* Seller Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Seller Information</h4>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-emerald-100 text-emerald-600">
                          {listing.seller.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{listing.seller.name}</p>
                        <p className="text-sm text-gray-500">{listing.seller.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">⭐ {listing.seller.rating}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {listing.status === 'available' && (
                    <div className="flex gap-2">
                      <Button className="flex-1 gap-2">
                        <MessageCircle className="h-4 w-4" /> Chat with Seller
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Phone className="h-4 w-4" /> Call
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
