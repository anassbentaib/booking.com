import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import Heading from "../../../ui/Heading/Heading";
import LoadingCard from "../../../ui/Cards/LoadingCard";
import { useGetListingsByTypeQuery } from "../../../state/api";

interface SuggestedListingsProps {
  isLoading?: boolean;
  listing?: any;
}

export default function SuggestedListings({
  isLoading,
  listing,
}: SuggestedListingsProps) {
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const { data } = useGetListingsByTypeQuery(listing?.type);
  const suggestedListings =
    data?.filter(
      (suggestedListing: any) => suggestedListing.id !== listing?.id
    ) || [];

  return (
    <div>
      <div className="pb-6">
        <Heading
          title="Suggested for you!"
          subTitle="Available properties you recently viewed"
          small
        />
      </div>
      <div className="m-auto pb-7">
        {suggestedListings?.length ? (
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
                    700: {
                      slidesPerView: 2,
                    },
                    1000: {
                      slidesPerView: 5,
                    },
                  }}
                  navigation
                  className="gridCol"
                >
                  {suggestedListings.map((listing: any) => (
                    <SwiperSlide key={listing.id}>
                      <div
                        className="gap-5 bg-transparent"
                        onClick={() =>
                          window.location.assign(
                            `/listings/listing/${listing?.id}`
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
}
