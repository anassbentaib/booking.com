import { Range } from "react-date-range";
import Button from "../../../ui/Button/Button";
import Calendar from "../../../ui/Input/Calendar";
interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}
const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div
      className="
    bg-white 
      rounded-xl 
      border-[1px]
    border-neutral-200 
      overflow-hidden
    "
    >
      <div
        className="
                  flex 
                  flex-row 
                  items-center 
                  gap-1 p-4"
      >
        <div className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg  font-semibold">
          MAD {price || 0}
        </div>
        <div
          className="font-light text-neutral-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg 
"
        >
          night
        </div>
      </div>
      <hr />
      <div
        className="          text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg 
"
      >
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value: any) => onChangeDate(value?.selection)}
        />
      </div>
      <hr />
      <div className="p-4 ">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} isBlue />
      </div>
      <hr />
      <div
        className="
        p-4 
        flex 
        flex-row 
        items-center 
        justify-between
        font-semibold
        text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg 

      "
      >
        <div>Total</div>
        <div>MAD {totalPrice || 0}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
