import React from "react";
import UserMenu from "../../../components/layout/UserMenu";
import Layout from "../../../components/layout/Layout";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-full md:col-span-2 bg-gray-800 md:m-4 mt-2 md:mt-0 h-28">
            <UserMenu />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
