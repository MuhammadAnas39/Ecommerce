import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/routes/Private";
import { useAuth } from "./context/authContext";
import PageNotFound from "./components/layout/PageNotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRouute from "./components/routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AllUsers from "./pages/Admin/AllUsers";
import UserDashboard from "./pages/auth/user/UserDashboard";
import Profile from "./pages/auth/user/Profile";
import Orders from "./pages/auth/user/Orders";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SearchProduct from "./components/SearchProduct";

function App() {
  const [auth] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/search" element={<SearchProduct />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRouute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />

          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:name" element={<UpdateProduct />} />
          <Route path="products" element={<Product />} />
          <Route path="all-users" element={<AllUsers />} />
        </Route>
        {!auth?.user && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
