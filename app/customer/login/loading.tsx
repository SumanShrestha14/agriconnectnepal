import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerLoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4">
      <Card className="w-full max-w-md border-blue-100 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
            <Skeleton className="w-8 h-8 rounded" theme="customer" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 mx-auto" theme="customer" />
            <Skeleton className="h-4 w-48 mx-auto" theme="customer" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" theme="customer" />
            <Skeleton className="h-10 w-full" theme="customer" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" theme="customer" />
            <Skeleton className="h-10 w-full" theme="customer" />
          </div>
          <Skeleton className="h-10 w-full" theme="customer" />
          <div className="text-center">
            <Skeleton className="h-4 w-32 mx-auto" theme="customer" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 