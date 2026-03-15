import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  let navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [hotel_name, setHotelName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/hotels", {
        address,
        hotel_name,
        timezone,
      })
      .then((res) => {
        const transformeddata = res.data.map((hotel) => ({
          id: hotel._id,
          name: hotel.hotel_name,
          address: hotel.address,
          timezone: hotel.timezone,
          price: 10000,
          roomsBooked: 0,
          image:
            hotel._id % 2 == 0
              ? "/assets/le-meridien.webp"
              : "/assets/itc-chola.webp",
        }));
        console.log(res);
      })
      .catch((err) => {
        console.log("Error in fetching hotels");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#001f3f" }}
    >
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Add Hotel</h2>
        <form className="" onSubmit={handleLogin}>
          <div classNameName="form-group mb-4">
            <label htmlFor="exampleInputEmail1" className="mt-3">
              Address
            </label>
            <input
              type="text"
              className="form-control mt-3"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="exampleInputPassword1">Hotel Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Hotel Name"
              value={hotel_name}
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="exampleInputPassword1">Timezone</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              required
            />
          </div>
          {<p className="text-danger mt-2">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            style={{ backgroundColor: "#001f3f" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
