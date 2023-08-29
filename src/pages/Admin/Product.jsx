import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      setProducts(data?.products);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-full md:col-span-2 bg-gray-800 m-4 h-44">
            <AdminMenu />
          </div>
          <div className="col-span-full md:col-span-4 p-4 m-4">
            <p className="w-full  font-semibold text-center">All Products</p>

            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/dashboard/product/${product.name}`}
                      className="hover:no-underline"
                    >
                      <div className="group relative border-2 border-gray-300 p-2 rounded-md">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 "
                              />
                              {product.name}
                            </h3>
                            <h3 className="text-xs text-gray-700">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.description.substring(0, 150)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
