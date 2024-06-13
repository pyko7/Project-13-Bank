import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { setToken } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
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

  const login = async () => {
    const formData = {
      email: formState.username,
      password: formState.password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const res = await fetch(`${apiUrl}/user/login`, options);

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      return data;
    } catch (error) {
      console.log({ error });
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login();
    // TODO: update error message
    if (!user) throw new Error("No user");
    const token = user.body.token;
    if (token) {
      dispatch(setToken(token));
      navigate("/profile");
    }
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
