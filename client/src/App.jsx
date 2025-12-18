import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Header'
import UserDashboard from './pages/UserDashboard'
import ProfileOverview from './components/user/ProfileOverview'
import EmergencyContacts from './components/user/EmergencyContacts'
import Subscription from './components/user/Subscription'
import SettingsPanel from './components/user/SettingsPanel'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import UpdatePhone from './components/user/UpdatePhone'
import DeleteAccount from './components/user/Delete'
import ServicesPage from './pages/ServicesPage'
import AboutUsPage from './pages/AboutUs'
import Footer from "./components/Footer"
import ScrollToTop from './components/UI/ScrollToTop'
import ContactPage from './pages/Contact'
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/user');

  return (
    <div>
      <Toaster position="top-center" />
      <Header />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Signup />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Protected User Dashboard Routes */}
        <Route path="/user" element={<UserDashboard />}>
          <Route path="me" element={<ProfileOverview />} />
          <Route path="emergencyContacts" element={<EmergencyContacts />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="settings" element={<SettingsPanel />} />
          <Route path='update-phone' element={<UpdatePhone />} />
          <Route path='delete' element={<DeleteAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
