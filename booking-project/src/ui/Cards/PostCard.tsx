import { useNavigate } from "react-router-dom";
import { ma } from "../../assets";

interface PostCardProps {
  hieght?: string;
  title?: string;
  flag?: string;
  image?: string;
  isFlag?: boolean;
  text?: string;
  isText?: boolean;
  category?: string;
  route?: string | undefined;
  location?: string | undefined;
  city?: string | undefined;
}
const PostCard = ({
  hieght,
  city,
  location,
  image,
  category,
  title,
  isFlag,
  isText,
  text,
  route,
}: PostCardProps) => {
  return (
    <div
      className=" relative cursor-pointer"
      onClick={() => window.location.assign(route)}
    >
      <img
        src={image || undefined}
        className={`h-${hieght} cursor-pointer object-cover rounded-md 
        
        `}
      />
      <div className="absolute top-1  left-3">
        {isFlag && (
          <div className="flex items-center gap-3">
            <span className="font-bold text-[10px] sm:text-[13px] md:text-md lg:text-lg xl:text-xl 2xl:text-2xl  text-white">
              {title}
            </span>
            <img src={ma} className="w-4 h-4" />
          </div>
        )}
      </div>

      {isText && (
        <div>
          <div>
            <h1 className="text-[14px] font-bold pt-1 capitalize">
              {city}, {location}
            </h1>
          </div>
          <div>
            <h1 className="text-[13px]  pb-1">{category}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
