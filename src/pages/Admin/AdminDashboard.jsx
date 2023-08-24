import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-2 bg-gray-800 m-4">
            <AdminMenu />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
