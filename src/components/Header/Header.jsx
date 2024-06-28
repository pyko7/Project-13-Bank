import { Link } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu/UserMenu";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.token);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!isLoggedIn ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <UserMenu />
        )}
      </div>
    </nav>
  );
};

export default Header;
