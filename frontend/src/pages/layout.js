// src/Layout.jsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout({ totalAmount, roomCount, resetData }) {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
