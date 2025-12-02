import React from "react"
import { Star } from "lucide-react"

const StartRating = ({ rating }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < rating ? "fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
    </div>
  )
}

export default StartRating
