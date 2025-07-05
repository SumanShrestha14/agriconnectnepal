"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, DollarSign, Package, Users, Calendar, Star, TrendingDown, Loader2 } from "lucide-react"
import Image from "next/image"
import { FarmerLayout } from "@/components/farmer-layout"

interface DashboardData {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    activeProducts: number;
    uniqueCustomers: number;
    revenueGrowth: number;
    orderGrowth: number;
    customerGrowth: number;
  };
  monthlySales: Array<{
    month: string;
    sales: number;
    orders: number;
  }>;
  mostSoldItems: Array<{
    name: string;
    value: number;
    revenue: number;
    unit: string;
    color: string;
  }>;
  recentActivity: Array<{
    action: string;
    customer: string;
    amount: string;
    time: string;
    type: string;
    orderId: string;
  }>;
}

export default function FarmerDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [timeRange])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch(`/api/farmer/dashboard?timeRange=${timeRange}`, {
        credentials: "include"
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }
      
      const data = await response.json()
      setDashboardData(data)
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) {
      return <TrendingUp className="h-3 w-3 mr-1" />
    } else if (growth < 0) {
      return <TrendingDown className="h-3 w-3 mr-1" />
    }
    return null
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600"
    if (growth < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getGrowthText = (growth: number) => {
    if (growth > 0) {
      return `+${growth}% from last period`
    } else if (growth < 0) {
      return `${growth}% from last period`
    }
    return "No change from last period"
  }

  if (loading) {
    return (
      <FarmerLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
            <p className="text-green-600">Loading dashboard data...</p>
          </div>
        </div>
      </FarmerLayout>
    )
  }

  if (error || !dashboardData) {
    return (
      <FarmerLayout>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
              <p className="text-green-600 mt-1">Welcome back! Here's your farm overview.</p>
            </div>
          </div>
          <Card className="border-red-100 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error || "Failed to load dashboard data"}</p>
                <Button onClick={fetchDashboardData} className="bg-green-600 hover:bg-green-700">
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </FarmerLayout>
    )
  }

  return (
    <FarmerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
            <p className="text-green-600 mt-1">Welcome back! Here's your farm overview.</p>
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
              <div className="text-2xl font-bold text-green-800">${dashboardData.stats.totalRevenue.toLocaleString()}</div>
              <p className={`text-xs flex items-center mt-1 ${getGrowthColor(dashboardData.stats.revenueGrowth)}`}>
                {getGrowthIcon(dashboardData.stats.revenueGrowth)}
                {getGrowthText(dashboardData.stats.revenueGrowth)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{dashboardData.stats.totalOrders}</div>
              <p className={`text-xs flex items-center mt-1 ${getGrowthColor(dashboardData.stats.orderGrowth)}`}>
                {getGrowthIcon(dashboardData.stats.orderGrowth)}
                {getGrowthText(dashboardData.stats.orderGrowth)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Active Products</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{dashboardData.stats.activeProducts}</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Currently available
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{dashboardData.stats.uniqueCustomers}</div>
              <p className={`text-xs flex items-center mt-1 ${getGrowthColor(dashboardData.stats.customerGrowth)}`}>
                {getGrowthIcon(dashboardData.stats.customerGrowth)}
                {getGrowthText(dashboardData.stats.customerGrowth)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart - 12 Months */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Sales Overview (12 Months)</CardTitle>
              <CardDescription>Monthly sales and order trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any, name: any) => [
                      name === "sales" ? `$${value}` : value,
                      name === "sales" ? "Revenue" : "Orders"
                    ]}
                  />
                  <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} name="sales" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Most Sold Items Pie Chart */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Most Sold Items</CardTitle>
              <CardDescription>Top performing products by quantity sold</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData.mostSoldItems.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.mostSoldItems}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dashboardData.mostSoldItems.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any, name: any, props: any) => [
                          `${value} ${props.payload.unit}`,
                          props.payload.name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4 max-h-32 overflow-y-auto">
                    {dashboardData.mostSoldItems.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-gray-600 truncate block">{item.name}</span>
                          <span className="text-xs text-gray-500">${item.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No sales data available</p>
                  <p className="text-sm text-gray-400 mt-1">Start selling products to see analytics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
            {dashboardData.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity, index) => (
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
                        {activity.customer} {activity.amount && `• ${activity.amount}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">Orders and interactions will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  )
}
