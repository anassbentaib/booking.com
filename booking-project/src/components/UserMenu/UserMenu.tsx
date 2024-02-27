import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import MenuItem from "./MenuItem";
import Button from "../../ui/Button/Button";
import { userIcon } from "../../assets";
import { FaHeart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { BsPostcardHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

const UserMenu = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const Logout = () => {
    localStorage.removeItem("userInfo");
    window.location.assign("/sign-in");
  };

  return (
    <div className="relative">
      {currentUser ? (
        <div>
          <div className="flex flex-row items-center gap-3">
            <div>
              <Button
                onClick={() => window.location.assign("/create-listings")}
                label="List your property"
                isTransparent
              />
            </div>
            <div
              onClick={toggleOpen}
              className="
        p-4
        md:py-1
        md:px-2
        flex 
        flex-row 
        z-100
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        transition
        "
            >
              <div className="hidden md:block z-10">
                <Avatar src={userIcon} />
              </div>
            </div>
          </div>
          {isOpen && (
            <div
              className="
          absolute 
          rounded-md 
          shadow-xl
          w-[17vw]
          md:w-4/4 
          z-10          bg-white 
          overflow-hidden
          text-black 
          right-0 
          top-12 
          text-sm
        "
            >
              <div className="flex flex-col cursor-pointer">
                <>
                  <MenuItem
                    color="red"
                    icon={FaHeart}
                    label="Favorites"
                    onClick={() =>
                      window.location.assign(`/favorites/${currentUser?.id}`)
                    }
                  />
                  <MenuItem
                    icon={TbBrandBooking}
                    color="red"
                    label="Reservations"
                    onClick={() =>
                      window.location.assign(
                        `/reservations/reservation/${currentUser?.id}`
                      )
                    }
                  />
                  <MenuItem
                    icon={BsPostcardHeartFill}
                    label="Properties"
                    color="red"
                    onClick={() =>
                      window.location.assign(`/properties/${currentUser?.id}`)
                    }
                  />
                  <MenuItem
                    icon={MdLogout}
                    label="Logout"
                    onClick={Logout}
                    color="red"
                  />
                </>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <div>
            <Button
              onClick={() => window.location.assign("/create-listings")}
              label="List your property"
              isTransparent
            />
          </div>
          <div className="px-2">
            <Button
              onClick={() => window.location.assign("/sign-up")}
              label="Register"
              isWhite
            />
          </div>
          <div className="px-2">
            <Button
              onClick={() => window.location.assign("/sign-in")}
              label="Sign in"
              isWhite
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
