import '../styles/header.scss';
import logo from '../assets/rr-jain-logo.png';
import { useNavigate } from "react-router-dom";


export function Header () {
    const navigate = useNavigate();
    return (
        <>
          <header className="header">
      <div className="header-container">
        
        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#">Shirts</a>
          <a href="#">T-Shirts</a>
          <a href="#">Polo T-Shirts</a>
          <a href="#">Jeans</a>
          <a href="#">Contact</a>
        </nav>

        {/* Logo Section */}
        <div className="logo">
          {/* ✅ Standard img tag */}
          <img src={logo} alt="Logo" width="70" height="60" />
        </div>

        {/* Search + Login Section */}
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Search products..." />
            <button>🔍</button>
          </div>
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="login-btn" onClick={() => navigate("/signup")}>Sign up</button>
        </div>
      </div>
    </header>
        </>
    )
}