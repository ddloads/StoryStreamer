// Header.js
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';

const Header = ({ onToggleDarkMode }) => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
    if (onToggleDarkMode) {
      onToggleDarkMode(isDarkMode);
    }
  };

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate('/login');
      })
      .catch((error) => console.error(error));
    setIsDropdownOpen(false);
  };

  const avatarUrl = user?.photoURL || 'https://avatar.iran.liara.run/public';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = (
    <>
      <li><NavLink to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={closeDropdown}>Home</NavLink></li>
      <li><NavLink to="/library" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={closeDropdown}>Library</NavLink></li>
      {!user && (
        <>
          <li><NavLink to="/login" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={closeDropdown}>Login</NavLink></li>
          <li><NavLink to="/register" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={closeDropdown}>Register</NavLink></li>
        </>
      )}
    </>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-16">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <header className="bg-gray-800 z-50 dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" onClick={closeDropdown}>
              <span className="text-white text-xl font-bold">StoryStreamer</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              {user ? (
                <div className="ml-3 relative" ref={dropdownRef}>
                  <div>
                    <button 
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" 
                      id="user-menu" 
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={avatarUrl} alt="" />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div 
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50" 
                      role="menu" 
                      aria-orientation="vertical" 
                      aria-labelledby="user-menu"
                    >
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={closeDropdown}>Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={closeDropdown}>Settings</Link>
                      <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={closeDropdown}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
