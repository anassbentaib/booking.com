import { Outlet } from "react-router-dom";
import { Navbar } from "..";

const Layout = () => {
  return (
    <div className=" w-full h-full">
      <div className="bg-[#f9f9fa] ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
