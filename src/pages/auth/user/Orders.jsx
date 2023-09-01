import React, { useState, useEffect } from "react";
import UserMenu from "../../../components/layout/UserMenu";
import Layout from "../../../components/layout/Layout";
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  async function getOrders() {
    try {
      const { data } = await axios.get("/api/v1/auth/orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      console.log(data);
      setOrders(data.order);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-2 bg-gray-800 m-4">
            <UserMenu />
          </div>
          <div className="col-span-4 p-4 m-4">
            <table className="table table-bordered border-primary">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Orders</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <>
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                    <tr key={`products-${i}`}>
                      <td colSpan="6">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {o?.products?.map((product) => (
                            <li key={product._id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={`/api/v1/product/product-photo/${product._id}`}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product?.name}</h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.description.substring(0, 220)}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {product.quantity}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
