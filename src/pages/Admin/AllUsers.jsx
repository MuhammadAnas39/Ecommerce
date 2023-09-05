import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/authContext";
import AdminMenu from "../../components/layout/AdminMenu";
import Pagination from "../../components/Pagination";

const AllOrders = () => {
  const [users, setUsers] = useState([]);

  let defaultRole = ["admin", "user"];

  const [auth] = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(users.length / recordsPerPage);
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

  async function getUsers() {
    try {
      const { data } = await axios.get("/api/v1/auth/get-all-users", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setUsers(data?.user);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleRoleChange(orderId, e) {
    try {
      await axios.put(
        `/api/v1/auth/change-user-role/${orderId}`,
        { role: e.target.value },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
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
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((o, i) => (
                    <tr key={i} className="bg-gray-50">
                      <th scope="row">{o._id.substring(0, 10)}...</th>
                      <td>{o?.name}</td>
                      <td>{o?.email}</td>
                      <td>{o?.address}</td>
                      <td>
                        <select
                          // bordered={false}
                          className="border-none bg-transparent"
                          onChange={(e) => handleRoleChange(o._id, e)}
                          defaultValue={o.role}
                        >
                          {defaultRole.map((s, i) => (
                            <option key={i} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
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
