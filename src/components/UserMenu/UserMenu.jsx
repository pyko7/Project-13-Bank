import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../features/user/userSlice";

const UserMenu = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <div className="main-nav-item-container">
      <Link className="main-nav-item" to="/profile">
        <i className="fa fa-user-circle"></i>
        <span>{user?.firstName}</span>
      </Link>

      <Link className="main-nav-item" onClick={handleLogout}>
        <i className="fa fa-sign-out"></i>
        <span>Sign Out</span>
      </Link>
    </div>
  );
};

export default UserMenu;
