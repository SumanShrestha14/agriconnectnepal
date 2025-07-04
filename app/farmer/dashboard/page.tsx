"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, DollarSign, Package, Users, Calendar, Star } from "lucide-react"
import Image from "next/image"
import { FarmerLayout } from "@/components/farmer-layout"

const salesData = [
  { month: "Jan", sales: 4000, orders: 24 },
  { month: "Feb", sales: 3000, orders: 18 },
  { month: "Mar", sales: 5000, orders: 32 },
  { month: "Apr", sales: 4500, orders: 28 },
  { month: "May", sales: 6000, orders: 38 },
  { month: "Jun", sales: 5500, orders: 35 },
]

const productData = [
  { name: "Tomatoes", value: 35, color: "#ef4444" },
  { name: "Carrots", value: 25, color: "#f97316" },
  { name: "Lettuce", value: 20, color: "#22c55e" },
  { name: "Peppers", value: 20, color: "#eab308" },
]

const topProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: "$4.99/lb",
    sold: 156,
    revenue: "$778.44",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: "$2.99/lb",
    sold: 134,
    revenue: "$400.66",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Green Lettuce",
    price: "$3.49/head",
    sold: 98,
    revenue: "$342.02",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Bell Peppers",
    price: "$5.99/lb",
    sold: 87,
    revenue: "$521.13",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function FarmerDashboard() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <FarmerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
            <p className="text-green-600 mt-1">Welcome back, John! Here's your farm overview.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === "1month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("1month")}
              className="bg-green-600 hover:bg-green-700"
            >
              1M
            </Button>
            <Button
              variant={timeRange === "6months" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("6months")}
              className="bg-green-600 hover:bg-green-700"
            >
              6M
            </Button>
            <Button
              variant={timeRange === "1year" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("1year")}
              className="bg-green-600 hover:bg-green-700"
            >
              1Y
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">$28,000</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">175</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Active Products</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">24</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 new this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">89</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Sales Overview</CardTitle>
              <CardDescription>Monthly sales and order trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product Distribution */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Product Distribution</CardTitle>
              <CardDescription>Sales breakdown by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {productData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Sold Items */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Most Sold Items
            </CardTitle>
            <CardDescription>Your top performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topProducts.map((product) => (
                <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{product.name}</h4>
                        <p className="text-sm text-green-600 font-medium">{product.price}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Sold</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {product.sold} units
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="font-semibold text-green-700">{product.revenue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest orders and customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New order received",
                  customer: "Sarah Johnson",
                  amount: "$24.99",
                  time: "2 hours ago",
                  type: "order",
                },
                {
                  action: "Product viewed",
                  customer: "Mike Chen",
                  product: "Organic Tomatoes",
                  time: "4 hours ago",
                  type: "view",
                },
                {
                  action: "Order completed",
                  customer: "Emma Davis",
                  amount: "$18.50",
                  time: "6 hours ago",
                  type: "completed",
                },
                { action: "New customer registered", customer: "Alex Rodriguez", time: "1 day ago", type: "customer" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "order"
                        ? "bg-blue-500"
                        : activity.type === "view"
                          ? "bg-yellow-500"
                          : activity.type === "completed"
                            ? "bg-green-500"
                            : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-600">
                      {activity.customer} {activity.amount && `• ${activity.amount}`}{" "}
                      {activity.product && `• ${activity.product}`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  )
}
