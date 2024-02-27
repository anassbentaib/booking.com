interface PostCardProps {
  hieght?: string;
  title?: string;
  flag?: string;
  image?: string;
  isFlag?: boolean;
  text?: string;
  isText?: boolean;
  category?: string;
  description?: string;
  price?: number;
  city?: string;
  location?: string;
  type?: string;
}
const ShadowCard = ({
  image,
  price,
  category,
  city,
  location,
  type,
}: PostCardProps) => {
  return (
    <div
      className="p-3 cursor-pointer relative"
      onClick={() => window.location.assign(`/listings/listing?type=${type}`)}
    >
      <div className="max-w-sm rounded-md overflow-hidden shadow-lg ">
        <img
          className="w-full object-cover h-full max-h-[200px] min-h-[200px]"
          src={image}
          alt={category}
        />
        <div className="mt-3 px-3">
          <div className="font-semibold text-[15px] text-start mb-1">
            {category}
          </div>
          <div className=" text-[13px] text-start mb-1">
            {city}, {location}
          </div>

          <div className=" ">
            <div className="flex items-center justify-end gap-2 py-3 px-2">
              <span className="text-[13px]">Starting from </span>
              <h1 className="font-bold text-end text-sm">MAD {price || 0} </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowCard;
