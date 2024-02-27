interface PropertyCardProps {
  src?: string;
  title?: string;
  setActive?: () => void;
  active?: boolean;
  onClick?: () => void;
  selected?: boolean;
  subTitle?: string;
}

const PropertyCard = ({
  src,
  title,
  onClick,
  selected,
  subTitle,
}: PropertyCardProps) => {
  return (
    <div
      className={`bg-white w-full cursor-pointer relative`}
      onClick={onClick}
    >
      <div className="px-5 mt-5">
        <div
          className={`
          ${selected ? "border-2 border-blue-500" : ""}
          
          border  p-5 mb-5
        `}
        >
          <div className="flex gap-4 ">
            <div>
              <img
                src={src || ""}
                alt="house"
                className="h-[30px] sm:h-[30px] md:h-[35px] lg:h-[37px] xl:h-[40px] 2xl:h-[40px] 3xl:h-[50px] 5xl:h-[50px]"
              />
            </div>
            <div>
              <h2 className="text-md font-semibold">{title}</h2>
              <p className="text-[12px]">{subTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
