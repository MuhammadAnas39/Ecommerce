import React from "react";
import Layout from "../components/layout/Layout";

const Contact = () => {
  return (
    <Layout title="Contact us">
      <div className="grid grid-cols-5 max-w-7xl mx-auto p-20">
        <div className="col-span-3">
          font-size: 32px; font-weight: bold; margin-bottom: 16px;
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <p className="leading-3 mb-4 font-lg">
            Feel free to get in touch with us. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam in justo justo. Sed a elit vitae
            nisl mattis pretium.
          </p>
          <p>Email: contact@example.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div className="contact-us-image">
          <img src="/contact-image.jpg" alt="Contact Us" />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
