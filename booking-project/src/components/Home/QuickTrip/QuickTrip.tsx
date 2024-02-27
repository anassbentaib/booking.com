import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import Heading from "../../../ui/Heading/Heading";
import LoadingCard from "../../../ui/Cards/LoadingCard";

interface QuickTripProps {
  isLoading?: boolean;
  data?: any;
}

export default function QuickTrip({ isLoading, data }: QuickTripProps) {
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <div className="">
        <Heading
          title="Travel more, spend less            "
          subTitle="Get inspiration for your next trip
            "
          small
        />
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
                  slidesPerView={3}
                  spaceBetween={25}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    500: {
                      slidesPerView: 2,
                    },
                    700: {
                      slidesPerView: 2,
                    },
                    1000: {
                      slidesPerView: 3,
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
                            `listings/listing?location=${listing?.location}`
                          )
                        }
                      >
                        <div>
                          <div className="h-[200px] w-full cursor-pointer overflow-hidden rounded-md">
                            <img
                              className="scale-1 hover:scale-[1.1] duration-300 rounded-md h-full w-full"
                              src={listing?.imageSrc?.[0]}
                              alt=""
                            />
                          </div>
                          <p className="font-bold text-sm pt-2 cursor-pointer">
                            {capitalizeFirstLetter(
                              listing?.location || undefined
                            )}
                          </p>
                          <p className="text-[13px] cursor-pointer">
                            {capitalizeFirstLetter(listing?.type || undefined)}
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
