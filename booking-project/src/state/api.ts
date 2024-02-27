import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
  }),

  reducerPath: "generalApi",
  tagTypes: ["Listings", "Cart", "Reservation"],
  endpoints: (build) => ({
    getListings: build.query({
      query: () => "api/v1/get-listings",
      providesTags: ["Listings"],
    }),
    getListingsByCityName: build.query({
      query: (city) => `api/v1/get-listing/city-name?city=${city}`,
      providesTags: (city) => [{ type: "Listings", id: city }],
    }),
    getListingsByListingId: build.query({
      query: (listingId) => `api/v1/get-listing/${listingId}`,
      providesTags: (listingId) => [{ type: "Listings", id: listingId }],
    }),
    getListingsByUserId: build.query({
      query: (userId) => `api/v1/by-user/get-listing/${userId}`,
      providesTags: (userId) => [{ type: "Listings", id: userId }],
    }),

    getListingsByCountry: build.query({
      query: (country) => `api/v1/get-listing/by-location?location=${country}`,
      providesTags: (country) => [{ type: "Listings", id: country }],
    }),
    getListingsByType: build.query({
      query: (type) => `api/v1/get-listing/by-type?type=${type}`,
      providesTags: (type) => [{ type: "Listings", id: type }],
    }),
    getListingsByCategory: build.query({
      query: (category) =>
        `api/v1/get-listing/by-category?category=${category}`,
      providesTags: (category) => [{ type: "Listings", id: category }],
    }),
    getReservationByListingId: build.query({
      query: (listingId: any) =>
        `api/v1/reservation/get-all-reservations/${listingId}`,
      providesTags: (listingId: any) => [
        { type: "Reservation", id: listingId },
      ],
    }),
    getReservationByUserId: build.query({
      query: (userId: any) => `api/v1/reservation/get-reservations/${userId}`,
      providesTags: (userId: any) => [{ type: "Reservation", id: userId }],
    }),
  }),
});

export const {
  useGetReservationByUserIdQuery,
  useGetListingsQuery,
  useGetListingsByCityNameQuery,
  useGetListingsByListingIdQuery,
  useGetListingsByTypeQuery,
  useGetListingsByCountryQuery,
  useGetReservationByListingIdQuery,
  useGetListingsByCategoryQuery,
  useGetListingsByUserIdQuery,
} = api;
