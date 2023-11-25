import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import CustomThemeProvider from './utility/theme/CustomThemeProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <div className='text-[#0300303] bg-[#F5F5F5]'>
          <div className='max-w-[1400px] min-h-screen mx-auto '>
            <RouterProvider router={router} />
          </div>
        </div>
      </CustomThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
