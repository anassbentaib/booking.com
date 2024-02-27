import { Suspense, lazy, useMemo, useState } from "react";
import useCountries from "../../../hooks/useCounty";
import Avatar from "../../../ui/Avatar";
interface ListingInfoProps {
  user: any;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: string;
  location: string;
  kingBed: string;
  queenBed: string;
  twinBed: string;
}
interface LocationProps {
  location: any;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  queenBed,
  kingBed,
  twinBed,
  location,
}) => {
  const { getByLabel } = useCountries();
  const coordinates = getByLabel(location)?.latlng;
  const Map = useMemo(
    () => lazy(() => import("../../../ui/Input/Map")),
    [location]
  );
  const MapWrapper = ({ location }: LocationProps) => {
    const [mapKey, setMapKey] = useState(0);

    const handleLocationChange = () => {
      setMapKey((prevKey) => prevKey + 1);
    };

    return (
      <div>
        {location && (
          <Suspense fallback={<div>Loading...</div>}>
            {/* Use key to force remounting of MapContainer */}
            <Map key={mapKey} center={coordinates} />
          </Suspense>
        )}
        {/* Add your location selection UI and event handlers here */}
      </div>
    );
  };
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
          text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.sub} </div>
          <Avatar
            src={
              user?.image ||
              "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556783.jpg?size=626&ext=jpg&uid=R138315137&ga=GA1.1.1965427455.1684397966&semt=ais"
            }
          />
        </div>
        <div
          className="
           grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6
            items-center 
            gap-4 
            text-neutral-500
            text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[13px] 2xl:text-[13px]            "
        >
          <div>{guestCount || 0} Guests</div>
          <div>{roomCount || 0} Rooms</div>
          <div>{bathroomCount || 0} Bathrooms</div>
          <div>{kingBed || 0} Queen bed</div>
          <div>{queenBed || 0} King bed</div>
          <div>{twinBed || 0} twin bed</div>
        </div>
      </div>

      <hr />
      <div
        className="
        text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-sm 2xl:text-sm   text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <div className="mb-7">
        {" "}
        <MapWrapper location={coordinates} />
      </div>
    </div>
  );
};

export default ListingInfo;
