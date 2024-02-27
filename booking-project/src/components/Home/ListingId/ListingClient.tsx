import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Container from "../../../ui/Container/Container";
import ListingHead from "../../Listings/Listings/ListingHead";
import ListingInfo from "../../Listings/Listings/ListingInfo";
import ListingReservation from "../../Listings/Listings/ListingReservation";
import SuggestedListings from "../SuggestedListings/SuggestedListings";
import { useGetListingsByListingIdQuery } from "../../../state/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types";
import { createReservation } from "../../../api";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchReservationsByListingId } from "../../../state/reservationSlice";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: any;
}

const ListingClient: React.FC<ListingClientProps> = () => {
  const { listingId } = useParams();
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const login = () => {
    window.location.assign("/sign-in");
  };
  const reservatedRef = useRef<HTMLDivElement>(null);
  const { data: listingsData, isLoading: listingsIsLoading } =
    useGetListingsByListingIdQuery(listingId) as any;

  const { reservations } = useSelector((state: any) => state.reservations);
  useEffect(() => {
    if (listingId) {
      dispatch(fetchReservationsByListingId(listingId));
    }
  }, [dispatch, listingId]);
  const scrollToSection = (section: any) => {
    const ref = section === "reservated" ? reservatedRef : null;

    if (ref) {
      ref?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  function capitalizeFirstLetter(string: any) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }
  const router = useNavigate();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation?.startDate),
        end: new Date(reservation?.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [totalPrice, setTotalPrice] = useState(listingsData?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const listingId = listingsData?.id;
    const userId = currentUser?.id;

    listingsData?.id;
    if (currentUser === null) {
      login();
    } else if (!listingId) {
      toast.error("Listing id is required!");
    } else {
      if (userId) {
        createReservation(totalPrice, startDate, endDate, listingId, userId)
          .then(() => {
            if (listingId) {
              dispatch(fetchReservationsByListingId(listingId));
            }
            toast.success("Listing reserved!");
            setDateRange(initialDateRange);
          })
          .catch(() => {
            toast.error("something went wrong.");
          });
      }
    }
  }, [totalPrice, dateRange, listingsData?.id, router, currentUser]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listingsData?.price) {
        setTotalPrice(dayCount * listingsData?.price);
      } else {
        setTotalPrice(listingsData?.price);
      }
    }
  }, [dateRange, listingsData?.price]);
  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          min-h-screen
          mx-auto
          px-3
        "
      >
        <div className="flex flex-col ">
          <div className="mb-7">
            <ListingHead
              price={listingsData?.price}
              title={listingsData?.propertyName}
              street={listingsData?.street}
              city={listingsData?.city}
              location={listingsData?.location}
              imageSrc={listingsData?.imageSrc}
              id={listingsData?.id}
              currentUser={currentUser}
              scrollToSection={scrollToSection}
            />
          </div>
          <hr />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10
              mt-6
            "
          >
            <ListingInfo
              user={currentUser}
              category={listingsData?.category}
              description={listingsData?.propertyDescription}
              roomCount={listingsData?.roomCount}
              guestCount={listingsData?.guestCount}
              bathroomCount={listingsData?.bathroomCount}
              location={capitalizeFirstLetter(listingsData?.location)}
              kingBed={listingsData?.kingBed}
              twinBed={listingsData?.twinBed}
              queenBed={listingsData?.queenBed}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
              id="reservated"
              ref={reservatedRef}
            >
              <ListingReservation
                price={listingsData?.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={listingsIsLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="py-6">
          <SuggestedListings
            listing={listingsData}
            isLoading={listingsIsLoading}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
