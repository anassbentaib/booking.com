import Avatar from "../../ui/Avatar";
import { userIcon } from "../../assets";
import Button from "../../ui/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

const User = () => {
  const { currentUser } = useSelector((state: RootState) => state?.user);
  return (
    <div className="flex">
      {currentUser ? (
        <>
          <div className="px-3">
            <Button
              onClick={() => window.location.assign("/create-listings")}
              label="List your property"
              isTransparent
            />
          </div>
          <Avatar src={userIcon} />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default User;
