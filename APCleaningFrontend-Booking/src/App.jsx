import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navigation from './components/Navigation.jsx'
import Home from './pages/users/Home.jsx'
import Pricing from './pages/users/Pricing.jsx'
import Booking from './pages/users/Booking.jsx'
import Shop from './pages/users/Shop.jsx'
import About from './pages/users/About.jsx'
import Contact from './pages/users/Contact.jsx'
import FAQ from './pages/users/FAQ.jsx'
import UserDashboard from './pages/registeredUsers/UserDashboard.jsx'
import Register from './pages/registeredUsers/Register.jsx'
import Login from './pages/registeredUsers/Login.jsx'
import ForgotPassword from './pages/users/ForgotPassword.jsx'
import {Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/users/Error.jsx'
import PaymentSuccess from './pages/users/PaymentSuccess.jsx'
import PaymentCancelled from './pages/users/PaymentCancelled.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ManageBookings from './pages/admin/ManageBookings.jsx'
import ManageServices from './pages/admin/ManageServices.jsx'
import ManageCleaners from './pages/admin/ManageCleaners.jsx'
import ManageDrivers from './pages/admin/ManageDrivers.jsx'
import ManageProducts from './pages/admin/ManageProducts.jsx'
import ManageInquiries from './pages/admin/ManageInquiries.jsx'
import UserSettings from './pages/registeredUsers/UserSettings.jsx'
import EditDriver from './pages/admin/EditDriver.jsx'
import EditCleaner from './pages/admin/EditCleaner.jsx'
import EditService from './pages/admin/EditService.jsx'
import EditProduct from './pages/admin/EditProduct.jsx'
import CleanerDashboard from './pages/cleaner/CleanerDashboard.jsx'
import DriverDashboard from './pages/driver/DriverDashboard.jsx'
import Analytics from './pages/admin/Analytics.jsx'
import ResetPassword from './pages/registeredUsers/ResetPassword.jsx'
import ViewWaitlist from './pages/admin/ViewWaitlist.jsx'
import Feedback from './pages/registeredUsers/Feedback.jsx'
import CleanerFeedbackViewer from './pages/cleaner/CleanerFeedbackViewer.jsx'
import ManageFeedback from './pages/admin/ManageFeedback.jsx'
import ManageDispatchNotes from './pages/admin/ManageDispatchNotes.jsx'


function App() {
  return (
    <>
    <Navigation/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='pricing' element={<Pricing/>}/>
      <Route path='book' element={<Booking/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='faq' element={<FAQ/>}/>
      <Route path='profile' element={
        <ProtectedRoute allowedRoles={["Customer"]}>
          <UserDashboard/>
          </ProtectedRoute>}/>
          <Route path='settings' element={
        <ProtectedRoute allowedRoles={["Customer"]}>
          <UserSettings/>
          </ProtectedRoute>}/>
          <Route path='feedback' element={
        <ProtectedRoute allowedRoles={["Customer"]}>
          <Feedback/>
          </ProtectedRoute>}/>
          <Route path='cleaner-dashboard' element={
        <ProtectedRoute allowedRoles={["Cleaner"]}>
          <CleanerDashboard/>
          </ProtectedRoute>}/>
          <Route path='cleaner-feedback-viewer' element={
        <ProtectedRoute allowedRoles={["Cleaner"]}>
          <CleanerFeedbackViewer/>
          </ProtectedRoute>}/>
          <Route path='driver-dashboard' element={
        <ProtectedRoute allowedRoles={["Driver"]}>
          <DriverDashboard/>
          </ProtectedRoute>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='manage-bookings' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageBookings/>
          </ProtectedRoute>}/>
          <Route path='manage-services' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageServices/>
          </ProtectedRoute>}/>
          <Route path='manage-cleaners' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageCleaners/>
          </ProtectedRoute>}/>
          <Route path='manage-drivers' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageDrivers/>
          </ProtectedRoute>}/>
          <Route path='manage-products' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageProducts/>
          </ProtectedRoute>}/>
          <Route path='manage-inquiries' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageInquiries/>
          </ProtectedRoute>}/>
          <Route path='analytics' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <Analytics/>
          </ProtectedRoute>}/>
          <Route path='waitlist' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ViewWaitlist/>
          </ProtectedRoute>}/>
          <Route path='manage-feedback' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageFeedback/>
          </ProtectedRoute>}/>
          <Route path='manage-notes' element={
        <ProtectedRoute allowedRoles={["Admin"]}>
          <ManageDispatchNotes/>
          </ProtectedRoute>}/>
      <Route path='login/reset-password' element={<ResetPassword/>}/>
      <Route path='login/forgot-password' element={<ForgotPassword/>}/>
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="payment-cancelled" element={<PaymentCancelled />} />

      <Route path="/edit-driver/:id" element={<EditDriver/>} />
      <Route path="/edit-cleaner/:id" element={<EditCleaner/>} />
      <Route path="/edit-service/:id" element={<EditService/>} />
      <Route path="/edit-product/:id" element={<EditProduct/>} />



      {/* Catch-all route for 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  )
}

export default App
