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
import { Edit, Save, X, MapPin, Phone, Mail, ShoppingBag, Heart, Clock, Star, Eye, MessageSquare } from "lucide-react"

export default function CustomerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [orders, setOrders] = useState([])
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    address: "123 Main Street, San Francisco, CA 94102",
    bio: "Food enthusiast who loves supporting local farmers and sustainable agriculture. Always looking for the freshest, highest quality produce for my family.",
    preferences: ["Organic", "Local", "Seasonal", "Pesticide-Free"],
    dietaryRestrictions: ["Vegetarian"],
  })

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("customer_orders") || "[]")
    setOrders(savedOrders)
  }, [])

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
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
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

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Preferences</CardTitle>
                <CardDescription>Your food preferences and dietary restrictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Food Preferences</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferences.map((preference, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {preference}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dietary Restrictions</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.dietaryRestrictions.map((restriction, index) => (
                      <Badge key={index} className="bg-blue-600 text-white">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
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
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-800">{orders.length}</p>
                    <p className="text-sm text-blue-600">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Star className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-800">4.9</p>
                    <p className="text-sm text-green-600">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold text-purple-800">2</p>
                    <p className="text-sm text-purple-600">Pending Orders</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Order #1234</h4>
                        <p className="text-sm text-muted-foreground">Green Valley Farm</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Organic tomatoes, lettuce, carrots</p>
                    <p className="text-sm font-medium mt-2">$24.50</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Order #1233</h4>
                        <p className="text-sm text-muted-foreground">Sunny Acres Farm</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Fresh herbs, spinach, bell peppers</p>
                    <p className="text-sm font-medium mt-2">$18.75</p>
                  </div>
                </div>
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
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No orders yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your confirmed orders will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-blue-800">Order {order.id}</h4>
                            <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800 mb-1">{order.status}</Badge>
                            <p className="text-lg font-bold text-blue-600">${order.total.toFixed(2)}</p>
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
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReviewProduct(order.id, item.name)}
                                  className="text-xs"
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Review
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Delivery Address:</strong> {order.deliveryAddress}
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
