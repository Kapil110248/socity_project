export interface Guideline {
    id: string
    title: string
    description: string
    category: 'society' | 'security' | 'amenities' | 'commercial' | 'payment'
    isMandatory: boolean
    lastUpdated: string
}

export interface MarketplaceItem {
    id: string
    title: string
    description: string
    category: 'furniture' | 'electronics' | 'vehicles' | 'clothing' | 'other'
    condition: 'new' | 'like_new' | 'good' | 'fair'
    price: number
    priceType: 'fixed' | 'negotiable' | 'free'
    seller: {
        id: string
        name: string
        unit: string
        avatar?: string
    }
    images: string[]
    status: 'active' | 'sold'
    createdAt: string
    type: 'sell' | 'buy'
}

export interface Comment {
    id: string
    author: {
        id: string
        name: string
        avatar?: string
    }
    content: string
    createdAt: string
}

export interface Post {
    id: string
    author: {
        id: string
        name: string
        unit: string // e.g., "A-101"
        role: 'resident' | 'admin'
        avatar?: string
    }
    type: 'general' | 'announcement' | 'service' | 'buy_sell' | 'lost_found'
    title?: string
    content: string
    images?: string[]
    likes: number
    comments: Comment[]
    createdAt: string
    isLiked?: boolean
}
