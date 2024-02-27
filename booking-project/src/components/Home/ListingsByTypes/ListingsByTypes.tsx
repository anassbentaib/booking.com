import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import Heading from "../../../ui/Heading/Heading";
import LoadingCard from "../../../ui/Cards/LoadingCard";
import { IoBedOutline, IoHomeSharp } from "react-icons/io5";
import { LiaCarSolid } from "react-icons/lia";
import { MdApartment, MdOutlineAttractions } from "react-icons/md";
import { FaHotel, FaPlaceOfWorship } from "react-icons/fa";

import { useState } from "react";
interface listingByTypeProps {
  isLoading?: boolean;
  data?: any;
}

export default function ListingByType({ isLoading, data }: listingByTypeProps) {
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [filter, setFilter] = useState(data);
  const [activeFilter, setActiveFilter] = useState("Homes");

  const handleFilter = (item: string) => {
    setActiveFilter(item);
    switch (item) {
      case "Homes":
        setFilter(data?.filter((listing: any) => listing?.type === "home"));
        break;
      case "Apartement":
        setFilter(
          data?.filter((listing: any) => listing?.type === "apartement")
        );
        break;
      case "Alternative Places":
        setFilter(
          data?.filter((listing: any) => listing?.type === "alternative-places")
        );
        break;

      case "Hotel, B&Bs & More":
        setFilter(data?.filter((listing: any) => listing?.type === "hotel"));
        break;
      default:
        setFilter(data);
    }
  };
  const routes = [
    {
      label: "Homes",
      icon: IoHomeSharp,
      active: "Homes",

      color: "orange-700",
    },
    {
      label: "Apartement",
      icon: MdApartment,
      color: "violet-500",

      active: "Apartement",
    },
    {
      label: "Hotel, B&Bs & More",
      icon: FaHotel,
      color: "sky-500",

      active: "Hotel, B&Bs & More",
    },
    {
      label: "Alternative Places",
      icon: FaPlaceOfWorship,
      color: "pink-700",

      active: "Alternative Places",
    },
  ];

  return (
    <div>
      <div className="pb-2">
        <Heading
          title="Quick and easy trip planner"
          subTitle="Pick a vibe and explore the top destinations in Morocco"
          small
        />
      </div>
      <div className="py-4">
        <div className="flex ">
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-col-4 2xl:grid-cols-4 5xl:grid-cols-4">
            {routes?.map((route) => (
              <a
                className={`
               group p-2 px-3  text-[11px]   sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[13px] 2xl:text-[14px] 3xl:text-[15px] font-semibold cursor-pointer hover:text-black  
              hover:bg-gray-200 hover:bg-opacity-50 rounded-full transition
              ${
                activeFilter === route.active &&
                "bg-[#003b95] bg-opacity-30 border border-blue-300 border-opacity-90 hover:text-blue-600 text-blue-600 hover:bg-blue-500 hover:bg-opacity-30 "
              }
              `}
                onClick={() => handleFilter(route.label)}
              >
                <div className="flex items-center justify-start  xl:justify-center 2xl:justify-center">
                  <route.icon className={`h-4 w-4 mr-3 text-${route.color}`} />
                  {route.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="m-auto py-7">
        {filter?.length ? (
          isLoading ? (
            <section className="">
              <div className="lg:mx-auto max-w-5xl m">
                <Swiper
                  modules={[Grid, Pagination, Navigation]}
                  slidesPerView={5}
                  spaceBetween={25}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    700: {
                      slidesPerView: 3,
                    },
                    1000: {
                      slidesPerView: 5,
                    },
                  }}
                  navigation
                  className="gridCol"
                >
                  {data?.slice(0, 5)?.map((listing: any) => (
                    <SwiperSlide key={listing.id}>
                      <div className="gap-5 bg-transparent">
                        <LoadingCard />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          ) : (
            <section className="">
              <div className="lg:mx-auto max-w-5xl m">
                <Swiper
                  modules={[Grid, Pagination, Navigation]}
                  slidesPerView={5}
                  spaceBetween={25}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },

                    250: {
                      slidesPerView: 1,
                    },
                    400: {
                      slidesPerView: 2,
                    },
                    500: {
                      slidesPerView: 3,
                    },
                    800: {
                      slidesPerView: 4,
                    },
                    900: {
                      slidesPerView: 4,
                    },
                    1000: {
                      slidesPerView: 5,
                    },
                  }}
                  navigation
                  className="gridCol"
                >
                  <div>
                    {filter?.map((listing: any) => (
                      <SwiperSlide key={listing.id}>
                        <div
                          className="gap-5 bg-transparent"
                          onClick={() =>
                            window.location.assign(
                              `listings/listing?type=${listing?.type}`
                            )
                          }
                        >
                          <div>
                            <div className="h-[150px] w-full cursor-pointer overflow-hidden rounded-md">
                              <img
                                className="scale-1 hover:scale-[1.1] duration-300 rounded-md h-full w-full"
                                src={listing?.imageSrc?.[0]}
                                alt=""
                              />
                            </div>
                            <p className="font-bold text-sm pt-2 cursor-pointer">
                              {capitalizeFirstLetter(
                                listing?.city || "Location Not Available"
                              )}
                              ,{" "}
                              {capitalizeFirstLetter(
                                listing?.location || "Location Not Available"
                              )}
                            </p>
                            <p className="text-[13px] cursor-pointer">
                              {capitalizeFirstLetter(
                                listing?.type || "Type Not Available"
                              )}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            </section>
          )
        ) : (
          <section className="">
            <div className="lg:mx-auto max-w-5xl m">
              <LoadingCard />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
