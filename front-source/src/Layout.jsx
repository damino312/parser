import React from "react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="px-6 py-4 min-h-screen flex bg-darkGreen text-white ">
      <Outlet />
    </div>
  );
}
