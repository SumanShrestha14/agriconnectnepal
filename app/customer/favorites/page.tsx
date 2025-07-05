"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, MapPin, Filter, HeartOff } from "lucide-react"

const favoriteProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    location: "California",
    price: 4.5,
    unit: "kg",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vegetables",
    inStock: true,
    description: "Fresh, juicy organic tomatoes grown without pesticides",
    addedToFavorites: "2024-01-15",
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    farmer: "Berry Fields Farm",
    location: "Oregon",
    price: 8.99,
    unit: "kg",
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=200",
    category: "Fruits",
    inStock: true,
    description: "Sweet, ripe strawberries picked fresh this morning",
    addedToFavorites: "2024-01-12",
  },
  {
    id: 3,
    name: "Honey",
    farmer: "Buzzing Bee Farm",
    location: "Montana",
    price: 12.99,
    unit: "jar",
    rating: 4.9,
    reviews: 201,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pantry",
    inStock: true,
    description: "Pure, raw honey harvested from local wildflowers",
    addedToFavorites: "2024-01-10",
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    farmer: "Happy Hen Farm",
    location: "Vermont",
    price: 6.5,
    unit: "dozen",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=200",
    category: "Dairy & Eggs",
    inStock: false,
    description: "Fresh eggs from free-range hens, rich in nutrients",
    addedToFavorites: "2024-01-08",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favoriteProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const categories = ["all", "Vegetables", "Fruits", "Dairy & Eggs", "Pantry"]

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  const filteredFavorites = favorites
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default: // recent
          return new Date(b.addedToFavorites).getTime() - new Date(a.addedToFavorites).getTime()
      }
    })

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-800">My Favorites</h1>
          <p className="text-blue-600 mt-1">Your saved products from local farmers</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Filter className="w-5 h-5" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search Favorites</label>
                <Input
                  placeholder="Search by name or farmer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
                >
                  <HeartOff className="w-4 h-4" />
                </Button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-blue-800">{product.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {product.farmer}, {product.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">Rs {product.price}</span>
                    <span className="text-gray-500 ml-1">/{product.unit}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    Added {new Date(product.addedToFavorites).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={!product.inStock}>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFavorites.length === 0 && favorites.length > 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">No favorites found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}

        {favorites.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No favorites yet</p>
              <p className="text-gray-400 mt-2">Start adding products to your favorites to see them here</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Browse Products</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  )
}
