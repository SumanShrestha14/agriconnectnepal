"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FarmerLayout } from "@/components/farmer-layout"
import { Edit, Save, X, MapPin, Phone, Mail, Star, Package, TrendingUp, ShoppingBag, MessageSquare, User, Calendar, DollarSign, Leaf, Truck, CheckCircle, AlertCircle, Clock, BarChart3, Users, Sprout, Eye } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

interface FarmerProfile {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: number;
  FarmName: string;
  FarmLocation: string;
  FarmDescription: string;
  profilePicture?: {
    data: Buffer;
    contentType: string;
  };
  deliveryRadius?: number;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  description: string;
  images: string[];
  organic: boolean;
  harvestDate?: string;
  expiryDate?: string;
  createdAt: string;
}

export default function FarmerProfilePage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [profileData, setProfileData] = useState<FarmerProfile | null>(null)
  const [editData, setEditData] = useState({
    fullname: "",
    phoneNumber: "",
    FarmName: "",
    FarmLocation: "",
    FarmDescription: "",
    deliveryRadius: "",
  })

  useEffect(() => {
    fetchProfile()
    fetchProducts()
  }, [])

  const fetchProfile = async () => {
    try {
      setProfileLoading(true)
      const response = await fetch("/api/farmer/profile", {
        credentials: "include"
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }
      
      const data = await response.json()
      setProfileData(data.profile)
      setEditData({
        fullname: data.profile.fullname,
        phoneNumber: data.profile.phoneNumber.toString(),
        FarmName: data.profile.FarmName,
        FarmLocation: data.profile.FarmLocation,
        FarmDescription: data.profile.FarmDescription,
        deliveryRadius: data.profile.deliveryRadius?.toString() || "",
      })
    } catch (err: any) {
      setError(err.message || "Failed to load profile")
    } finally {
      setProfileLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/farmer/products", {
        credentials: "include"
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      
      const data = await response.json()
      setProducts(data.products || [])
    } catch (err: any) {
      console.error("Failed to fetch products:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      const response = await fetch("/api/farmer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullname: editData.fullname,
          phoneNumber: parseInt(editData.phoneNumber),
          FarmName: editData.FarmName,
          FarmLocation: editData.FarmLocation,
          FarmDescription: editData.FarmDescription,
          deliveryRadius: editData.deliveryRadius ? parseInt(editData.deliveryRadius) : undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      const data = await response.json()
      setProfileData(data.profile)
      setIsEditing(false)
      
      toast({
        title: "Profile Updated",
        description: "Your farm profile has been updated successfully.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      fullname: profileData?.fullname || "",
      phoneNumber: profileData?.phoneNumber?.toString() || "",
      FarmName: profileData?.FarmName || "",
      FarmLocation: profileData?.FarmLocation || "",
      FarmDescription: profileData?.FarmDescription || "",
      deliveryRadius: profileData?.deliveryRadius?.toString() || "",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getProductStats = () => {
    const totalProducts = products.length
    const activeProducts = products.filter(product => product.quantity > 0).length
    const organicProducts = products.filter(product => product.organic).length
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0)
    
    return { totalProducts, activeProducts, organicProducts, totalValue }
  }

  const stats = getProductStats()

  if (profileLoading) {
    return (
      <FarmerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading profile..." />
        </div>
      </FarmerLayout>
    )
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Farm Profile</h1>
            <p className="text-green-600">Manage your farm profile and information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} variant="outline" disabled={saving}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">Total Products</p>
                  <p className="text-2xl font-bold text-green-800">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Active Products</p>
                  <p className="text-2xl font-bold text-blue-800">{stats.activeProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-600">Organic Products</p>
                  <p className="text-2xl font-bold text-orange-800">{stats.organicProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-purple-800">Rs {stats.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="farm">Farm Details</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                      {profileData?.fullname?.charAt(0) || "F"}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && <Button variant="outline">Change Photo</Button>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.fullname}
                        onChange={(e) => setEditData({ ...editData, fullname: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {profileData?.fullname}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profileData?.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phoneNumber}
                        onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {profileData?.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {profileData?.createdAt ? formatDate(profileData.createdAt) : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>Details about your farm and operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    {isEditing ? (
                      <Input
                        id="farmName"
                        value={editData.FarmName}
                        onChange={(e) => setEditData({ ...editData, FarmName: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Sprout className="w-4 h-4" />
                        {profileData?.FarmName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmLocation">Farm Location</Label>
                    {isEditing ? (
                      <Input
                        id="farmLocation"
                        value={editData.FarmLocation}
                        onChange={(e) => setEditData({ ...editData, FarmLocation: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profileData?.FarmLocation}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                    {isEditing ? (
                      <Input
                        id="deliveryRadius"
                        type="number"
                        value={editData.deliveryRadius}
                        onChange={(e) => setEditData({ ...editData, deliveryRadius: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        {profileData?.deliveryRadius || 0} km
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmDescription">Farm Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="farmDescription"
                      value={editData.FarmDescription}
                      onChange={(e) => setEditData({ ...editData, FarmDescription: e.target.value })}
                      rows={4}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profileData?.FarmDescription}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="md" text="Loading products..." />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No products yet</p>
                    <p className="text-gray-400 mt-2">Start adding products to your inventory</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700">
                      Add Product
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <Card key={product._id} className="border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium text-green-800">{product.name}</h3>
                            {product.organic && (
                              <Badge className="bg-green-100 text-green-800">
                                <Leaf className="w-3 h-3 mr-1" />
                                Organic
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Price:</span>
                              <span className="font-medium">Rs {product.price}/{product.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span className="font-medium">{product.quantity} {product.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Category:</span>
                              <span className="font-medium">{product.category}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Orders from your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                  <p className="text-gray-400 mt-2">Orders from customers will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Analytics</CardTitle>
                <CardDescription>Performance insights and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Analytics coming soon</p>
                  <p className="text-gray-400 mt-2">Detailed analytics and insights will be available here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FarmerLayout>
  )
}
