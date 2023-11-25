import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import CustomThemeProvider from './utility/theme/CustomThemeProvider'




ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CustomThemeProvider>
      <div className='max-w-[1400px] min-h-screen text-[#0300303] mx-auto bg-[#F5F5F5]'>
        <RouterProvider router={router} />
      </div>
    </CustomThemeProvider>
  </React.StrictMode>,
)
