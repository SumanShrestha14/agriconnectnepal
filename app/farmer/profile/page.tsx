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
import { Edit, Save, X, MapPin, Phone, Mail, Star, Package, TrendingUp, ShoppingBag, MessageSquare } from "lucide-react"

export default function FarmerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [receivedOrders, setReceivedOrders] = useState([])
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    farmName: "Green Valley Farm",
    location: "California, USA",
    bio: "Organic farmer with 15+ years of experience growing fresh vegetables and fruits. Committed to sustainable farming practices and providing the highest quality produce to our community.",
    specialties: ["Organic Vegetables", "Seasonal Fruits", "Herbs"],
    certifications: ["USDA Organic", "Fair Trade", "Sustainable Agriculture"],
  })

  useEffect(() => {
    // Simulate received orders - in real app this would come from backend
    const mockOrders = [
      {
        id: "ORD-1234567890",
        customerName: "Sarah Johnson",
        items: [{ name: "Organic Tomatoes", quantity: 2, unit: "kg", price: 4.5 }],
        total: 15.49,
        date: new Date().toISOString(),
        status: "confirmed",
        customerAddress: "123 Main St, San Francisco, CA",
      },
      {
        id: "ORD-1234567891",
        customerName: "Mike Wilson",
        items: [
          { name: "Fresh Strawberries", quantity: 1, unit: "kg", price: 8.99 },
          { name: "Organic Carrots", quantity: 2, unit: "kg", price: 2.3 },
        ],
        total: 19.58,
        date: new Date(Date.now() - 86400000).toISOString(),
        status: "processing",
        customerAddress: "456 Oak Ave, Los Angeles, CA",
      },
    ]
    setReceivedOrders(mockOrders)
  }, [])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any changes
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setReceivedOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Profile</h1>
            <p className="text-green-600">Manage your farm profile and information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
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
            <TabsTrigger value="farm">Farm Details</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Received Orders</TabsTrigger>
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
                    <AvatarFallback className="text-2xl bg-green-100 text-green-700">JD</AvatarFallback>
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
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
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
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
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
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {profileData.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
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
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>Details about your farm and specialties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  {isEditing ? (
                    <Input
                      id="farmName"
                      value={profileData.farmName}
                      onChange={(e) => setProfileData({ ...profileData, farmName: e.target.value })}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-green-700">{profileData.farmName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Specialties</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-green-600 text-white">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Overview</CardTitle>
                <CardDescription>Your current product listings and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Package className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-800">24</p>
                    <p className="text-sm text-green-600">Active Products</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Star className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-800">4.8</p>
                    <p className="text-sm text-blue-600">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <p className="text-2xl font-bold text-orange-800">156</p>
                    <p className="text-sm text-orange-600">Total Orders</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Manage Products</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Received Orders
                </CardTitle>
                <CardDescription>Orders from customers for your products</CardDescription>
              </CardHeader>
              <CardContent>
                {receivedOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No orders received yet</p>
                    <p className="text-sm text-gray-400 mt-1">Customer orders will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-green-800">Order {order.id}</h4>
                            <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                            <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                order.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {order.status}
                            </Badge>
                            <p className="text-lg font-bold text-green-600 mt-1">${order.total}</p>
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
                              <span className="font-medium">${(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <p>
                            <strong>Delivery Address:</strong> {order.customerAddress}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {order.status === "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                              className="bg-yellow-600 hover:bg-yellow-700"
                            >
                              Start Processing
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Mark as Shipped
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => alert(`Contact customer: ${order.customerName}`)}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Contact Customer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track your farm's performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">This Month</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Revenue</span>
                        <span className="font-medium">$2,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Orders</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">New Customers</span>
                        <span className="font-medium">8</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Growth</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Revenue Growth</span>
                        <span className="font-medium text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Order Growth</span>
                        <span className="font-medium text-green-600">+8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Customer Growth</span>
                        <span className="font-medium text-green-600">+15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FarmerLayout>
  )
}
