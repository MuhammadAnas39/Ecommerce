import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
export default function AdminRouute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await axios.get("/api/v1/auth/admin-auth", {
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
    console.log(auth);
    if (auth?.token) checkAuth();
  }, [auth]);

  return ok ? <Outlet /> : <Loader />;
}
