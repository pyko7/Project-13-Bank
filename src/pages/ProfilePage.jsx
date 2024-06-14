import { useDispatch, useSelector } from "react-redux";
import AccountCard from "../components/AccountCard/AccountCard";
import Layout from "../components/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { setUserData, updateUserData } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserData, updateUser } from "../utils/user";

const ProfilePage = () => {
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

  const storeUserData = useCallback(() => {
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
    const formData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
    };
    const user = await updateUser(token, formData);

    const { firstName, lastName } = user.body;
    if (!firstName || !lastName) return;

    dispatch(
      updateUserData({
        firstName,
        lastName,
      })
    );
    setIsEditMode(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUserData(token);
      setFetchedData(user);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    storeUserData();
  }, [storeUserData]);

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
