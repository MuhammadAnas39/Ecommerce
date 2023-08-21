import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const AllUsers = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-2 bg-gray-800 m-4">
            <AdminMenu />
          </div>
          <div className="col-span-4  bg-blue-800 p-4 m-4">Users</div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
