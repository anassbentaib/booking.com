import { IoBedOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import useSearchModal from "../../hooks/useSearchModel";
import useCountries from "../../hooks/useCounty";

interface ButtonProps {
  icon: IconType;
  title: string | undefined;
}

export const Button = ({ icon: Icon, title }: ButtonProps) => {
  return (
    <div className="block sm:block md:flex lg:flex xl:flex 2xl:flex flex-column sm:flex-column md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center flex-4 justify-between border-2 border-[#ffb700] bg-[#ffb700] rounded-md ">
      <div className="font-semibold px-6 flex flex-1 items-center gap-2 border-2 rounded-md border-[#ffb700] p-4 bg-white text-[12px] sm:text-[13px] md:text-[14px] lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm 4xl:text-sm h-full">
        <Icon size={20} />
        {title}
      </div>
    </div>
  );
};

const Search = () => {
  const searchModal = useSearchModal();

  const [params] = useSearchParams();
  const { getByValue } = useCountries();
  const location = params?.get("location");
  console.log("🚀 ~ Search ~ location:", location);
  const roomCount = params?.get("roomCount");
  const startDate = params?.get("startDate");

  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  // const queenBed = params?.get("queenBed");
  // const kingBed = params?.get("kingBed");
  // const twinBed = params?.get("twinBed");

  const locationLabel = useMemo(() => {
    if (location) {
      return capitalizeFirstLetter(location);
    }

    return "Where are you going?";
  }, [location, getByValue]);
  function capitalizeFirstLetter(string: any) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };

      const formattedStartDate = start.toLocaleDateString(undefined, options);
      const formattedEndDate = end.toLocaleDateString(undefined, options);

      return `${formattedStartDate} — ${formattedEndDate}`;
    }
    return "Check-in — Check-out";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests — ${roomCount} Rooms`;
    }
    return "Guests — Rooms";
  }, [guestCount]);
  return (
    <div
      className=" w-full md:w-auto py-2 rounded-lg mt-9 cursor-pointer  text-black"
      onClick={searchModal.onOpen}
    >
      <div className=" block sm:block md:flex lg:flex xl:flex 2xl:flex  flex-column sm:flex-column md:flex-row lg:flex-row xl:flex-row 2xl:flex-row   items-center flex-4 justify-between border-2 border-[#ffb700] bg-[#ffb700] rounded-md">
        {/* <Button title={locationLabel} icon={IoBedOutline} />
        <Button title={durationLabel} icon={SlCalender} />
        <Button title={guestLabel} icon={SlCalender} /> */}

        <div
          className=" font-semibold px-3 flex
          
          
          
          flex-1 items-center gap-2 border-2  rounded-md border-[#ffb700] p-4 bg-white
         text-[12px] sm:text-[13px] md:text-[14px] lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm 4xl:text-sm
         h-full 
        
        "
        >
          <IoBedOutline className="text-[11px] sm:text-[13px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-lg 3xl:text-sm 4xl:text-sm" />
          <div
            className=" text-[11px] sm:text-[13px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-sm 3xl:text-sm 4xl:text-sm
        "
          >
            {locationLabel}
          </div>
        </div>

        <div className=" sm:block  flex-1 text-center text-sm font-semibold border-2  rounded-md border-[#ffb700] p-4  px-3 bg-white">
          <div className="flex items-center gap-2">
            <SlCalender className="text-[11px] sm:text-[13px] md:text-[10px] lg:text-[12px] xl:text-[10px] 2xl:text-lg 3xl:text-sm 4xl:text-sm" />
            <div
              className=" text-[11px] sm:text-[13px] md:text-[10px] lg:text-[12px] xl:text-[10px] 2xl:text-sm 3xl:text-sm 4xl:text-sm
        "
            >
              {durationLabel}
            </div>
          </div>
        </div>

        <div className=" sm:block  flex-1 text-center text-sm font-semibold  px-3 h-full border-2  rounded-md border-[#ffb700] p-4 bg-white">
          <div className="flex items-center gap-2 justify-start">
            <FaUser className="text-[11px] sm:text-[13px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-lg 3xl:text-sm 4xl:text-sm" />
            <div
              className=" text-[11px] sm:text-[13px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-sm 3xl:text-sm 4xl:text-sm
        "
            >
              {guestLabel}
            </div>
          </div>
        </div>
        <div className=" text-sm font-semibold pl-6 pr-9  text-gray-600  border-2 rounded-md border-[#ffb700] p-3 flex-row  gap-3 bg-blue-600 text-center flex justify-center items-center">
          <div className="p-[0.rem] md:p-[0.3rem] lg:p-1 xl:p-1 2xl:p-1 3xl:p-1 5xl:p-1 rounded-full text-white  text-[12px] sm:text-[13px] md:text-[14px] lg:text-md xl:text-md 2xl:text-md 3xl:text-md 4xl:text-md font-bold text-center">
            Search
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
