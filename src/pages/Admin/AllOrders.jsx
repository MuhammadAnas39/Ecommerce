import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/authContext";
import AdminMenu from "../../components/layout/AdminMenu";
import Pagination from "../../components/Pagination";
import moment from "moment";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  let status = ["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"];

  const [auth] = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = orders.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(orders.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  function prePageFunc() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(page) {
    setCurrentPage(page);
  }
  function nextPageFunc() {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function getOrders() {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data.order);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleStatusChange(orderId, e) {
    try {
      await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        { status: e.target.value },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6 gap-4 md:gap-0">
          <div className="col-span-full md:col-span-2 bg-gray-800 md:m-4 mt-2 md:mt-0 h-56">
            <AdminMenu />
          </div>
          <div className="col-span-full md:col-span-4 md:p-4 md:m-4 ">
            <div className="table-responsive">
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
                  {records.map((o, i) => (
                    <>
                      <tr key={i} className="bg-gray-100">
                        <th scope="row">
                          {i + 1 + (currentPage - 1) * recordsPerPage}
                        </th>
                        <td>
                          <select
                            // bordered={false}
                            className="border-none bg-transparent"
                            onChange={(e) => handleStatusChange(o._id, e)}
                            defaultValue={o.status}
                          >
                            {status.map((s, i) => (
                              <option key={i} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o.createdAt).fromNow}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                      <tr key={`products-${i}`}>
                        <td colSpan="6">
                          <ul className="-my-6 divide-y divide-gray-200">
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
            {nPages > 1 && (
              <Pagination
                prePageFunc={prePageFunc}
                numbers={numbers}
                changeCPage={changeCPage}
                nextPageFunc={nextPageFunc}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                lastIndex={lastIndex}
                firstIndex={firstIndex}
                nPages={nPages}
                records={records}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllOrders;
