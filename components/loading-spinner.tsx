interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  theme?: "customer" | "farmer" | "landing"
}

export function LoadingSpinner({ size = "md", text, theme = "landing" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const themeColors = {
    customer: {
      primary: "border-blue-600",
      secondary: "border-blue-200",
      dots: "bg-blue-600",
      text: "text-blue-600"
    },
    farmer: {
      primary: "border-green-600",
      secondary: "border-green-200",
      dots: "bg-green-600",
      text: "text-green-600"
    },
    landing: {
      primary: "border-green-600",
      secondary: "border-green-200",
      dots: "bg-green-600",
      text: "text-green-600"
    }
  }

  const colors = themeColors[theme]

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 ${colors.secondary} ${colors.primary} border-t-current rounded-full animate-spin`}
        ></div>
      </div>
      {text && <p className={`text-sm ${colors.text} animate-pulse`}>{text}</p>}
      <div className="flex justify-center space-x-1">
        <div className={`w-2 h-2 ${colors.dots} rounded-full animate-bounce`}></div>
        <div className={`w-2 h-2 ${colors.dots} rounded-full animate-bounce`} style={{ animationDelay: "0.1s" }}></div>
        <div className={`w-2 h-2 ${colors.dots} rounded-full animate-bounce`} style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}
