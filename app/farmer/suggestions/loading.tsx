import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SuggestionsLoading() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Market Trends Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter Skeleton */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24" />
          ))}
        </div>

        {/* Suggestions List Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-16 h-2" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
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
