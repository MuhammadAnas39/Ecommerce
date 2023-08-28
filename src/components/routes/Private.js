import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get("/api/v1/auth/user-auth", {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) checkAuth();
  }, [auth]);

  return ok ? <Outlet /> : <Loader />;
}
