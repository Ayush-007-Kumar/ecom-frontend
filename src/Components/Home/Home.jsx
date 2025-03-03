import React, { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Shared/ProductCard";
import { fetchProducts } from "../../Store/Action";
import Loader from "../Shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // useEffect(() => {
  //   // console.log("Products:", products);
  //   const interval = setInterval(() => {
  //     console.log("Products:", products);
  //   }, 1000);
  
  //   return () => clearInterval(interval);
  // }, [products]);
  return (
    <div className="lg:px-14 sm:px-8 px-4 bg-blue-200">
      <div className="py-2">
        <HeroBanner />
      </div>
      <div className="py-2">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-700 text-2xl font-bold">
            <span>
              Discover our handpicked selection of top rated items just for you!
            </span>
          </h1>
        </div>
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
          <div className="pb-2 pt-5 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                ?.slice(0, 8)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
