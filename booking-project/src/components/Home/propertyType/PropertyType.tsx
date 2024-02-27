import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Grid } from "swiper/modules";
import Heading from "../../../ui/Heading/Heading";
import LoadingCard from "../../../ui/Cards/LoadingCard";

interface PropertyTypeProps {
  data?: any;
  isLoading?: boolean;
}
const PropertyType = ({ data, isLoading }: PropertyTypeProps) => {
  return (
    <div>
      <Heading title="Browse by property type" small />

      <div className="m- py-7">
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
                      slidesPerView: 3,
                    },
                    700: {
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
                    <SwiperSlide key={listing?.id}>
                      <div
                        className="gap-5 bg-transparent"
                        onClick={() =>
                          window.location.assign(
                            `/listings/listing?category=${
                              listing?.category
                              // ?.replace(/\s+/g, "-")
                              // .toLowerCase()
                            }`
                          )
                        }
                        // replace(/\s+/g, "-")
                      >
                        <div>
                          <div className="h-[150px] w-full cursor-pointer overflow-hidden rounded-md">
                            <img
                              className="scale-1 hover:scale-[1.1] duration-300 rounded-md h-full w-full object-cover"
                              src={listing?.imageSrc?.[0]}
                              alt=""
                            />
                          </div>
                          <p className="font-bold text-sm pt-2 cursor-pointer">
                            {listing?.category}
                          </p>
                          <p className="text-[13px] cursor-pointer">
                            MAD {listing?.price}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          )
        ) : (
          <LoadingCard />
        )}
      </div>
    </div>
  );
};

export default PropertyType;
