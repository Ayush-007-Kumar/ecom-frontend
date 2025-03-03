import { Button, Skeleton, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../Store/Action";
import toast from "react-hot-toast";
import ErrorPage from "../Shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  console.log("Cart", cart)
  console.log("TotalPrice", totalPrice)
  const { paymentMethod } = useSelector((state) => state.payment);
  // const { isLoading, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select checkout address before proceeding.");
      return;
    }
    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select payment address before proceeding.");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  useEffect(() => {
    console.log("Fetching address");
    dispatch(getUserAddresses());
  }, [dispatch]);
  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <div className="lg:w-[80%] mx-auto pt-20 flex justify-center">
          <div className="flex flex-col items-center gap-2 w-[30%]">
            <Skeleton
              variant="rectangular"
              width="50%"
              height={40}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              animation="wave"
            />
            <Skeleton
              className="self-start"
              variant="rectangular"
              width="40%"
              height={40}
              animation="wave"
            />
          </div>
        </div>
      ) : (
        <div>
          {activeStep === 0 && <AddressInfo address={address} />}
          {activeStep === 1 && <PaymentMethod />}
          {activeStep === 2 && (
            <OrderSummary
              totalPrice={totalPrice}
              cart={cart}
              address={selectedUserCheckoutAddress}
              paymentMethod={paymentMethod}
            />
          )}
          {activeStep === 3 &&
          <>
          {paymentMethod === "Stripe" ? (<StripePayment/>) : (<PaypalPayment/>)}
          </> 
          }
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-18 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== steps.length - 1 && (
          <button
            className={`bg-blue-600 font-semibold px-6 h-10 rounded-md text-white
            ${
              errorMessage ||
              (activeStep === 0 && !selectedUserCheckoutAddress) ||
              (activeStep === 1 && !paymentMethod)
                ? "opacity-60"
                : ""
            }`}
            onClick={handleNext}
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                ? !paymentMethod
                : false)
            }
          >
            Proceed
          </button>
        )}
      </div>
      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
}

export default Checkout;
