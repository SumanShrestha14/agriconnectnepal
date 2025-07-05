"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageSquare, Calendar } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface Review {
  id: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
  customer: {
    name: string;
  };
  product: {
    name: string;
  };
  farmer: {
    name: string;
    farmName: string;
  };
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

interface ReviewsSectionProps {
  productId: string;
  showReviewButton?: boolean;
  onReviewClick?: () => void;
  customerCanReview?: boolean;
}

export function ReviewsSection({ productId, showReviewButton = false, onReviewClick, customerCanReview = false }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [productId, page])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch(`/api/reviews?productId=${productId}&page=${page}&limit=5`, {
        credentials: "include"
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch reviews")
      }
      
      const data = await response.json()
      
      if (page === 1) {
        setReviews(data.reviews)
        setStats(data.stats)
      } else {
        setReviews(prev => [...prev, ...data.reviews])
      }
      
      setHasMore(data.pagination.hasNextPage)
    } catch (err: any) {
      setError(err.message || "Failed to load reviews")
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  const handleHelpful = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: "POST",
        credentials: "include"
      })
      
      if (response.ok) {
        // Update the local state to reflect the new helpful count
        setReviews(prev => prev.map(review => 
          review.id === reviewId 
            ? { ...review, helpful: review.helpful + 1 }
            : review
        ))
      }
    } catch (error) {
      console.error("Error marking review as helpful:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Poor"
      case 2: return "Fair"
      case 3: return "Good"
      case 4: return "Very Good"
      case 5: return "Excellent"
      default: return ""
    }
  }

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="md" text="Loading reviews..." />
      </div>
    )
  }

  if (error && page === 1) {
    return (
      <Card className="border-red-100 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchReviews} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats && reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Customer Reviews
          </CardTitle>
          <CardDescription>Be the first to review this product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 mt-2">Share your experience with this product</p>
            {showReviewButton && onReviewClick && (
              <Button onClick={onReviewClick} className="mt-4">
                Write a Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Customer Reviews
              </CardTitle>
              <CardDescription>
                {stats?.totalReviews || 0} reviews from verified customers
              </CardDescription>
            </div>
            {(showReviewButton || customerCanReview) && onReviewClick && (
              <Button onClick={onReviewClick}>
                Write a Review
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {review.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{review.customer.name}</p>
                      <p className="text-sm text-gray-500">From {review.farmer.farmName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {getRatingText(review.rating)}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-700">{review.comment}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(review.createdAt)}
                      </span>
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Reviews"}
          </Button>
        </div>
      )}
    </div>
  )
} 