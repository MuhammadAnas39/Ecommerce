import React from "react";
import Layout from "../components/layout/Layout";
import about from "../assets/about.png";

const About = () => {
  return (
    <Layout title="About-ecommerce">
      <div className="max-w-7xl mx-auto  py-20">
        <div className="grid grid-cols-5 gap-4">
          <div className="md:col-span-3 col-span-full">
            <h1 className="mb-6 font-bold text-2xl">About Us</h1>
            <p className="text-lg leading-4 mb-4 ">
              Welcome to our About Us page! Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nullam in justo justo. Sed a elit
              vitae nisl mattis pretium.
            </p>
            <p>
              Our mission is to provide high-quality products and services to
              our customers. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
          </div>
          <div className="md:col-span-2 col-span-full">
            <img
              className="drop-shadow-xl shadow-black"
              src={about}
              alt="Company Team"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
