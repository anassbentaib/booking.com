import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import HeartButton from "../../../ui/Button/HeartButton";
import Button from "../../../ui/Button/Button";

interface ListingCardProps {
  data: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  console.log("🚀 ~ data:", data);
  const router = useNavigate();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation?.startDate);
    const end = new Date(reservation?.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div
      onClick={() => router(`/listings/listing/${data?.listingId || data?.id}`)}
      className="col-span-1 cursor-pointer group "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-md
          "
        >
          <Image
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={
              data?.images?.[0] ||
              "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
            }
            alt="Listing"
          />
          <div
            className="
            absolute
            top-0
            right-0
          "
          >
            <HeartButton listingId={data?.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-sm 2xl:text-md ">
          {capitalizeFirstLetter(data?.city) || "Chefchaouen"},{" "}
          {capitalizeFirstLetter(data?.location) || "Morocco"}
        </div>
        {/* <div className="font-light text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-sm 2xl:text-md text-neutral-500">
          {reservation && reservationDate}
        </div> */}
        <div className="font-light text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-sm 2xl:text-md text-neutral-500">
          {reservationDate || data?.propertyName}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            isBorder
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
