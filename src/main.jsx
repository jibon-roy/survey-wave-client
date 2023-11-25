import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import CustomThemeProvider from './utility/theme/CustomThemeProvider'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CustomThemeProvider>
      <div className='max-w-[1400px] mx-auto'>
        <RouterProvider router={router} />
      </div>
    </CustomThemeProvider>
  </React.StrictMode>,
)
