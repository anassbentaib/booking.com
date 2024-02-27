import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { PiWarningCircleBold } from "react-icons/pi";

interface InputProps {
  id: string;
  text?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  icon?: boolean;
  placeholder?: string;
  FormatPrice?: boolean;
  pattern?: RegExp;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  text,
  placeholder,
  value,
  icon,
  type,
  disabled,
  pattern,
  required,
  register,
  FormatPrice,

  errors,
}) => {
  return (
    <div className="w-full relative text-black">
      {FormatPrice && (
        <BiDollar
          size={18}
          className="text-neutral-700 absolute top-11 left-1"
        />
      )}
      {errors[id] && icon && (
        <PiWarningCircleBold
          size={20}
          className="absolute top-8 right-2 text-red-600 mt-2"
        />
      )}
      <label
        htmlFor={text}
        className={`
            ${errors[id] && "text-red-600 placeholder:text-red-600"}
  text-start  font-semibold text-[14px] text-gray-900
  ${errors[id] ? "text-rose-600" : "text-black"}
  `}
      >
        {text}
      </label>
      <input
        id={id}
        value={value}
        disabled={disabled}
        {...register(id, {
          required,
          ...(type === "email" && { pattern: pattern || /\S+@\S+\.\S+/ }),
        })}
        placeholder={placeholder}
        type={type}
        className={`
        mt-2
        peer
        w-full
        text-sm
        p-2
        bg-white
        border
        rounded-md
        placeholder-gray-500       
         ${errors[id] && "placeholder-rose-600"}
         ${FormatPrice && "pl-6 text-md font-semibold"}

        font-500
        outline-none
        transition
        disabled:opacity-70
        disabled-cursor-not-allowed
        ${errors[id] ? "border-rose-600" : "border-black"}
        ${
          errors[id]
            ? "focus:border-rose-600"
            : "focus:border-[#316FF6] focus:border-2"
        }
        ${errors[id] && "bg-red-200 "}
        ${errors[id] && "bg-opacity-60"}
        ${errors[id] && "text-black"}

`}
      />
    </div>
  );
};

export default Input;
