import Button from "../Button/Button";
import { Navbar } from "../../components";
import { useCallback } from "react";
interface PartnerLoginFormProps {
  title?: string;
  formBody?: React.ReactElement;
  footerContent?: React.ReactElement;
  onSubmit: () => void;
  actionLable?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  disabled?: boolean;
}
const PartnerLoginForm = ({
  title,
  secondaryAction,
  formBody,
  footerContent,
  secondaryActionLabel,
  onSubmit,
  disabled,
  actionLable,
}: PartnerLoginFormProps) => {
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
    <div>
      <Navbar />
      <div className="flex items-center mx-auto justify-center relative min-h-[80vh] px-3">
        <div className="mx-auto min-w-[200px] max-w-[400px]">
          <h5 className="text-start font-bold text-xl py-5 text-md">{title}</h5>
          <div className="w-full">
            {formBody}
            <div
              className={`pt-2
            
              ${
                secondaryAction ? "flex flex-row items-center gap-4 w-full" : ""
              }
              `}
            >
              {secondaryAction && secondaryActionLabel && (
                <Button
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                  isBorder
                />
              )}
              <Button
                isBlue
                disabled={disabled}
                label={actionLable}
                onClick={handleSubmit}
              />
            </div>

            <div>{footerContent}</div>
            <hr className="border-3  my-5 text-black divide-white" />
            <p className="text-[12px] text-center py-2">
              By signing in or creating an account, you agree with our Terms &
              <span className="text-[#316FF6] cursor-pointer">
                {" "}
                Conditions{" "}
              </span>
              and
              <span className="text-[#316FF6] cursor-pointer">
                {" "}
                Privacy Statement
              </span>
            </p>
            <hr className="border-3  my-5 text-black divide-white" />
            <div className="block">
              <div className="text-[12px] text-center">
                All rights reserved.
              </div>
              <div className="text-[12px] text-center">
                Copyright (2006-2024) – Booking.com™
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLoginForm;
