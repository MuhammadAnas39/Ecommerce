import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/authContext";

export default function EditCatModal({
  open,
  setOpen,
  cancelButtonRef,
  selectedCategory,
  getAllCategories,
}) {
  const [auth] = useAuth();
  const [updateName, setUpdatedName] = useState("");

  async function updateCategory() {
    setOpen(false);

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selectedCategory._id}`,
        { name: updateName },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${updateName} Updated Successfully`);
        getAllCategories();
      }
    } catch (error) {
      toast.error("error in update category");
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-center bg-gray-800 rounded-tr-md rounded-tl-md text-white text-xl py-1">
                  Update Category
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <input
                        defaultValue={selectedCategory.name}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        id="updateName"
                        name="updateName"
                        type="text"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    style={{ background: "green" }}
                    className="py-2 inline-flex w-full justify-center  rounded-md  px-3  text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                    onClick={updateCategory}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
