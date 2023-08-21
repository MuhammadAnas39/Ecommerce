import React from "react";
import Layout from "./Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div
        style={{ height: "80vh", width: "100%" }}
        className="flex justify-center items-center flex-col"
      >
        <h1 className="text-6xl font-semibold">404</h1>
        <p className="text-4xl font-semibold">PAGE NOT FOUND!</p>
      </div>
    </Layout>
  );
};

export default PageNotFound;
