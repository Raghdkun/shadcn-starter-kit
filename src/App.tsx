import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const App: React.FC = () => {

  
  return (
    <>
    <div className="overflow-hidden">
      <Outlet />
      <Toaster position="bottom-right" richColors closeButton />
    </div>
    </>
  )
}

export default App
