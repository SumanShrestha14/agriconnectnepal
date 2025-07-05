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
import { CustomerLayout } from "@/components/customer-layout"
import { Edit, Save, X, MapPin, Phone, Mail, ShoppingBag, Heart, Clock, Star, Eye, MessageSquare, Truck, CheckCircle, AlertCircle, Package } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface Order {
  _id: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  }>;
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  estimatedDelivery: string;
  createdAt: string;
  farmerId: {
    fullname: string;
    FarmName: string;
  };
}

export default function CustomerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    address: "123 Main Street, San Francisco, CA 94102",
    bio: "Food enthusiast who loves supporting local farmers and sustainable agriculture. Always looking for the freshest, highest quality produce for my family.",
    dietaryRestrictions: ["Vegetarian"],
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch("/api/orders", {
      credentials: "include"
    })
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }
      
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (err: any) {
      setError(err.message || "Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any changes
  }

  const handleReviewProduct = (orderId: string, productName: string) => {
    alert(`Review feature for ${productName} from order ${orderId} - This would open a review modal`)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      confirmed: { color: "bg-blue-100 text-blue-800", icon: Package },
      processing: { color: "bg-purple-100 text-purple-800", icon: Package },
      shipped: { color: "bg-orange-100 text-orange-800", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getOrderStats = () => {
    const totalOrders = orders.length
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length
    const pendingOrders = orders.filter(order => ['pending', 'confirmed', 'processing', 'shipped'].includes(order.status)).length
    
    return { totalOrders, deliveredOrders, pendingOrders }
  }

  const stats = getOrderStats()

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Profile</h1>
            <p className="text-blue-600">Manage your account and shopping preferences</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="view-orders">View Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
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
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">SJ</AvatarFallback>
                  </Avatar>
                  {isEditing && <Button variant="outline">Change Photo</Button>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium">{profileData.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {profileData.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {profileData.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profileData.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Your recent purchases and order status</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner size="lg" text="Loading orders..." />
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <p className="text-red-600">{error}</p>
                    <Button onClick={fetchOrders} className="mt-4">Retry</Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-2xl font-bold text-blue-800">{stats.totalOrders}</p>
                        <p className="text-sm text-blue-600">Total Orders</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <p className="text-2xl font-bold text-green-800">{stats.deliveredOrders}</p>
                        <p className="text-sm text-green-600">Delivered</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <p className="text-2xl font-bold text-purple-800">{stats.pendingOrders}</p>
                        <p className="text-sm text-purple-600">Pending</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order._id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">Order #{order._id.slice(-6)}</h4>
                              <p className="text-sm text-muted-foreground">{order.farmerId?.fullname || 'Unknown Farmer'}</p>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.items.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}
                          </p>
                          <p className="text-sm font-medium mt-2">${order.totalAmount}</p>
                          <p className="text-xs text-gray-500 mt-1">Ordered on {formatDate(order.createdAt)}</p>
                        </div>
                      ))}
                      
                      {orders.length === 0 && (
                        <div className="text-center py-8">
                          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-500">No orders yet</p>
                          <p className="text-sm text-gray-400 mt-1">Start shopping to see your order history here</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="view-orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  My Orders
                </CardTitle>
                <CardDescription>View detailed information about your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner size="lg" text="Loading orders..." />
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <p className="text-red-600">{error}</p>
                    <Button onClick={fetchOrders} className="mt-4">Retry</Button>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No orders yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your confirmed orders will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-blue-800">Order #{order._id.slice(-6)}</h4>
                            <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                            <p className="text-sm text-gray-600">{order.farmerId?.fullname || 'Unknown Farmer'}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(order.status)}
                            <p className="text-lg font-bold text-blue-600 mt-1">${order.totalAmount}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <p className="text-sm font-medium">Items:</p>
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded"
                            >
                              <span>
                                {item.name} ({item.quantity} {item.unit})
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">${(item.price * item.quantity)}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReviewProduct(order._id, item.name)}
                                  className="text-xs"
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Review
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <strong>Delivery Address:</strong> {order.deliveryAddress}
                          </p>
                          <p>
                            <strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Products</CardTitle>
                <CardDescription>Products you've marked as favorites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium mb-2">No favorites yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start shopping and mark products as favorites to see them here
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Browse Products</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
