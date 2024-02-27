import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation } from "swiper/modules";
import Heading from "../../../ui/Heading/Heading";
import ShadowCard from "../../../ui/Cards/ShadowCard";
import LoadingCard from "../../../ui/Cards/LoadingCard";
interface HomesProps {
  data?: any;
  isLoading?: boolean;
}
const Homes = ({ data, isLoading }: HomesProps) => {
  return (
    <div className="mt-3">
      <Heading
        title="Stay at our top unique properties"
        subTitle="From castles and villas to boats and igloos, we have it all"
        small
      />

      <div className="m-auto py-7">
        {data?.length ? (
          isLoading ? (
            <section className="">
              <div className="lg:mx-auto max-w-5xl m">
                <Swiper
                  modules={[Navigation, Pagination, Navigation]}
                  slidesPerView={4}
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
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween="1"
              slidesPerView="auto"
            >
              <div className="">
                {data?.map((listing: any, i: any) =>
                  isLoading ? (
                    <div>
                      <SwiperSlide
                        key={i}
                        className="min-w-[200px] max-w-[100px] min-h-[100px] mx-2"
                      >
                        <LoadingCard />
                      </SwiperSlide>
                    </div>
                  ) : (
                    <SwiperSlide
                      key={i}
                      className="min-w-[200px] max-w-[300px]"
                    >
                      <div className=" ">
                        <ShadowCard
                          image={listing?.imageSrc?.[0]}
                          hieght="[200px]"
                          text={listing?.city}
                          category={listing?.category}
                          description={listing?.propertyDescription}
                          price={listing?.price}
                          city={listing?.city}
                          location={listing?.location}
                          type={listing?.type}
                          isText
                        />
                      </div>
                    </SwiperSlide>
                  )
                )}
              </div>
            </Swiper>
          )
        ) : (
          <LoadingCard />
        )}
      </div>
    </div>
  );
};

export default Homes;
