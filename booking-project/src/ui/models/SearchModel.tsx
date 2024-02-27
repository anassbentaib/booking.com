import qs from "query-string";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
// import Map from "../Input/Map";
import Modal from "./Model";
import { useNavigate, useSearchParams } from "react-router-dom";
import CountrySelect, { CountrySelectValue } from "../Input/CountrySelect";
import Heading from "../Heading/Heading";
import Calendar from "../Input/Calendar";
import Counter from "../Input/Counter";
import useSearchModal from "../../hooks/useSearchModel";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

interface LocationProps {
  location: any;
}

const SearchModal = () => {
  const navigate = useNavigate();
  const searchModal = useSearchModal();

  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const Map = useMemo(() => lazy(() => import("../Input/Map")), [location]);

  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("../Map"), {
  //       ssr: false,
  //     }),
  //   [location]
  // );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    console.log("🚀 ~ onSubmit ~ currentQuery:", currentQuery);

    if (params) {
      currentQuery = qs.parse(params.toString());
      console.log("🚀 ~ onSubmit ~ currentQuery:", currentQuery);
    }
    console.log("🚀 ~ onSubmit ~ params:", params);

    const updatedQuery: any = {
      location: location?.label.replace(/\s+/g, "-").toLowerCase() || "",
      guestCount: guestCount || 1,
      roomCount: roomCount || 1,
      bathroomCount: bathroomCount || 1,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate, {
        representation: "date",
      });
      console.log("  updatedQuery.startDate ", updatedQuery.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate, {
        representation: "date",
      });
      console.log(" updatedQuery.endDate ", updatedQuery.endDate);
    }

    console.log("🚀 ~ onSubmit ~ updatedQuery:", updatedQuery);
    const url = qs.stringifyUrl(
      {
        url: "/listings/listing/searchresults",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    console.log("🚀 ~ onSubmit ~ url:", url);

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    navigate(url);
  }, [
    step,
    searchModal,
    location,
    navigate,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);
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
            <Map key={mapKey} center={location?.latlng} />
          </Suspense>
        )}
        {/* Add your location selection UI and event handlers here */}
      </div>
    );
  };
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subTitle="Find the perfect location!"
        small
      />
      <CountrySelect
        value={location}
        onChange={(value: any) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <MapWrapper location={location} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subTitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <Heading title="More information" subTitle="Find your perfect place!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <div>
      <Modal
        isOpen={searchModal.isOpen}
        title="Filters"
        actionLabel={actionLabel}
        onSubmit={onSubmit}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        onClose={searchModal.onClose}
        body={bodyContent}
      />
    </div>
  );
};

export default SearchModal;
