import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  console.log(cart);

  const removemCartItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
  };

  return (
    <Layout title="Cart">
      {cart.length ? (
        <div className=" max-w-7xl grid grid-cols-6  bg-white shadow-xl mt-4">
          <div className="col-span-4 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart?.map((product) => (
                    <li key={product.id} className="flex py-6">
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

          <div className="col-span-2 shadow-md px-4 py-6 sm:px-6 max-h-56">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
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
