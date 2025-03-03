import React, { useEffect } from "react";
import ProductCard from "../Shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../Store/Action";
import Filter from "./Filter";
import useProductFilter from "../../Hooks/useProductFilter"; 
import Loader from "../Shared/Loader";
import Paginations from "../Shared/Paginations"

function Products() {
  const {isLoading, errorMessage} = useSelector(state => state.errors) 
  const {products, categories, pagination} = useSelector(state => state.products);

  // console.log("Redux State - Products:", products);
  const dispatch = useDispatch();  

  useProductFilter();

  useEffect(() => {
    console.log("RENDER")
    
  }, []);

  // console.log("Pagination", pagination)
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []}/>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-6">
            {products && products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
          <div className="flex justify-center pt-10">
            <Paginations 
            numberOfPage = {pagination?.totalPages}
            totalProducts = {pagination?.totalElements}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
