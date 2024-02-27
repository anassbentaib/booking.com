import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "..";
import SearchModal from "../../ui/models/SearchModel";

const DashboardLayout = () => {
  return (
    <div className=" w-full h-full">
      <div className="bg-white ">
        <Navbar isMad isUser categories />
        <div className="min-h-[100vh]">
          <SearchModal />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
