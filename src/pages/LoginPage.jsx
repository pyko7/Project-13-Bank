import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { setToken } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

const LoginPage = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: formState.username,
      password: formState.password,
    };
    const user = await login(formData);
    const token = user?.body.token;

    if (!token) return;

    dispatch(setToken(token));
    navigate("/profile");
  };

  return (
    <Layout>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={handleInputChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" onClick={handleSubmit}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default LoginPage;
