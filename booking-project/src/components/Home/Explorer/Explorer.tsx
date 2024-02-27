import { Swiper, SwiperSlide } from "swiper/react";

// import { A11y, Pagination, Navigation } from "swiper/modules";
import { Navigation, Pagination, Grid } from "swiper/modules";

import Heading from "../../../ui/Heading/Heading";
import LoadingCard from "../../../ui/Cards/LoadingCard";
interface ExplorerProps {
  data?: any;
  isLoading?: boolean;
}
const Explorer = ({ data, isLoading }: ExplorerProps) => {
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title="Explore Morocco"
          subTitle="These popular destinations have a lot to offer"
          small
        />
        <div className="text-blue-600 font-semibold hover:underline cursor-pointer  text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-sm 2xl:text-sm 3xl:text-sm 4xl:text-sm">
          View more
        </div>
      </div>
      <div className="m-auto py-7">
        {data?.length ? (
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
                  {data.map((listing: any) => (
                    <SwiperSlide key={listing.id}>
                      <div
                        className="gap-5 bg-transparent"
                        onClick={() =>
                          window.location.assign(
                            `/listings/listing?city=${listing?.city}`
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
                          <p className="font-bold text-sm pt-2">
                            {capitalizeFirstLetter(listing?.city || undefined)},{" "}
                            {capitalizeFirstLetter(
                              listing?.location || undefined
                            )}
                          </p>
                          <p className="text-[13px]">MAD {listing?.price}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
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
};

export default Explorer;
