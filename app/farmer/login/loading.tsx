import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FarmerLoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4">
      <Card className="w-full max-w-md border-green-100 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Skeleton className="w-8 h-8 rounded" theme="farmer" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 mx-auto" theme="farmer" />
            <Skeleton className="h-4 w-48 mx-auto" theme="farmer" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" theme="farmer" />
            <Skeleton className="h-10 w-full" theme="farmer" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" theme="farmer" />
            <Skeleton className="h-10 w-full" theme="farmer" />
          </div>
          <Skeleton className="h-10 w-full" theme="farmer" />
          <div className="text-center">
            <Skeleton className="h-4 w-32 mx-auto" theme="farmer" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 