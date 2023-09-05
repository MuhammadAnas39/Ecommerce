import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.name}`
      );
      setProduct(data?.product);
      console.log(product);
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
                  <span className="mr-3">Quantity</span>
                  <div className="relative">
                    <p>{product?.qty}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product?.price}
                </span>
                <button
                  onClick={() => {
                    const existingProduct = cart.find(
                      (item) => item._id === product._id
                    );

                    if (existingProduct) {
                      // If product already exists in cart, update its quantity
                      const updatedCart = cart.map((item) =>
                        item._id === product._id
                          ? { ...item, qty: item.qty + 1 }
                          : item
                      );
                      setCart(updatedCart);
                    } else {
                      toast.success("Item added to cart");
                      // If product doesn't exist in cart, add it with quantity 1
                      setCart([...cart, { ...product, qty: 1 }]);
                    }
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                  }}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
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
