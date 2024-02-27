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
import { fetchFavoritesByUserId } from "../../state/favoritesSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const Favorites = () => {
  const router = useNavigate();
  const { userId } = useParams();
  const [deletingId, setDeletingId] = useState("");
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const { data: reservations } = useGetReservationByUserIdQuery(userId);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const favorites = useSelector((state: any) => state.favorites.favorites);
  console.log("🚀 ~ Favorites ~ favorites:", favorites);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoritesByUserId(userId));
    }
  }, [dispatch, userId]);
  const login = () => {
    window.location.assign("/sign-in");
  };
  if (currentUser === null) {
    login();
  }

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  if (favorites === null || favorites.length === 0 || favorites === undefined) {
    return (
      <EmptyState
        title="No favorited listings Found"
        subtitle="Looks like you have no favorited listings on your account."
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
            <div className="px-3 mt-6 min-h-screen">
              <Heading
                title="Favorites"
                subTitle="List of places you favorited!"
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
                {favorites?.map((favorite: any) => (
                  <ListingCard
                    key={favorite.id}
                    data={favorite}
                    actionId={favorite.id}
                    onAction={onCancel}
                    disabled={deletingId === favorite.id}
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

export default Favorites;
