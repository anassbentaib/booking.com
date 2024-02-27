import { Image, Spinner } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa6";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import { RootState } from "../../types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchFavoritesByUserId,
  handleAddToFavorite,
  handleRemoveFromFavorites,
} from "../../state/favoritesSlice";
import toast from "react-hot-toast";

interface ListingCardProps {
  item?: any;
  isLoading?: boolean;
}
const PropertiesCard = ({ item }: ListingCardProps) => {
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const userId = currentUser?.id;
  const listingId = item?.id;
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const isLoading = useSelector((state: any) => state.favorites.isLoading);
  const error = useSelector((state: any) => state.favorites.error);
  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoritesByUserId(userId));
    }
  }, [dispatch, userId, listingId]);
  const isFavorited = useMemo(() => {
    const list = favorites || [];
    return (
      Array.isArray(favorites) &&
      list?.some((favItem: any) => favItem.listingId === listingId)
    );
  }, [favorites, listingId]);

  console.log("🚀 ~ PropertiesCard ~ favorites:", favorites);
  console.log("🚀 ~ PropertiesCard ~ isFavorited:", isFavorited);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      try {
        if (isFavorited) {
          if (listingId) {
            dispatch(handleRemoveFromFavorites(isFavorited));
            if (userId) {
              dispatch(fetchFavoritesByUserId(userId));
            }
          }
        } else {
          dispatch(handleAddToFavorite({ userId, listingId }));
          // if (userId) {
          //   dispatch(fetchFavoritesByUserId(userId));
          // }
        }
      } catch (error) {
        toast.error("Something went wrong.");
        console.log("error", error);
      }
    },
    [currentUser, isFavorited, listingId, favorites]
  );

  // const handleFavoriteClick = () => {
  //   if (isFavorited) {
  //     dispatch(handleRemoveFromFavorites({ userId, listingId }));
  //     toast.success("Success");
  //   } else {
  //     dispatch(handleAddToFavorite({ userId, listingId }));
  //     dispatch(fetchFavoritesByUserId({ userId, listingId }));
  //     toast.success("removed");
  //   }
  // };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <li
      className=" sm:flex md:flex  lg:flex xl:flex 2xl:flex 3xl:flex 5xl:flex mx-auto py-3  w-full px-1  md:px-3 lg:px-4 xl:px-4 2xl:px-4 rounded-md border  mb-5 cursor-pointer
      group
      "
      onClick={() => window.location.assign(`/listings/listing/${item?.id}`)}
      // onClick={onToggleFavorite}
    >
      <div className="relative rounded-md -hidden mr-0 sm:mr-4 md:mr-0 2xl:mr-0">
        <Image
          src={
            item?.imageSrc?.[0] ||
            "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
          }
          alt={item?.propertyName}
          className="max-w-full sm:max-w-[250px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[220px] min-w-full sm:min-w-[250px] md:min-w-[220px] lg:min-w-[220px] xl:min-w-[220px] h-[210px] sm:h-[160px] md:h-[190px] xl:h-[180px] w-full object-cover rounded-md"
        />

        <div
          className="absolute top-1 flex items-center justify-center right-1 bg-white rounded-full shadow-md "
          onClick={toggleFavorite}
        >
          {isFavorited ? (
            <button
              className={
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              }
            >
              <FaHeart size={15} color="red" />
            </button>
          ) : (
            <button
              className={
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              }
            >
              <FaRegHeart size={15} />
            </button>
          )}
        </div>
      </div>
      <div className="relative flex flex-1 flex-col justify-between">
        <div className="relative  w-full md:px-4 lg:px-6 xl:px-4 2xl:px-9 3xl:px-9 5xl:px-9 ">
          <div className="relative">
            <h1 className=" text-start text-[12px] sm:text-[13px] md:[14px] lg:text-[15px] xl:text-sm 2xl:text-lg mb-3 font-bold text-blue-600 hover:text-black cursor-pointer pt-4 sm:pt-0 2xl:pt-0">
              {item?.propertyName}
            </h1>
            <div className="flex items-center gap-3 text-blue-600 my-3">
              <span className="underline text-[11px] font-semibold">
                {item?.street}, {item?.location}
              </span>
            </div>
            <div className="my-3">
              <span className="font-semibold  text-[11px]  sm:text-[12px] md:[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] bg-[#008009] text-white py-1 px-2 rounded-md">
                Free airport taxi
              </span>
            </div>
            <div>
              <span className="font-bold text-[12px]  sm:text-[13px] md:[11px] lg:text-[14px] xl:text-[14px] 2xl:text-[15px] text-[#008009]">
                Free cancellation{" "}
              </span>

              <p className="text-[11px]  sm:text-[12px] md:[13px] lg:text-[13px] xl:text-[12px] 2xl:text-[13px] text-[#008009]">
                You can cancel later, so lock in this great price today!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="hidden sm:hidden  lg:flex 2xl:flex items-center gap-3 mt-1 justify-center">
          <div className="">
            <p className="text-[11px]  sm:text-[12px] md:[13px] lg:text-[13px] xl:text-[12px] 2xl:text-[13px]  font-bold">
              Very Good
            </p>
            <span className="text-[11px]  sm:text-[12px] md:[13px] lg:text-[13px] xl:text-[12px] 2xl:text-[13px] ">
              604 reviews
            </span>
          </div>
          <div>
            <button className="bg-blue-800 rounded-md  text-white p-2 text-[11px]  sm:text-[12px] md:[13px] lg:text-[13px] xl:text-[12px] 2xl:text-[13px] font-bold">
              9.9
            </button>
          </div>
        </div>
        <div className="mt-5 hidden sm:hidden lg:flex  2xl:flex items-center">
          <Button label="Show price" isBlue />
        </div>
      </div>
    </li>
  );
};

export default PropertiesCard;
