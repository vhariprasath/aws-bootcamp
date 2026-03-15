import React from "react";
export default function Sidebar(props) {
  return (
    <div className="d-flex flex-column card border-0 text-primary me-4 mt-5 h-100">
      <div className="btn my-2 ">Total Booked Rooms: {props.roomCount}</div>
      <div className="btn btn-primary my-2 ">
        Total Amount: ₹{props.totalAmount}
      </div>
    </div>
  );
}
