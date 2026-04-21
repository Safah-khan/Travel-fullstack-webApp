import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Booking from '../pages/Booking'
import BookingSuccess from '../pages/BookingSuccess'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/booking" 
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/booking-success" 
        element={
          <ProtectedRoute>
            <BookingSuccess />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}
