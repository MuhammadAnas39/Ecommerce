import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useCart } from "../context/cartContext";

const filter = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      {
        _id: 0,
        name: "$0 to 19",
        array: [0, 19],
      },
      {
        _id: 1,
        name: "$20 to 39",
        array: [20, 39],
      },
      {
        _id: 2,
        name: "$40 to 59",
        array: [40, 59],
      },
      {
        _id: 3,
        name: "$60 to 79",
        array: [60, 79],
      },
    ],
  },
];

export default function HomePage() {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);

  // -------------Pagination---------------
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(products.length / recordsPerPage);
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

  async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      setProducts(data?.products);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  function handleCatChange(value, id) {
    let all = [...check];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  }

  const filterProduct = async () => {
    const { data } = await axios.post("/api/v1/product/product-filter", {
      check,
      radio,
    });
    setProducts(data?.product);
  };
  useEffect(() => {
    if (!check.length || !radio.length) getAllProducts();
  }, [check.length, radio.length]);
  useEffect(() => {
    if (check.length || radio.length) filterProduct();
  }, [check, radio]);

  function handleReload(e) {
    e.preventDefault();
    window.location.reload();
  }

  return (
    <Layout title="Best Offers">
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {filter.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={optionIdx}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {filter.map((section, index) => (
                    <Disclosure
                      as="div"
                      key={index}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            {section.id === "category" ? (
                              <>
                                {categories?.map((c) => (
                                  <div key={c._id} className="space-y-4">
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleCatChange(
                                            e.target.checked,
                                            c._id
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${c._id}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {c.name}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="space-y-4">
                                <Radio.Group
                                  onChange={(e) => setRadio(e.target.value)}
                                >
                                  {section.options.map((p) => (
                                    <div key={p._id}>
                                      <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                  ))}
                                </Radio.Group>
                              </div>
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  <button
                    onClick={(e) => handleReload}
                    className="mt-4 w-full py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800"
                  >
                    Reset Filter
                  </button>
                </form>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                      <div className="mt-2 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                        {records.map((product) => (
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
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                  />
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
                                  <Button
                                    style={{
                                      background: "green",
                                      color: "white",
                                    }}
                                    onClick={() =>
                                      navigate(`/product/${product.name}`)
                                    }
                                    type="button"
                                    class="btn btn-outline-warning"
                                  >
                                    Read More
                                  </Button>
                                  <Button
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
                                        // If product doesn't exist in cart, add it with quantity 1
                                        setCart([
                                          ...cart,
                                          { ...product, quantity: 1 },
                                        ]);
                                      }
                                    }}
                                    style={{
                                      background: "red",
                                      color: "white",
                                    }}
                                    // onClick={() => Navigate("/produc")}
                                    className="bg-red-600 rounded-md w-full py-1 text-white cursor-pointer"
                                  >
                                    Add to Cart
                                  </Button>
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
              </div>
            </section>
          </main>
        </div>
      </div>
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
    </Layout>
  );
}
