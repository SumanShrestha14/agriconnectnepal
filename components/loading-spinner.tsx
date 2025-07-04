interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
        ></div>
      </div>
      {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}
