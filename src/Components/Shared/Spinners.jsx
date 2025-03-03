import React from "react";
import { TailSpin } from "react-loader-spinner";

function Spinners() {
  return (
    
      <TailSpin
        visible={true}
        height="30"
        width="30"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    
  );
}

export default Spinners;
