import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { RootState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmptyState from "../EmptySatate/EmptyState";
import { useGetReservationByUserIdQuery } from "../../state/api";
import Container from "../../ui/Container/Container";
import Heading from "../../ui/Heading/Heading";
import Navbar from "../Navbar/Navbar";
import ListingCard from "../Listings/Listings/ListingCard";
import {
  deleteReservation,
  fetchReservationsByUserId,
} from "../../state/reservationSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const Reservations = () => {
  const router = useNavigate();
  const { userId } = useParams();

  const [deletingId, setDeletingId] = useState("");
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const { isLoading, error, reservations } = useSelector(
    (state: any) => state.reservations
  );

  console.log("🚀 ~ Reservations ~ reservations:", reservations);
  useEffect(() => {
    if (userId) {
      dispatch(fetchReservationsByUserId(userId));
    }
  }, [dispatch, userId]);

  const login = () => {
    window.location.assign("/sign-in");
  };
  if (currentUser === null) {
    login();
  }

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await dispatch(deleteReservation(id));
        if (userId) {
          dispatch(fetchReservationsByUserId(userId));
        }

        toast.success("Reservation cancelled");
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        toast.error("Something went wrong.");
      } finally {
        setDeletingId("");
      }
    },
    [dispatch]
  );
  if (
    reservations === null ||
    reservations === undefined ||
    reservations.length === 0
  ) {
    return (
      <EmptyState
        title="No reservations Found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }
  return (
    <div>
      <div>
        <Navbar isUser />
      </div>
      <Container>
        <Container>
          <Container>
            <div className="px-3 mt-6  min-h-[100vh]">
              <Heading
                title="Reservations"
                subTitle="Bookings on your properties"
                small
              />
              <div
                className="
                    my-10
                    grid 
                    pb-10
                    grid-cols-2 
                    sm:grid-cols-3 
                    md:grid-cols-3 
                    lg:grid-cols-5
                    xl:grid-cols-4
                    2xl:grid-cols-4
                    gap-8
                    "
              >
                {reservations?.map((reservation: any) => (
                  <ListingCard
                    key={reservation.id}
                    data={reservation}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel reservation"
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default Reservations;
