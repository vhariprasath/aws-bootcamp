import "./App.css";
import HotelList from "./components/HotelList";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./pages/layout";
import HomeLayout from "./pages/homeLayout";
import AdminPage from "./pages/admin";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
function App() {
  const hotel = [
    {
      name: "ITC Grand",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/itc-chola.webp",
    },
    {
      name: "Hotel Taj",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/le-meridien.webp",
    },
    {
      name: "ITC Grand",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/itc-chola.webp",
    },
    {
      name: "Hotel Taj",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/le-meridien.webp",
    },
    {
      name: "ITC Grand",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/itc-chola.webp",
    },
    {
      name: "Hotel Taj",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/le-meridien.webp",
    },
    {
      name: "ITC Grand",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/itc-chola.webp",
    },
    {
      name: "Hotel Taj",
      price: 10000,
      roomsBooked: 0,
      image: "/assets/le-meridien.webp",
    },
  ];

  let [hotelList, setHotelList] = useState(hotel);
  let [totalAmount, setTotalAmount] = useState(0);
  let [totalRooms, setTotalRooms] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/hotels`)
      .then((res) => {
        const transformeddata = res.data.map((hotel) => ({
          id: hotel._id,
          name: hotel.hotel_name,
          address: hotel.address,
          timezone: hotel.timezone,
          price: Math.floor(Math.random() * 10000),
          roomsBooked: 0,
          image:
             Math.floor(Math.random() * 10000) % 2 === 0
              ? "/assets/le-meridien.webp"
              : "/assets/itc-chola.webp",
        }));
        setHotelList(transformeddata);
        console.log(res);
      })
      .catch(() => {
        console.log("Error in fetching hotels");
      });
  }, []);

  const incrementRoomsBooked = (index) => {
    console.log("Increment Rooms Booked Called");
    let newHotelList = [...hotelList];
    let newTotalAmount = totalAmount;

    newHotelList[index].roomsBooked += 1;
    newTotalAmount += newHotelList[index].price;

    setHotelList(newHotelList);
    setTotalAmount(newTotalAmount);
    setTotalRooms(totalRooms + 1);
  };

  const decreamentRoomsBooked = (index) => {
    let newHotelList = [...hotelList];
    let newTotalAmount = totalAmount;

    if (newHotelList[index].roomsBooked > 0) {
      newHotelList[index].roomsBooked -= 1;
      newTotalAmount -= newHotelList[index].price;

      setHotelList(newHotelList);
      setTotalAmount(newTotalAmount);
      setTotalRooms(totalRooms - 1);
    }
  };

  const resetData = () => {
    let newHotelList = [...hotelList];
    newHotelList.map((hotel) => (hotel.roomsBooked = 0));
    setHotelList(newHotelList);
    setTotalAmount(0);
    setTotalRooms(0);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              totalAmount={totalAmount}
              roomCount={totalRooms}
              resetData={resetData}
            />
          }
        >
          <Route path="/" element={<AdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/home"
            element={
              <HomeLayout
                totalAmount={totalAmount}
                roomCount={totalRooms}
                resetData={resetData}
              />
            }
          >
            <Route
              index
              element={
                <HotelList
                  hotelList={hotelList}
                  incrementRoomsBooked={incrementRoomsBooked}
                  decreamentRoomsBooked={decreamentRoomsBooked}
                />
              }
            />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
