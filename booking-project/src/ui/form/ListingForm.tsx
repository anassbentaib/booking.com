import { useCallback } from "react";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";

interface ListingFormProps {
  subTitle: string;
  bodyContent?: React.ReactElement;
  footerContent?: React.ReactElement;
  onSubmit: () => void;
  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  disabled?: boolean;
  step?: number;
}

const ListingForm = ({
  subTitle,
  bodyContent,
  step,
  secondaryActionLabel,
  actionLabel,
  disabled,
  onSubmit,
  secondaryAction,
}: ListingFormProps) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  return (
    <div className="min-h-[100vh] px-2">
      <div className="flex items-center mx-auto justify-center relative ">
        <div className="mx-auto min-w-[100px] sm:min-w-full md:min-w-full lg:min-w-[100px] xl:min-w-[100px] 2xl:min-w-[600px] max-w-[750px]">
          <div className="pb-7 pt-10 px-2">
            <Heading subTitle={subTitle} />
          </div>
          <div className=" border border-gray-300 bg-white min-h-[0vh]">
            {bodyContent}
          </div>
          <div className="mt-9 border-b" />
          {secondaryAction && (
            <div className="py-3 mt-2 flex items-center gap-4 mb-9 pb-10 px-">
              <div className={`pt-2 flex flex-row items-center gap-4 w-full`}>
                <div className="w-2/6    ">
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    isBorder
                  />
                </div>
                <Button
                  isBlue
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>

              {/* <div className={`${secondaryAction ? "w-2/6" : "w-full"}`}>
              {secondaryAction && secondaryActionLabel && (
                <Button
                  label={secondaryActionLabel}
                  disabled={disabled}
                  onClick={handleSecondaryAction}
                />
              )}
            </div>
            <div className={`${secondaryAction ? "w-4/5" : "w-full"}`}>
              <Button
                label={actionLabel}
                isBlue
                disabled={disabled}
                onClick={handleSubmit}
              />
            </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
