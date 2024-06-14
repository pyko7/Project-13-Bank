import { useDispatch, useSelector } from "react-redux";
import AccountCard from "../components/AccountCard/AccountCard";
import Layout from "../components/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { setUserData } from "../features/user/userSlice";

const UserPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState(null);

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
            {user.firstName}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
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

export default UserPage;
