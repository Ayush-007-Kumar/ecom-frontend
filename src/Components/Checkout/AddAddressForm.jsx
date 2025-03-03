import React, { useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../Shared/InputField";
import Spinners from "../Shared/Spinners";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addUpdateUserAddress } from "../../Store/Action";

function AddAddressForm({ address, setOpenAddressModal }) {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    console.log("Login Click");

    dispatch(
      addUpdateUserAddress(data, toast, address?.addressId, setOpenAddressModal)
    );
  };

  useEffect(() => {
    if(address?.addressId){
        setValue("buildingName", address?.buildingName)
        setValue("city", address?.city)
        setValue("state", address?.state)
        setValue("pincode", address?.pincode)
        setValue("street", address?.street)
        setValue("country", address?.country)
    }
  }, [address]);
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex justify-center items-center mt-2 mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          {!address?.addressId ? "Add Address" : "Update Address"}
        </div>
        {/* <hr className="mt-2 mb-5 text-black" /> */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter building name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter city"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />

          <InputField
            label="Pincode"
            required
            id="pincode"
            type="text"
            message="*Pincode is required"
            placeholder="Enter Pincode"
            register={register}
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter Street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter Country"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={btnLoader}
          className="text-white bg-blue-500 px-4 py-2 rounded-md mt-4"
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddAddressForm;
