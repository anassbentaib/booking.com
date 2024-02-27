import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1";
const API = axios.create({ baseURL: baseUrl });

export const Login = (data: any) => API.post(`/auth/login`, data);
export const Register = (data: any) => API.post(`/auth/register`, data);

export const PartnerRegister = (data: any) =>
  API.post(`/auth/partner-register`, data);

export const PartnerLogin = (email: string, password: string) =>
  API.post(`/auth/partner-login`, { email, password });

export const CreateListing = (data: any) => API.post(`/create-listing`, data);

export const getAllListings = () => API.get("/get-listings");

export const addToFavoritess = (listingId: any, userId: any) =>
  API.post(`/cart/add-to-favorites/${userId}`, { listingId });

export const createReservation = (
  totalPrice: number,
  startDate: any,
  endDate: any,
  listingId: string,
  userId: string | null
) =>
  API.post(`/reservation/create-reservation`, {
    totalPrice,
    startDate,
    userId,
    endDate,
    listingId,
  });

export const getReservationByListingId = (listingId: any) =>
  API.get(`/reservation/get-all-reservations/${listingId}`);

export const getSearchedPosts = (queryParams: any) =>
  API.get("/listings/get-by-query", { params: queryParams });

export const deleteReservations = (id: string) =>
  API.delete(`/reservation/delete-reservation/${id}`);

export const deleteListing = (id: string) =>
  API.delete(`/listings/delete-listing/${id}`);

export const getReservationsByUserId = (userId: string) =>
  API.get(`/reservation/get-reservations/${userId}`);

export const getListingsByUserId = (userId: string) =>
  API.get(`/get-listing/by-user/${userId}`);

export const addToFavorites = (userId: string, listingId: any) =>
  API.post(`/cart/add-to-favorites/${userId}/${listingId}`);
export const removeFromFavorites = (id: any) =>
  API.delete(`/cart/remove/${id}`);

export const getFavoritesByUserId = (userId: string) =>
  API.get(`/cart/get-favorites/${userId}`);
