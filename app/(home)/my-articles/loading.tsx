import { Skeleton } from '@/components/WritePageSkeleton'
import React from 'react'

const loading = () => {
  return (
    <div className="w-full max-w-3xl mx-auto h-full space-y-5">
      <div className="w-full h-32 relative">
          <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div className="w-full h-32 relative">
          <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div className="w-full h-32 relative">
          <Skeleton className="w-full h-full rounded-lg" />
      </div>
  </div>
  )
}

export default loading