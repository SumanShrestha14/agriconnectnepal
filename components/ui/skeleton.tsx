import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "customer" | "farmer" | "landing"
}

function Skeleton({ className, theme = "landing", ...props }: SkeletonProps) {
  const themeColors = {
    customer: "bg-blue-100",
    farmer: "bg-green-100", 
    landing: "bg-gray-200"
  }

  return (
    <div
      className={cn(
        "animate-pulse rounded-md",
        themeColors[theme],
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
