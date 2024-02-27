import { useCallback } from "react";
import Button from "../Button/Button";

interface CreateCardProps {
  item?: any;
  onSubmit: () => void;
  disabled: boolean;
  secondaryAction: () => void;
}
const CreateCard = ({
  item,
  disabled,
  onSubmit,
  secondaryAction,
}: CreateCardProps) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);
  return (
    <div className="flex flex-col h-full w-full group bg-white">
      <div className="text-black mx-auto flex-grow min-h-[37vh]">
        <div className="pt-4 text-center ">
          <div className="my-5">
            <span className="text-[15px] text-center font-normal my-7">
              You're listing:
            </span>
          </div>
          <a href="#" className="mt-5">
            <img
              className="w-[60px] h-[60px] mx-auto"
              src={item?.image}
              alt={item?.title}
            />
          </a>
          <div className="p-1 flex-grow">
            <a href="#">
              <h5 className=" text-xl font-bold tracking-tight text-center py-5 ">
                One condo hotel where guests can rent an entire apartment
              </h5>
            </a>
            <p className="text-md text-center font-normal mb-1">
              Does this sound like your property?
            </p>
          </div>
        </div>
        <div className="mt-auto px-1">
          <Button
            label="List your property"
            isBlue
            onClick={handleSubmit}
            disabled={disabled}
          />
        </div>
        <div className="mt-auto px-1 py-4">
          <Button
            label="No, I need to make a change"
            isBorder
            onClick={secondaryAction}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
