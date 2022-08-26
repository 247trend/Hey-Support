import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Hey Support</Link>
      </div>
      <ul>
        <li>
          <Link to="/register">
            <FaSignInAlt />
            Regsiter
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaUser />
            Login
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
