import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const [auth] = useAuth();
  console.log(auth);
  return (
    <Layout title="Best Offers">
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
