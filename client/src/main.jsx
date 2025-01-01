import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router'
import { useContext } from 'react';
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// pages
import Login from './pages/Login'
import Registration from './pages/registration'
import Home from './pages/Home';
import CapsulePage from './pages/CapsulePage';

// context 
import UserContext, { UserProvider } from './Contexts/Context';


const router = createBrowserRouter([
  {
    path: "/",
    element: <User><Home /></User>
  },
  {
    path: '/login',
    element: <no_user><Login /></no_user> 
  },
  {
    path: "/registration",
    element: <no_user><Registration /></no_user> 
  },
  {
    path: '/capsule/:capsule_id',
    element : <CapsulePage />
  }
])

function User({ children }) {
  const { user, isLoading } = useContext(UserContext)
  const location = useLocation()
  if (isLoading) {
    return null
  }
  if (user) {
    return children
  } else {
    return <Navigate to="/Login" state={{ from: location }} replace />
  }
}
function no_user({ children }) {
  const { user, isLoading } = useContext(UserContext)
  const location = useLocation()
  if (isLoading) {
    return null
  }
  if (!user) {
    return children
  } else {
    return <Navigate to="/" state={{ from: location }} replace />
  }
}

createRoot(document.getElementById('root')).render(
  <UserProvider >
    <RouterProvider router={router} />
  </UserProvider>
)
