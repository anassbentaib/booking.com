import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { RootState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmptyState from "../EmptySatate/EmptyState";
import Container from "../../ui/Container/Container";
import Heading from "../../ui/Heading/Heading";
import Navbar from "../Navbar/Navbar";
import ListingCard from "../Listings/Listings/ListingCard";
import {
  deleteReservation,
  fetchReservationsByUserId,
} from "../../state/reservationSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchListingByUserId,
  handleDeleteListing,
} from "../../state/listingsSlice";
import { deleteListing } from "../../api";

const Properties = () => {
  const { userId } = useParams();

  const [deletingId, setDeletingId] = useState("");
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const { listings } = useSelector((state: RootState) => state.listings);
  console.log("🚀 ~ Properties ~ listings:", listings);
  useEffect(() => {
    if (userId) {
      dispatch(fetchListingByUserId(userId));
    }
  }, [dispatch, userId]);

  const login = () => {
    window.location.assign("/sign-in");
  };
  if (currentUser === null) {
    login();
  }

  const onDeleteProperty = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        await dispatch(handleDeleteListing(id));
        if (userId) {
          dispatch(fetchListingByUserId(userId));
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
  if (listings === null || listings === undefined || listings.length === 0) {
    return (
      <EmptyState
        title="No properties Found"
        subtitle="Looks like you have no properties, try to creare one"
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
            <div className="px-3 mt-6 min-h-[100vh]">
              <Heading
                title="Your properties"
                subTitle="Promote your project in search results
                "
                small
              />
              {listings?.length && (
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
                  {listings?.map((listing: any) => (
                    <div key={listing?.id}>
                      <ListingCard
                        key={listing?.id}
                        data={listing}
                        actionId={listing?.id}
                        onAction={onDeleteProperty}
                        disabled={deletingId === listing?.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default Properties;
