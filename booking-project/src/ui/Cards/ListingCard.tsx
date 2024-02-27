import Button from "../Button/Button";

interface ListingCardProps {
  item?: any;
}
const ListingCard = ({ item }: ListingCardProps) => {
  return (
    <div className="  h-full w-full  bg-white">
      <div className="text-black  rounded-lg border w-full border-gray-300 min-h-[40vh] relative ">
        <div className=" pt-4  w-full">
          <a href="#" className="mt-5">
            <img
              className="w-[45px] h-[45px] mx-auto"
              src={item?.image}
              alt={item?.title}
            />
          </a>
          <div className="p-5 flex-grow">
            <a href="#">
              <h5 className="mb-2 text-md font-bold tracking-tight text-center">
                {item?.title}
              </h5>
            </a>
            <p className="text-[13px] text-center font-normal mb-1">
              {item?.description}
            </p>
          </div>
        </div>
        <div className="mt-auto px-5 absolute right-0 bottom-0 w-full mb-4">
          <Button
            label="List your property"
            isBlue
            onClick={() => window.location.assign(item?.route)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
