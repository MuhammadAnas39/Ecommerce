import React from "react";
import { TailSpin } from "react-loader-spinner";
import Layout from "./layout/Layout";
const Loader = () => {
  return (
    <Layout>
      <div
        style={{ height: "80vh" }}
        className="w-full flex justify-center items-center"
      >
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </Layout>
  );
};

export default Loader;
