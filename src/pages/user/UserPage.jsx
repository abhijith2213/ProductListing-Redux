import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

export default function UserPage() {
  return (
    <section className="max-h-screen overflow-y-auto no-scrollbar">
        <Navbar/>
        <Outlet/>
    </section>
  )
}
