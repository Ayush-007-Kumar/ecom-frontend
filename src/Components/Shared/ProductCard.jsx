import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../Utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/Action";
import toast from "react-hot-toast";

function ProductCard({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView({
            productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
          });
        }}
        className="w-full bg-gray-100 overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 object-contain"
          src={image}
          alt={productName}
        />
      </div>

      <div className="p-4 bg-white border-t-1 flex flex-col justify-between min-h-[35vh]">
        <div>
          <h2
            onClick={() => {
              handleProductView({
                productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              });
            }}
            className="text-lg font-semibold mb-2 cursor-pointer"
          >
            {truncateText(productName, 20)}
          </h2>
          <div className="min-h-20 max-h-20">
            <p className="text-gray-600 text-sm">
              {truncateText(description, 50)}
            </p>
          </div>
        </div>

        {!about && (
          <div className="flex flex-col items-center min-w-full lg:flex-row lg:items-end lg:justify-between gap-2">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ₹{Number(price).toFixed(2)}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  ₹{Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span>&nbsp;</span>
                <span className="text-xl font-bold text-slate-700">
                  ${Number(price).toFixed(2)}
                </span>
              </div>
            )}

            <button
              disabled={!isAvailable || btnLoader}
              onClick={() =>
                addToCartHandler({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                })
              }
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
              }
            text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center cursor-pointer [@media(min-width:0px)_and_(@media(max-width:1024px))]:min-w-full`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        )}
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
        about
      />
    </div>
  );
}

export default ProductCard;
