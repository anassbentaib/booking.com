import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

interface HeartButtonProps {
  listingId: string;
  currentUser?: any | null;
  isLoading?: boolean;
}
const HeartButton = ({
  listingId,
  currentUser,
  isLoading,
}: HeartButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(
    localStorage.getItem(`favorite_${listingId}`) === "true"
  );
  const onToggleFavorite = () => {
    if (currentUser === null) {
      window.location.assign("/sign-in");
    }
    setIsFavorited((prevIsFavorited) => !prevIsFavorited);
  };
  useEffect(() => {
    localStorage.setItem(`favorite_${listingId}`, String(isFavorited));
  }, [isFavorited, listingId]);

  return (
    <div
      className="absolute top-1 flex items-center justify-center right-1 bg-white rounded-full shadow-md "
      onClick={onToggleFavorite}
    >
      {loading ? (
        <Spinner
          className={
            "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
          }
          color="blue.500"
        />
      ) : isFavorited ? (
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
  );
};

export default HeartButton;
