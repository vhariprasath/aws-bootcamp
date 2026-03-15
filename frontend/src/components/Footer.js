import React from "react";

export default function Footer(props) {
  return (
    <div className="row bg-white py-3  text-white text-center fixed-bottom d-flex justify-content-around flex-row mt-2 mx-3">
      <button
        className="btn btn-secondary col-3"
        onClick={() => props.resetData()}
      >
        Clear All
      </button>
      <button className="btn btn-primary col-3">Pay Now</button>
    </div>
  );
}
