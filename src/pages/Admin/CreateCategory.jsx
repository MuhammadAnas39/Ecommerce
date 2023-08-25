import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import EditCatModal from "../../components/EditCatModal";
import DeleteCatModal from "../../components/DeleteCatModal";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const cancelButtonRef = useRef(null);

  async function createCategory(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        {
          name: catName,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        setCatName("");
        toast.success(`${catName} category created`);
        getAllCategories();
      }
    } catch (error) {
      toast.error("error in creating category");
    }
  }

  async function getAllCategories() {
    const { data } = await axios.get("/api/v1/category/get-all-categories");
    try {
      if (data.success) {
        setCategories(data.allCategories);
      }
    } catch (error) {
      toast.error(data.message);
    }
  }

  function editButton(category) {
    setOpen(true);
    setSelectedCategory(category);
  }

  function deleteButton(category) {
    setDeleteOpen(true);
    setSelectedCategory(category);
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-6">
          <div className="col-span-2 bg-gray-800 m-4 h-36">
            <AdminMenu />
          </div>

          <div className="p-4 m-4 col-span-4">
            <p className="w-full  font-semibold text-center">
              Manage Categories
            </p>
            <form onSubmit={createCategory}>
              <label
                htmlFor="catName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Category Name
              </label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  id="catName"
                  name="catName"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  style={{ background: "green" }}
                  className="px-3 py-2 rounded-md text-white"
                >
                  Create
                </button>
              </div>
            </form>

            <div className="table-responsive-sm mt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {categories.map((e, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{e.name}</td>
                        <td>
                          <button
                            onClick={() => editButton(e)}
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteButton(e)}
                            className="btn btn-danger ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
          </div>

          <EditCatModal
            open={open}
            setOpen={setOpen}
            cancelButtonRef={cancelButtonRef}
            selectedCategory={selectedCategory}
            getAllCategories={getAllCategories}
          />
          <DeleteCatModal
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            cancelButtonRef={cancelButtonRef}
            selectedCategory={selectedCategory}
            getAllCategories={getAllCategories}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
