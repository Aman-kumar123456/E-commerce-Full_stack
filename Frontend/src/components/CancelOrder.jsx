import React from 'react'
import cancel from '../assets/cancel.png'
import { Link } from 'react-router-dom'
const CancelOrder = () => {
  return (
    <section className='flex items-center justify-center'>
  <div className='flex flex-col items-center justify-center mt-40 gap-2'>
            <div>
                <img src={cancel}
                alt={"cancelImage"}
                className='h-20 w-20'/>
            </div>
            <p className='font-semibold'>Order Cancel</p>
            <Link to={'/'}><button className='bg-green-300 min-w-[110px] max-w-[120px] rounded p-1 mt-20 border border-green-500'>Back to Home</button></Link>
      {/* SuccessOrder */}
    </div>
    </section>
  )
}

export default CancelOrder
