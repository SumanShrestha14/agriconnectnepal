"use client"

import { useState } from "react"
import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, TrendingUp, Calendar, DollarSign, Users, Leaf, AlertCircle } from "lucide-react"

const suggestions = [
  {
    id: 1,
    type: "Market Demand",
    title: "High Demand for Organic Lettuce",
    description:
      "There's a 40% increase in demand for organic lettuce in your area. Consider planting more for the next season.",
    priority: "High",
    category: "Crop Planning",
    impact: "Revenue increase of $2,000-3,500",
    timeframe: "Next planting season",
    confidence: 85,
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 2,
    type: "Weather Alert",
    title: "Optimal Planting Window for Tomatoes",
    description:
      "Weather conditions will be ideal for tomato planting in the next 2 weeks. Soil temperature and moisture levels are perfect.",
    priority: "Medium",
    category: "Timing",
    impact: "Better yield quality",
    timeframe: "Next 2 weeks",
    confidence: 92,
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    type: "Price Optimization",
    title: "Adjust Carrot Pricing",
    description:
      "Your carrot prices are 15% below market average. Consider increasing prices to $2.65/kg to maximize revenue.",
    priority: "Medium",
    category: "Pricing",
    impact: "15% revenue increase",
    timeframe: "Immediate",
    confidence: 78,
    icon: DollarSign,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 4,
    type: "Customer Preference",
    title: "Bundle Products for Higher Sales",
    description:
      "Customers who buy tomatoes often purchase basil too. Create a 'Pasta Garden' bundle to increase average order value.",
    priority: "Low",
    category: "Marketing",
    impact: "20% higher order value",
    timeframe: "This week",
    confidence: 71,
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 5,
    type: "Sustainability",
    title: "Implement Companion Planting",
    description: "Plant marigolds with your tomatoes to naturally repel pests and reduce pesticide use by up to 30%.",
    priority: "Low",
    category: "Farming Practice",
    impact: "Reduced costs & better yield",
    timeframe: "Next season",
    confidence: 88,
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
]

const marketTrends = [
  { crop: "Organic Lettuce", demand: 85, trend: "up", price: "$3.20/kg" },
  { crop: "Cherry Tomatoes", demand: 72, trend: "up", price: "$6.50/kg" },
  { crop: "Bell Peppers", demand: 68, trend: "stable", price: "$4.80/kg" },
  { crop: "Spinach", demand: 45, trend: "down", price: "$2.90/kg" },
]

export default function SuggestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Crop Planning", "Timing", "Pricing", "Marketing", "Farming Practice"]

  const filteredSuggestions = suggestions.filter(
    (suggestion) => selectedCategory === "all" || suggestion.category === selectedCategory,
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗️"
      case "down":
        return "↘️"
      default:
        return "→"
    }
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-green-800">Smart Suggestions</h1>
          <p className="text-green-600 mt-1">AI-powered insights to optimize your farming operations</p>
        </div>

        {/* Market Trends Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TrendingUp className="w-5 h-5" />
              Market Trends
            </CardTitle>
            <CardDescription>Current demand and pricing trends for your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{trend.crop}</h4>
                    <span className="text-lg">{getTrendIcon(trend.trend)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Demand</span>
                      <span className="font-medium">{trend.demand}%</span>
                    </div>
                    <Progress value={trend.demand} className="h-2" />
                    <div className="text-sm font-medium text-green-600">{trend.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-200 text-green-600 hover:bg-green-50"
              }
            >
              {category === "all" ? "All Suggestions" : category}
            </Button>
          ))}
        </div>

        {/* Suggestions List */}
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${suggestion.bgColor} flex items-center justify-center`}>
                      <suggestion.icon className={`w-5 h-5 ${suggestion.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg text-gray-800">{suggestion.title}</CardTitle>
                        <Badge className={getPriorityColor(suggestion.priority)}>{suggestion.priority} Priority</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          {suggestion.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {suggestion.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Confidence</div>
                    <div className="flex items-center gap-2">
                      <Progress value={suggestion.confidence} className="w-16 h-2" />
                      <span className="text-sm font-medium">{suggestion.confidence}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <DollarSign className="w-3 h-3" />
                      {suggestion.impact}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      Learn More
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Implement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuggestions.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No suggestions found for this category.</p>
              <p className="text-gray-400 mt-2">Try selecting a different category or check back later.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </FarmerLayout>
  )
}
