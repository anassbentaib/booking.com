interface HeadingProps {
  title?: string;
  subTitle?: string;
  center?: boolean;
  small?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subTitle,
  center,
  small,
}) => {
  return (
    <div
      className={`${center ? "text-center" : "text-start"}
    
    `}
    >
      <div
        className={`
          ${
            small
              ? "text-[13px] sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-xl 4xl:text-xl "
              : "text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-xl 2xl:text-3xl 3xl:text-3xl 4xl:text-3xl"
          }
       font-bold`}
      >
        {title}
      </div>
      <div
        className={` ${
          small
            ? "  text-black mt-2 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-sm 2xl:text-sm 3xl:text-sm 4xl:text-sm"
            : " text-white mt-2  text-[13px] sm:text-[14px] md:text-[15px] lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-lg 4xl:text-lg"
        }`}
      >
        {subTitle || ""}
      </div>
    </div>
  );
};

export default Heading;
