import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FarmerOrdersLoading() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="farmer" />
          <Skeleton className="h-4 w-80" theme="farmer" />
        </div>

        {/* Filters Skeleton */}
        <Card className="border-green-100">
          <CardHeader>
            <Skeleton className="h-6 w-32" theme="farmer" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-lg" theme="farmer" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" theme="farmer" />
                      <Skeleton className="h-4 w-24" theme="farmer" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-5 w-20" theme="farmer" />
                    <Skeleton className="h-4 w-16" theme="farmer" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" theme="farmer" />
                    <Skeleton className="h-4 w-32" theme="farmer" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" theme="farmer" />
                    <Skeleton className="h-4 w-28" theme="farmer" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" theme="farmer" />
                    <Skeleton className="h-4 w-20" theme="farmer" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Skeleton className="h-6 w-24" theme="farmer" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" theme="farmer" />
                    <Skeleton className="h-8 w-24" theme="farmer" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FarmerLayout>
  )
} 