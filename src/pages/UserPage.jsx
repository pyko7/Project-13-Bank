import AccountCard from "../components/AccountCard/AccountCard";
import Layout from "../components/Layout/Layout";

const UserPage = () => {
  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
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
