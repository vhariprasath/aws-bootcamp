import React from "react";
import "./hotel.css";
export default function Hotel(props) {
  return (
    <div
      className="container mt-5"
      style={{ backgroundColor: "#033663ff", borderRadius: "12px" }}
    >
      <div
        className="card p-4 me-2"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <div className="row align-items-center ">
          <div className="col-4">
            <img
              className="img-fluid fixed-size"
              src={props.hotel.image}
              alt={props.hotel.name}
            />
          </div>

          <div className="col-4 align-items-start">
            <h4 className="fw-bold text-light">
              {props.hotel.name}
              <span className="badge bg-primary ms-2">
                ₹{props.hotel.price}
              </span>
            </h4>
          </div>

          <div className="col-2 mb-3 text-center">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.decreamentRoomsBooked(props.index)}
              >
                -
              </button>
              <button type="button" className="btn btn-light">
                {props.hotel.roomsBooked}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.incrementRoomsBooked(props.index)}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-2 text-light text-end">
            {props.hotel.roomsBooked * props.hotel.price}
          </div>
        </div>
      </div>
    </div>
  );
}
