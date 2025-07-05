import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOption);
    
    if (!session || session.user.role !== "farmer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const farmerId = session.user.id;
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get("timeRange") || "6months";

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case "1month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "6months":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "1year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 6);
    }

    // Get orders for the farmer
    const orders = await Order.find({
      farmerId,
      createdAt: { $gte: startDate }
    }).populate("customerId", "fullName").lean();

    // Calculate basic stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map(order => order.customerId._id.toString())).size;

    // Get active products count
    const activeProducts = await Product.countDocuments({ 
      farmerId, 
      quantity: { $gt: 0 } 
    });

    // Calculate monthly sales data for the last 12 months
    const monthlySales = [];
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      months.push(monthName);
      
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= monthStart && orderDate <= monthEnd;
      });
      
      const monthRevenue = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const monthOrderCount = monthOrders.length;
      
      monthlySales.push({
        month: monthName,
        sales: Math.round(monthRevenue * 100) / 100,
        orders: monthOrderCount
      });
    }

    // Calculate most sold items
    const productSales: Record<string, { name: string; quantity: number; revenue: number; unit: string }> = {};
    orders.forEach(order => {
      order.items.forEach((item: any) => {
        if (!productSales[item.name]) {
          productSales[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
            unit: item.unit
          };
        }
        productSales[item.name].quantity += item.quantity;
        productSales[item.name].revenue += item.price * item.quantity;
      });
    });

    const mostSoldItems = Object.values(productSales)
      .sort((a: any, b: any) => b.quantity - a.quantity)
      .slice(0, 8)
      .map((item: any, index) => ({
        name: item.name,
        value: item.quantity,
        revenue: Math.round(item.revenue * 100) / 100,
        unit: item.unit,
        color: [
          "#ef4444", "#f97316", "#eab308", "#22c55e", 
          "#06b6d4", "#8b5cf6", "#ec4899", "#84cc16"
        ][index % 8]
      }));

    // Get recent activity (last 10 orders)
    const recentActivity = orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map(order => ({
        action: "New order received",
        customer: order.customerId.fullName,
        amount: `$${order.totalAmount.toFixed(2)}`,
        time: getTimeAgo(order.createdAt),
        type: "order",
        orderId: order._id
      }));

    // Calculate growth percentages (comparing with previous period)
    const previousStartDate = new Date(startDate);
    const previousEndDate = new Date(startDate);
    previousStartDate.setMonth(previousStartDate.getMonth() - (timeRange === "1month" ? 1 : timeRange === "6months" ? 6 : 12));
    
    const previousOrders = await Order.find({
      farmerId,
      createdAt: { $gte: previousStartDate, $lt: startDate }
    }).lean();

    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const previousOrderCount = previousOrders.length;
    const previousCustomerCount = new Set(previousOrders.map(order => order.customerId.toString())).size;

    const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const orderGrowth = previousOrderCount > 0 ? ((totalOrders - previousOrderCount) / previousOrderCount) * 100 : 0;
    const customerGrowth = previousCustomerCount > 0 ? ((uniqueCustomers - previousCustomerCount) / previousCustomerCount) * 100 : 0;

    return NextResponse.json({
      stats: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalOrders,
        activeProducts,
        uniqueCustomers,
        revenueGrowth: Math.round(revenueGrowth * 10) / 10,
        orderGrowth: Math.round(orderGrowth * 10) / 10,
        customerGrowth: Math.round(customerGrowth * 10) / 10
      },
      monthlySales,
      mostSoldItems,
      recentActivity
    });
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
} 