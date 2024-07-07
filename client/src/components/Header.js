// client/src/components/Header.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/components/Header.css';
import { auth } from '../firebase';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSignOut = () => {
    auth.signOut();
  };

  const avatarUrl = currentUser?.photoURL || 'https://avatar.iran.liara.run/public';

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/library">Library</Link></li>
        </ul>
        <div className="user-menu-container">
          {currentUser ? (
            <div className="user-menu" onClick={() => setDropdownVisible(!dropdownVisible)}>
              <img src={avatarUrl} alt="User Avatar" />
              <span>{currentUser.displayName || currentUser.email}</span>
              {dropdownVisible && (
                <div className="dropdown">
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleSignOut}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
