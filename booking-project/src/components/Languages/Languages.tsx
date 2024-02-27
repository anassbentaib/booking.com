import Avatar from "../../ui/Avatar";
import { flag } from "../../assets";
import { BsQuestionCircle } from "react-icons/bs";

const Languages = () => {
  return (
    <>
      <div className="flex items-center">
        <Avatar src={flag} />
      </div>
      <div className="flex px-3">
        <div className="hover:bg-white hover:bg-opacity-15 rounded-md w-[40px] h-[40px] flex items-center justify-center">
          <BsQuestionCircle size={24} />
        </div>
      </div>
    </>
  );
};

export default Languages;
