import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FarmerDashboardLoading() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="farmer" />
          <Skeleton className="h-4 w-80" theme="farmer" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" theme="farmer" />
                    <Skeleton className="h-8 w-16" theme="farmer" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg" theme="farmer" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-32" theme="farmer" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-64" theme="farmer" />
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-40" theme="farmer" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-64" theme="farmer" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="border-green-100">
          <CardHeader>
            <Skeleton className="h-6 w-32" theme="farmer" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-green-100 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-lg" theme="farmer" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" theme="farmer" />
                      <Skeleton className="h-3 w-24" theme="farmer" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-4 w-16" theme="farmer" />
                    <Skeleton className="h-3 w-20" theme="farmer" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  )
} 