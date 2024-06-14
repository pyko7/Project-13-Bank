import { useDispatch, useSelector } from "react-redux";
import AccountCard from "../components/AccountCard/AccountCard";
import Layout from "../components/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { setUserData, updateUserData } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(null);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
  });

  const fetchData = useCallback(async () => {
    const url = `${apiUrl}/user/profile`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      setFetchedData(data);
      return data;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }, []);

  const getUserData = useCallback(async () => {
    if (!fetchedData) return;

    dispatch(
      setUserData({
        id: fetchedData.body.id,
        email: fetchedData.body.email,
        firstName: fetchedData.body.firstName,
        lastname: fetchedData.body.lastname,
      })
    );
  }, [dispatch, fetchedData]);

  const updateUser = async () => {
    const formData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
    };

    const url = `${apiUrl}/user/profile`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      return data;
    } catch (error) {
      console.log({ error });
      return error;
    }
  };

  const handleEditMode = () => {
    setIsEditMode((prevIsEditMode) => !prevIsEditMode);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await updateUser();

    // TODO: update error message
    if (!user) throw new Error("No user");
    const { firstName, lastName } = user.body;
    if (!firstName || !lastName) return;

    dispatch(
      updateUserData({
        firstName,
        lastName,
      })
    );
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user?.firstName}
          </h1>
          <button className="edit-button" onClick={handleEditMode}>
            Edit Name
          </button>
        </div>
        {isEditMode && (
          <form>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" onChange={handleInputChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name</label>
              <input
                type="password"
                id="lastName"
                onChange={handleInputChange}
              />
            </div>
            <button className="sign-in-button" onClick={handleSubmit}>
              Update
            </button>
          </form>
        )}
        <h2 className="sr-only">Accounts</h2>
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="2,082.79"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="10,928.42"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="184.30"
          description="Current Balance"
        />
      </main>
    </Layout>
  );
};

export default ProfilePage;
