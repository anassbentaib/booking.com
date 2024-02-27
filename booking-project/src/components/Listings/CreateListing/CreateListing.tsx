import { Navbar } from "../..";
import CreateDashboard from "../CreateDashboard/CreateDashboard";

const CreateListing = () => {
  return (
    <div className=" min-h-[100vh]  bg-[#003b95] text-white">
      <Navbar isMad />
      <div className="">
        <CreateDashboard />
      </div>
    </div>
  );
};

export default CreateListing;
