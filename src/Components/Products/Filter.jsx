import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Filter({ categories }) {
  // const {products, pagination} = useSelector(state => state.products);
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortBy") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    // console.log("SearchParams", params)

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setsearchTerm(currentSearchTerm);
  }, [searchParams]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params}`, { replace: true });
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder); // Update state first

    setTimeout(() => {
      // Wait for state to update
      params.set("sortBy", newOrder);
      navigate(`${pathname}?${params}`, { replace: true });
    }, 0);
  };

  const handleClearFilters = () => {
    navigate({ pathname: window.location.pathname }, { replace: true });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      if (searchParams.get("page") !== 1) {
        console.log("searchParams.set", searchParams.set("page", "1"))
        searchParams.set("page", "1");
      }
      navigate(`${pathname}?${searchParams.toString()}`, { replace: true });
    }, 700);
    // console.log("Pagination", pagination)

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, navigate, pathname]);

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          placeholder="Search Products"
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size-[20px]" />
      </div>
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl
          variant="outlined"
          size="small"
          className="text-slate-800 border-slate-800"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="category"
            className="min-w-[120px] text-slate-800 border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={`Sorted by price: ${sortOrder}`}>
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10"
          >
            SORT BY
            {sortOrder === "asc" ? (
              <FiArrowUp size={20} />
            ) : (
              <FiArrowDown size={20} />
            )}
          </Button>
        </Tooltip>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2 cursor-pointer bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
        >
          <FiRefreshCw className="font-semibold" size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
}

export default Filter;
