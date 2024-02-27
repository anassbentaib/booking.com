import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as api from "../api/index";
interface IUseFavorite {
  listingId: string;
  currentUser?: any | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setLoading(true);
      try {
        let request;

        if (hasFavorited) {
          request = () => api.removeFromFavorites(listingId);
        } else {
          request = () => api.addToFavorites(listingId);
        }
        await request();
        window.location.reload();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [hasFavorited, listingId, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
    loading,
  };
};

export default useFavorite;
