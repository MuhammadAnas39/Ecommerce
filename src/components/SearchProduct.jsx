import React from "react";
import { useSearch } from "../context/searchContext";
import Layout from "./layout/Layout";

const SearchProduct = () => {
  const [data] = useSearch();
  return (
    <Layout title="Search Product">
      <div className="lg:col-span-3">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
              {data.map((product) => (
                <div
                  key={product._id}
                  className="group relative border-2 border-gray-300 p-2 rounded-md"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={`/api/v1/product/product-photo/${product._id}`}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-green-600 font-semibold">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 "
                        />
                        {product.name}
                      </h3>
                      <h3 className="text-xs text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.description.substring(0, 120)}
                      </h3>
                      <h3 className="text-sm font-bold text-green-600 my-2">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 "
                        />
                        ${product.price}
                      </h3>
                      <div className="w-full flex items-center justify-evenly gap-3">
                        <button className="bg-green-600 rounded-md w-full py-1 text-white">
                          Read More
                        </button>
                        <button className="bg-red-600 rounded-md w-full py-1 text-white">
                          Add to Cart
                        </button>
                      </div>
                      <div className="absolute top-2 right-0 bg-green-600 text-white font-semibold px-4 rounded-tl-md rounded-bl-md">
                        {product.category.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchProduct;
