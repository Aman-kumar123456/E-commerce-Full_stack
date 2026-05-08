import React from 'react'
import nodata from '../assets/Nodata.png'
const Nodata = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img src={nodata}
        alt='nodata'
        className='h-40 w-40'/>
        <p className='text-black font-semibold'>Nothing Avilable</p>
      </div>
    </div>
  )
}

export default Nodata
