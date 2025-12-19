

import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Phone, Mail, Clock, Search, User, Settings, Droplets, X } from 'lucide-react' // Added X icon// adjust path as needed
import { useAuth } from "../context/AuthContext";
import UserMenu from './UI/UserMenu';


function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false)
  const [onAuth, setOnAuth]= useState(false)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname === '/auth/login') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location.pathname]);

  useEffect(() => {
  if (location.pathname.startsWith('/auth/')) {
    setOnAuth(true);
  } else {
    setOnAuth(false);
  }
}, [location.pathname]);
  // Effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);


  const menuItems = ["Home", "Services", "About Us", "Contact"]

  return (
    <header className={`fixed top-0 left-0 min-w-screen max-w-screen z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-transparent'} ${onAuth ? 'shadow-sm max-h-20' : ''}`}>
      {/* Top Bar */}

      {/* Main Nav */}
      <div className="w-full ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="md:h-25  md:w-25 h-18 w-18 flex items-center overflow-hidden -mt-1">
              <img
                src='/logo.png'
                alt="logo"
                className="h-12 w-auto object-cover object-top"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                className={`transition-colors font-medium ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className={`hidden md:flex w-10 h-10 items-center justify-center rounded-full transition ${isScrolled ? 'text-gray-800 hover:bg-blue-50' : 'text-white hover:bg-white/10'}`}>
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <UserMenu onLogout={logout} />
            ) : (
              <button
                onClick={() => isLogin ? navigate("auth/register") : navigate("/auth/login")}
                className={` ${isScrolled ? 'text-white bg-black' : 'text-white border border-white hover:text-secondary hover:bg-white '}  rounded-full   transition-all w-15 h-6 text-sm sm:w-20 sm:mr-2 sm:h-8 duration-500`}>
                {isLogin ? 'Sign up' : 'Log In'}
              </button>
            )}




            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)} // Open menu
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 ${isScrolled ? 'text-gray-800 hover:bg-blue-50' : 'text-white hover:bg-white/10'}`}
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        


        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 overflow-x-hidden h-screen bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ overflowX: "hidden" }} // Close menu when clicking outside
        >
          <div
            className={`fixed top-0 right-0 h-screen w-2/3 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out p-6 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu content
          >
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="flex flex-col gap-6 text-xl font-semibold text-gray-800">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="block py-2 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on item click
                >
                  {item}
                </Link>
              ))}
            </nav>

          </div>
        </div>
      </div>
    </header>
  )
}


export default Header;