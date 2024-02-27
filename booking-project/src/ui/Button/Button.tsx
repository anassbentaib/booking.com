import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType;
  disabled?: boolean;
  isTransparent?: boolean;
  isBorder?: boolean;
  isBlueTransparent?: boolean;
  small?: boolean;
  type?: string | null;
  isWhite?: boolean;
  color?: string;
  isBlue?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  isBorder,
  color,
  isBlueTransparent,
  onClick,
  disabled,
  icon: Icon,
  isTransparent,
  isBlue,
  outline,
  small,
  isWhite,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-md
        transition
        w-full
        ${isTransparent && "hover:bg-white"}
        ${isTransparent && "bg-transparent"}
        ${isTransparent && " hover:bg-opacity-15"}
        ${isTransparent && "border-none"}
        ${isTransparent && "text-white"}

        ${
          isBorder &&
          "bg-transparent hover:bg-blue-600 border border-blue-500 text-blue-600   hover:bg-opacity-5  py-2"
        }
        ${
          isBlueTransparent &&
          "bg-transparent hover:bg-blue-600 border-none text-blue-600 py-2  hover:bg-opacity-10"
        }
        ${isWhite && "bg-white text-[#003b95] border-white py-1"}
      

        ${small ? "text-sm" : "text-sm"}
        ${small ? "py-1" : "py-2"}
        ${small ? "font-semibold" : "font-semibold"}
        ${small ? "border" : "border"}
        ${
          isBlue &&
          `bg-[#006ce4] border-[#006ce4] hover:bg-[#003b95] text-white py-3`
        }
        ${isBlue && `bg-[#006ce4] border-[#006ce4] py-1`}
        ${outline && "bg-white"}
        ${outline && "border-gray py-5"}
        ${outline && "text-black"}
     
      `}
    >
      {Icon && (
        <Icon
          color={color}
          size={24}
          className={`flex items-center justify-center mx-auto
        `}
        />
      )}
      {!outline && (
        <span className="px-3 py- text-[12px] sm:text-[13px] md:text-[14px] lg:text-[14px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[16px] 4xl:text-[15px]">
          {" "}
          {label}
        </span>
      )}
    </button>
  );
};

export default Button;
