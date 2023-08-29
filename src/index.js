import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { SearchProvider } from "./context/searchContext";
import { CartProvider } from "./context/cartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
