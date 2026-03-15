// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar";
import Footer from "../components/Footer";

export default function HomeLayout({ totalAmount, roomCount, resetData }) {
  return (
    <>
      <main
        className="d-flex mx-3 w-100"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <div className="flex-grow-1 pe-3 border-end">
          <Outlet />
        </div>

        <div className="ps-3" style={{ width: 320 }}>
          <Sidebar totalAmount={totalAmount} roomCount={roomCount} />
        </div>
      </main>

      <Footer totalAmount={totalAmount} resetData={resetData} />
    </>
  );
}
