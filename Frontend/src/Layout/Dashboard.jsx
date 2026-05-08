import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenu from '../components/UserMenu'

const Dashboard = () => {
  return (
      <div className='grid grid-cols-[250px_1fr] h-screen overflow-hidden'>
      
      {/* Sidebar */}
      <div className='bg-white border-r h-full sticky top-0'>
        <UserMenu/>
      </div>

      {/* Main Content */}
      <div className='p-4 overflow-y-auto'>
        <Outlet/>
      </div>

    </div>
  )
}

export default Dashboard
