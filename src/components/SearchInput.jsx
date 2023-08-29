import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [data, setdata] = useSearch();
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    setdata(
      result.filter((f) =>
        f.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await axios.get("/api/v1/product/get-all-products");
        setResult(res?.data?.products);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllProducts();

    // setPrevKeyword(value.keyword);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate("/product/search");
  }

  return (
    <div>
      {/* {JSON.stringify(value.data, null, 4)} */}
      <form className="d-flex gap-2" role="search" onSubmit={handleSearch}>
        <input
          onChange={handleChange}
          className="form-control me-2 bg-transparent border-2 border-gray-400 rounded-md "
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
