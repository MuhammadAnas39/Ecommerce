import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import UserMenu from "../../../components/layout/UserMenu";
import Layout from "../../../components/layout/Layout";
import { useAuth } from "../../../context/authContext";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.token) {
      const { name, email, address } = auth?.user;

      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.token, auth?.user]);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        {
          name,
          email,
          password,
          address,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout title="Profile">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-full md:col-span-2 bg-gray-800 md:m-4 mt-2 md:mt-0 h-28">
            <UserMenu />
          </div>
          <div className="col-span-4   p-4 m-4">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Update Profile
                </h2>
              </div>

              <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-0" onSubmit={handleRegister}>
                  <div>
                    <div className="mt-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="Name"
                        name="name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <input
                        disabled
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between"></div>
                    <div className="mt-2">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-2">
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        placeholder="Address"
                        name="address"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
