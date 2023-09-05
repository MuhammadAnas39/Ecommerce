import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [qty, setQty] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  const [auth] = useAuth();
  async function getAllCategories() {
    const { data } = await axios.get("/api/v1/category/get-all-categories");
    try {
      if (data?.success) {
        setCategories(data?.allCategories);
        console.log(categories);
      }
    } catch (error) {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const product = new FormData();
      product.append("name", name);
      product.append("description", description);
      product.append("photo", photo);
      product.append("price", price);
      product.append("qty", qty);
      product.append("category", category);
      product.append("shipping", shipping);

      axios.post("/api/v1/product/create-product", product, {
        headers: {
          Authorization: auth?.token,
        },
      });

      toast.success("Product Created Successfully");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 1000);
    } catch (error) {
      toast.error("something went");
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className=" col-span-full md:col-span-2 bg-gray-800 md:m-4 mt-2 md:mt-0 h-56">
            <AdminMenu />
          </div>
          <div className="col-span-full md:col-span-4 p-4 m-4">
            <p className="w-full  font-semibold text-center">Create Product</p>

            <form onSubmit={handleCreate}>
              <div className="border-b border-gray-900/10 pb-12">
                <select
                  className="w-full mt-4"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select Category</option>
                  {categories?.map((c) => (
                    <option value={c._id}>{c.name}</option>
                  ))}
                </select>

                <div>
                  <label className="btn btn-outline-secondary w-full mt-4">
                    {photo ? photo?.name : "Choose Image"}
                    <input
                      onChange={(e) => setPhoto(e.target.files[0])}
                      name="photo"
                      accept="image/*"
                      type="file"
                      className="w-full"
                      hidden
                    />
                  </label>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="qty"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Quantity
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setQty(e.target.value)}
                        type="number"
                        name="qty"
                        id="qty"
                        value={qty}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="shipping"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Shipping
                    </label>
                    <div className="mt-2">
                      <select
                        onChange={(e) => setShipping(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>Select Shipping</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  style={{ background: "green" }}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
