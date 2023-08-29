import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.name}`
      );
      setProduct(data?.product);
      console.log(product);
      // const data = axios.put(
      //   `/api/v1/product/update-product/64eb029ce8ab81f4bc018666}`
      // );
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (params?.name.length) getProduct();
  }, [params?.name.length]);
  console.log(params);
  return (
    <Layout title={`Product-Detail`}>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={`/api/v1/product/product-photo/${product?._id}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                PRODUCT NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>

              <p className="leading-relaxed">{product?.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex items-center">
                  <span className="mr-3 font-semibold">Category</span>

                  <p className="text-xs">{product?.category?.name}</p>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product?.price}
                </span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
