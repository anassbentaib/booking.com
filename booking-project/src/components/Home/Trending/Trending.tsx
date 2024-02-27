import {
  agadir,
  casablanca,
  ma,
  merrakch,
  paris,
  tanger,
} from "../../../assets";
import PostCard from "../../../ui/Cards/PostCard";
import Heading from "../../../ui/Heading/Heading";
import "swiper/css";
import "swiper/css/effect-coverflow";

const Trending = () => {
  return (
    <div>
      <Heading
        small
        subTitle="Most popular choices for travelers from Morocco"
        title="Trending destinations"
      />
      <div className="flex items-center justify-center mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 5xl:grid-cols-2 gap-3 max-w-[731px] sm:max-w-[731px] md:max-w-[731px] lg:max-w-[1462px] xl:max-w-[1462px] 2xl:max-w-[1462px] 3xl:max-w-[1462px] 5xl:max-w-[1462px]  pt-10">
          <PostCard
            title="Marrakesh"
            image={merrakch}
            isFlag
            route={`/listings/listing?city=marrakesh`}
          />
          <PostCard
            title="Casablanca"
            flag={ma}
            image={casablanca}
            isFlag
            route={`/listings/listing?city=casablanca`}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mx-auto w-full">
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-3 pt-10">
          <PostCard
            hieght="[250px]"
            title="Agadir"
            image={agadir}
            flag={ma}
            isFlag
            route={`/listings/listing?city=agadir`}
          />
          <PostCard
            hieght="[250px]"
            title="Tangier"
            image={tanger}
            flag={ma}
            isFlag
            route={`/listings/listing?city=tangier`}
          />
          <PostCard
            hieght="[250px]"
            title="Paris"
            route={`/listings/listing?city=paris`}
            image={paris}
            flag={ma}
            isFlag
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;
