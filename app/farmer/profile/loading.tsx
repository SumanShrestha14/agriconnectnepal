import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FarmerProfileLoading() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="farmer" />
          <Skeleton className="h-4 w-80" theme="farmer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="border-green-100">
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Skeleton className="w-12 h-12 rounded-full" theme="farmer" />
              </div>
              <Skeleton className="h-6 w-32 mx-auto mb-2" theme="farmer" />
              <Skeleton className="h-4 w-40 mx-auto" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <Skeleton className="h-10 w-full" theme="farmer" />
            </CardContent>
          </Card>

          {/* Farm Details */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-green-100">
              <CardHeader>
                <Skeleton className="h-6 w-32" theme="farmer" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" theme="farmer" />
                    <Skeleton className="h-10 w-full" theme="farmer" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" theme="farmer" />
                    <Skeleton className="h-10 w-full" theme="farmer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" theme="farmer" />
                  <Skeleton className="h-20 w-full" theme="farmer" />
                </div>
                <Skeleton className="h-10 w-full" theme="farmer" />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-green-100">
              <CardHeader>
                <Skeleton className="h-6 w-36" theme="farmer" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-green-100 rounded-lg">
                      <Skeleton className="w-12 h-12 rounded-lg" theme="farmer" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" theme="farmer" />
                        <Skeleton className="h-3 w-48" theme="farmer" />
                      </div>
                      <Skeleton className="h-3 w-20" theme="farmer" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FarmerLayout>
  )
} 