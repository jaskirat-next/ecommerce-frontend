import '../styles/header.scss';
import logo from '../assets/logo.png';

export function Header () {
    return (
        <>
          <header className="header">
      <div className="header-container">
        
        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="#">Home</a>
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
          <button className="login-btn">Login</button>
        </div>
      </div>
    </header>
        </>
    )
}