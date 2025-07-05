"use client"

import { useState, useEffect } from "react"
import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, MapPin, Filter, Loader2, Eye } from "lucide-react"
import Link from "next/link"
import { LoadingSpinner } from "@/components/loading-spinner"

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  description: string;
  images: string[];
  organic: boolean;
  harvestDate?: string;
  expiryDate?: string;
  farmerId: {
    _id: string;
    fullname: string;
    FarmName: string;
    FarmLocation: string;
  };
  averageRating: number;
  reviewCount: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPrevPage, setHasPrevPage] = useState(false)

  const categories = ["all", "Vegetables", "Fruits", "Grains", "Dairy & Eggs", "Herbs & Spices", "Pantry Items"]

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError("")

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
        sortBy: sortBy === "name" ? "name" : sortBy === "price-low" ? "price" : sortBy === "price-high" ? "price" : "createdAt",
        sortOrder: sortBy === "price-high" ? "desc" : "asc",
      })

      if (searchTerm) {
        params.append("search", searchTerm)
      }

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }

      const response = await fetch(`/api/products?${params}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.products)
      setHasNextPage(data.pagination.hasNextPage)
      setHasPrevPage(data.pagination.hasPrevPage)
    } catch (err: any) {
      setError(err.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage, searchTerm, selectedCategory, sortBy])

  const handleAddToCart = async (product: Product) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("customer_cart") || "[]")
      const existingItem = cartItems.find((item: any) => item.id === product._id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cartItems.push({
          id: product._id,
          name: product.name,
          farmer: product.farmerId.fullname,
          farmerId: product.farmerId._id,
          price: product.price,
          quantity: 1,
          unit: product.unit,
          image: product.images[0] || "/placeholder.svg",
        })
      }

      localStorage.setItem("customer_cart", JSON.stringify(cartItems))
      
      // Dispatch custom event to update cart badge
      window.dispatchEvent(new Event('cartUpdated'))
      
      // Show success message (you could use a toast here)
      alert("Product added to cart!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add product to cart")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  if (loading && products.length === 0) {
    return (
      <CustomerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading products..." />
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Available Products</h1>
          <p className="text-blue-600 mt-1">Fresh produce directly from local farmers</p>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search Products</label>
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
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSortBy("name")
                    setCurrentPage(1)
                  }}
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600 text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                      Organic
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {product.farmerId.FarmName}, {product.farmerId.FarmLocation}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(product.averageRating)}
                    <span className="text-sm font-medium">{product.averageRating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">Rs {product.price}</span>
                    <span className="text-gray-500 ml-1">/{product.unit}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/customer/product/${product._id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1"/>
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700" 
                      disabled={product.quantity <= 0}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                    </Button>
                  </div>
                </div>

                {product.quantity <= 0 && (
                  <Badge variant="destructive" className="mt-2">
                    Out of Stock
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {(hasNextPage || hasPrevPage) && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!hasPrevPage}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-gray-600">
              Page {currentPage}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        )}

        {products.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  )
}
