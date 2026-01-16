'use client'

import { BookOpen, Shield, HelpCircle } from 'lucide-react'
import { mockGuidelines } from '@/lib/mocks/community'
import { GuidelineCard } from '@/components/community/guideline-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function GuidelinesPage() {
    const categories = ['all', 'society', 'security', 'amenities']

    return (
        <div className="space-y-6 container mx-auto p-6 max-w-5xl">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    Community Guidelines
                </h1>
                <p className="text-muted-foreground">
                    Please read and acknowledge the society rules and policies to ensure a harmonious living environment.
                </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-gray-100 p-1 rounded-lg">
                    {categories.map(cat => (
                        <TabsTrigger key={cat} value={cat} className="capitalize px-6">
                            {cat}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map(category => (
                    <TabsContent key={category} value={category} className="space-y-4 mt-6">
                        {mockGuidelines
                            .filter(g => category === 'all' || g.category === category)
                            .map(guideline => (
                                <GuidelineCard key={guideline.id} guideline={guideline} />
                            ))}
                        {mockGuidelines.filter(g => category === 'all' || g.category === category).length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                No guidelines found in this category.
                            </div>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
