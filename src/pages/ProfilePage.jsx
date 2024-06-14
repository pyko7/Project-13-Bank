import { useDispatch, useSelector } from "react-redux";
import AccountCard from "../components/AccountCard/AccountCard";
import Layout from "../components/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { setUserData } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../utils/user";
import UpdateUserForm from "../components/UpdateUserForm/UpdateUserForm";

const ProfilePage = () => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const storeUserData = useCallback(() => {
    if (!fetchedData) return;

    dispatch(
      setUserData({
        id: fetchedData.body.id,
        email: fetchedData.body.email,
        firstName: fetchedData.body.firstName,
        lastName: fetchedData.body.lastName,
      })
    );
  }, [dispatch, fetchedData]);

  const handleEditMode = () => {
    setIsEditMode((prevIsEditMode) => !prevIsEditMode);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      const user = await fetchUserData(token);
      setFetchedData(user);
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    storeUserData();
  }, [storeUserData, token]);

  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          {isEditMode ? (
            <h1>Welcome back</h1>
          ) : (
            <>
              <h1>
                Welcome back
                <br />
                {`${user?.firstName} ${user?.lastName}`}
              </h1>
              <button className="edit-button" onClick={handleEditMode}>
                Edit Name
              </button>
            </>
          )}
        </div>
        {isEditMode && <UpdateUserForm setIsEditMode={setIsEditMode} />}
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
