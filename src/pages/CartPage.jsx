import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cartContext";
import DropIn from "braintree-web-drop-in-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Button } from "antd";

export default function CartPage() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const removemCartItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  async function getToken() {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth.token]);

  function total() {
    let total = 0;
    cart.map((item) => (total += item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <Layout title="Cart">
      {cart.length ? (
        <div className=" max-w-7xl grid grid-cols-6  bg-white shadow-xl mt-4 mx-auto gap-8">
          <div className="col-span-4 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart?.map((product) => (
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

                          <div className="flex">
                            <button
                              onClick={() => removemCartItem(product._id)}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-2 shadow-md px-4 py-6 sm:px-6 min-h-56 ">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{total()}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>

            <div className="mt-6 w-full">
              {!clientToken || !auth?.token || !cart?.length ? (
                <h2 className="text-center text-red-600 font-semibold">
                  Please login to checkout
                </h2>
              ) : (
                <>
                  <DropIn
                    options={{ authorization: clientToken }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    style={{ width: "100%" }}
                    disabled={!auth?.user?.address || !instance}
                    onClick={handlePayment}
                  >
                    {loading ? "Processing..." : "Checkout"}
                  </Button>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "70vh" }}
          className="w-full h-[100vh] flex justify-center items-center flex-col"
        >
          <h2 className="text-lg"> Your shopping cart is empty.</h2>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-primary mt-6"
          >
            Continue shopping
          </button>
        </div>
      )}
    </Layout>
  );
}
