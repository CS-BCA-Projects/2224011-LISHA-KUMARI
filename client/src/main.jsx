import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import Home from './pages/Dashboard/Home.jsx'
import AdminDashboard from './pages/Dashboard/AdminDashboard.jsx'
import Login from './pages/Credentials/Login.jsx'
import ReportItem from './pages/Items/ReportItem.jsx'
import ViewReportedItems from './pages/Items/ViewReortedItems.jsx'
import Notification from '../../server/models/Notification.js'
import Contact from './pages/Contact.jsx'
import UpdateReportedItem from './pages/Items/UpdateReportItem.jsx'
import EmailVerify from './pages/Credentials/EmailVerify.jsx'
import ResetPassword from './pages/Credentials/ResetPassword.jsx'
import BrowseLostFound from './pages/Items/BrowseLostFound.jsx'


const router = createBrowserRouter([

  {
    path : '/',
    element : (
    <Home/>
  )
  },
  {
    path : '/admin',
    element :( <AdminDashboard/>
    )
  },
  {
    path : '/login',
    element : (
    <Login/>
    ) ,
  },
  {
    path : '/report',
    element :(
       <ReportItem/>
    ),
  },
  {
    path : '/report/:type',
    element : (
      <ReportItem/>
    )
  },
  {
    path :'/view-reported-items' ,
    element :( <ViewReportedItems />
    ),
  },
  {
    path : '/browse-lost-found',
    element : (
    <BrowseLostFound />
    ),
  },
  {
    path : '/notifications',
    element :(
       <Notification/>
    )
  },
  {
    path : '/contact',
    element :(
       <Contact/>
    )
  },
  {
    path : '/update-reported-item/:id',
    element : (
      <UpdateReportedItem/>
    )
  },
  {
    path : '/email-verify',
    element : (
      <EmailVerify/>
    )
  },
  {
    path : '/reset-password',
    element : (
      <ResetPassword/>
    )
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AppContextProvider>
   <RouterProvider router={router} />
  </AppContextProvider>
  </StrictMode>
)
