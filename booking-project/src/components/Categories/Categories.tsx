import { IoBedOutline } from "react-icons/io5";
import { LiaCarSolid } from "react-icons/lia";
import { MdOutlineAttractions } from "react-icons/md";
import { PiAirplaneInFlightThin } from "react-icons/pi";

import { RiTaxiWifiFill } from "react-icons/ri";
import Heading from "../../ui/Heading/Heading";
import Search from "../Navbar/Search";

export const routes = [
  {
    label: "Stays",
    icon: IoBedOutline,
    color: "text-sky-500",
  },

  {
    label: "Flights",
    icon: PiAirplaneInFlightThin,
    color: "text-violet-500",
  },

  {
    label: "Car rentals",
    icon: LiaCarSolid,
    color: "text-pink-700",
  },
  {
    label: "Attractions",
    icon: MdOutlineAttractions,
    color: "text-violet-500",
  },

  {
    label: "Airport taxis",
    icon: RiTaxiWifiFill,
    color: "text-pink-700",
  },
];

const Categories = () => {
  return (
    <div className="py-5">
      <div className="space-x-1 hidden sm:hidden  md:flex lg:flex xl:flex 2xl:flex 3xl:flex 4xl:flex 5xl:flex">
        {routes.map((route) => (
          <a
            href=""
            className="text-sm group p-2  justify-start  sm:font-[10px] md:font-[11px] lg:font-[12px] xl:font-[13px] 2xl:font-[14px] 3xl:font-[15px] font-semibold cursor-pointer hover:text-white hover:bg-white/10 rounded-full transition"
          >
            <div className="flex items-center flex-1 px-1">
              <route.icon className="h-5 w-5 mr-1" />
              {route.label}
            </div>
          </a>
        ))}
      </div>
      <div className="mt-9">
        <Heading
          title="Find your next stay"
          subTitle="Search deals on hotels, homes, and much more..."
        />
      </div>
      <Search />
    </div>
  );
};

export default Categories;
