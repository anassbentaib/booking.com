import { Image } from "@chakra-ui/react";
import useCountries from "../../../hooks/useCounty";
import Heading from "../../../ui/Heading/Heading";
import Button from "../../../ui/Button/Button";

interface ListingHeadProps {
  title: string;
  imageSrc: string[];
  id: string;
  price: number;
  street: string;
  city: string;
  location: string;
  currentUser?: any | null;
  scrollToSection: (section: any) => void;
}
const ListingHead = ({
  title,
  imageSrc = [],
  id,
  street,
  city,
  scrollToSection,
  location,
  price,
  currentUser,
}: ListingHeadProps) => {
  const { getByLabel } = useCountries();
  // const location = getByValue(locationValue);

  function capitalizeFirstLetter(string: any) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }
  const handleScrollToReservation = () => {
    scrollToSection("reservated");
  };

  return (
    <div className="mt-14">
      <div className="block sm:flex md:flex lg:flex xl:flex 2xl:flex  flex-column sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row   items-center flex-4 justify-between ">
        <Heading
          title={title}
          subTitle={`${capitalizeFirstLetter(street)}, ${capitalizeFirstLetter(
            city
          )}, ${capitalizeFirstLetter(location)}`}
          small
        />
        <div
          onClick={() => handleScrollToReservation()}
          className="mt-3 sm:mt-0 2xl:mt-0"
        >
          <Button isBlue label="Reserve or Book now!" />
        </div>
      </div>
      <div>
        <p className="text-[#0071c2]  font-semibold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[16px] pt-3 ">
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free Lamabooking account
        </p>
      </div>
      <div>
        <p className="text-[#008009] font-semibold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[16px] py-3">
          {`Book a stay over MAD${
            price - 3
          } at this property and get a free airport taxi`}
        </p>
      </div>
      {imageSrc?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3  2xl:grid-cols-3 gap-1 mt-4">
          {imageSrc?.map((img: any) => (
            <div className="w-full  rounded-md relative ">
              <Image
                alt="image"
                src={
                  img ||
                  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                }
                className="object-cover w-full rounded- "
                maxW="270px"
                minW="100%"
                w="100%"
                h={{
                  base: "190px",
                  sm: "220px",
                  md: "230px",
                  xl: "270px",
                }}
              />
              {/* <div className="absolute  top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative mt-4">
          <Image
            alt="image"
            src={
              imageSrc?.[1] ||
              "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
            }
            className="object-cover w-full"
          />
          {/* <div className="absolute  top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div> */}
        </div>
      )}
    </div>
  );
};

export default ListingHead;
