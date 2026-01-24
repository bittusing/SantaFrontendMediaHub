import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FiUpload, FiSearch, FiHome, FiLogOut } from 'react-icons/fi';
import '../styles/Navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>📁</span> MediaHub
        </Link>

        {isAuthenticated && (
          <div className="navbar-menu">
            <Link to="/dashboard" className="navbar-link">
              <FiHome /> Dashboard
            </Link>
            <Link to="/upload" className="navbar-link">
              <FiUpload /> Upload
            </Link>
            <Link to="/search" className="navbar-link">
              <FiSearch /> Search
            </Link>
          </div>
        )}

        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">👤 {user?.name}</span>
              <button onClick={handleLogout} className="navbar-button">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-button">
                Login
              </Link>
              <Link to="/register" className="navbar-button primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
