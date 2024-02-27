import { useSearchParams } from "react-router-dom";
import PropertiesCard from "../../../ui/Cards/PropertiesCard";
import {
  useGetListingsByCategoryQuery,
  useGetListingsByCityNameQuery,
  useGetListingsByCountryQuery,
  useGetListingsByTypeQuery,
} from "../../../state/api";
import LoadingCard from "../../../ui/Cards/LoadingCard";
import Container from "../../../ui/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostsAsync } from "../../../state/listingsSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../types";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const guestCount = searchParams.get("guestCount");
  const roomCount = searchParams.get("roomCount");
  const bathroomCount = searchParams.get("bathroomCount");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const { data, loading, error } = useSelector((state: any) => state.listings);
  console.log("🚀 ~ Home ~ listings:", data);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());
    dispatch(fetchPostsAsync(queryParams));
  }, [
    dispatch,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
  ]);
  function capitalizeFirstLetter(string: any) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }
  return (
    <div className=" min-h-[100vh] ">
      <Container>
        <Container>
          <Container>
            <div className=" w-full px-0 sm:px-3  md:px-0 xl:px-0 2xl:px-0 5xl:px-0 3xl:px-0 mx-0 rounded-md min-h-[100vh]">
              <div className="px-5 pt-10 sm:px-1 md:px-2 lg:px-6">
                <h1
                  className=" font-bold
                  text-start text-[14px] sm:text-[17px] md:text-[19px] lg:text-[22px] xl:text-xl 2xl:text-2xl "
                >
                  {`${capitalizeFirstLetter(location) || undefined}: ${
                    data?.length || 0
                  } properties found`}
                </h1>

                <div className="mt-7 lg:grid lg:grid-cols-12 lg:items-start  ">
                  <div className="lg:col-span-12 l">
                    {data?.length === 0 && (
                      <p className="text-neutral-500">No properties found</p>
                    )}
                    <ul>
                      {data?.map((item: any) =>
                        loading ? (
                          <LoadingCard />
                        ) : (
                          <PropertiesCard
                            key={item}
                            item={item}
                            isLoading={loading}
                          />
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default SearchResult;
