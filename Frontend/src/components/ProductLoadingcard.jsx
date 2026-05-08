import React from 'react'

const ProductLoadingcard = () => {
  return (
     <div className="shadow-sm rounded-lg p-3 w-full max-w-[200px] min-w-[150px] shadow">
      
      <div className="bg-blue-300 animate-pulse h-40 w-full rounded-md mb-3"></div>

      <div className="bg-blue-300 animate-pulse h-4 w-3/4 rounded mb-2"></div>

      <div className="bg-blue-300 animate-pulse h-4 w-1/2 rounded mb-2"></div>

      <div className="bg-blue-300 animate-pulse h-8 w-full rounded"></div>

    </div>
  )
}

export default ProductLoadingcard
