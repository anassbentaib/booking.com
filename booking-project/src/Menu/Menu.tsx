interface DrawerProps {
  children?: React.ReactNode;
  open: boolean;
  side: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
import React from "react";
import { clsx } from "clsx";
import { IoCloseSharp } from "react-icons/io5";
import { routes } from "../components/Categories/Categories";
import Button from "../ui/Button/Button";
import Avatar from "../ui/Avatar";
import { userIcon } from "../assets";

const Drawer = ({ open, setOpen, side = "right" }: DrawerProps) => {
  const currentUser = true;

  return (
    <div
      id={`dialog-${side}`}
      className="relative z-10 w-full text-black"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(!open)}
    >
      <div
        className={clsx(
          "fixed inset-0 bg-white  transition-all ",
          {
            "opacity-100 duration-500 ease-in-out visible": open,
          },
          { "opacity-0 duration-500 ease-in-out invisible": !open }
        )}
      >
        <div className=" relative bg-white  transition-all ">
          <div className="px-2">
            <div
              className="absolute top-3 right-3 "
              onClick={() => setOpen(!open)}
            >
              <IoCloseSharp size={20} />
            </div>
            <div className="">
              <h1 className="font-bold">More</h1>
            </div>
            <div className="space-x-1 flex-column">
              {routes.map((route) => (
                <a
                  key={route.href}
                  href=""
                  className="text-sm group p-2   sm:font-[10px] md:font-[11px] lg:font-[12px] xl:font-[13px] 2xl:font-[14px] 3xl:font-[15px] font-semibold cursor-pointer hover:text-black hover:bg-white/10 rounded-full transition"
                >
                  <div
                    className="flex items-center flex-1 px-1"
                    // onClick={route.onClick}
                  >
                    <route.icon className="h-5 w-5 mr-1" />
                    {route.label}
                  </div>
                </a>
              ))}
              <div>
                <div className="flex">
                  {currentUser ? (
                    <>
                      <div className="px-">
                        <Button
                          onClick={() =>
                            window.location.assign("/create-listings")
                          }
                          label="List your property"
                          isBlue
                        />
                      </div>
                      <Avatar src={userIcon} />
                    </>
                  ) : (
                    <>
                      <div className="2">
                        <Button
                          onClick={() => window.location.assign("/sign-up")}
                          label="Register"
                          isBlue
                        />
                      </div>
                      <div className="px-2">
                        <Button
                          onClick={() => window.location.assign("/sign-in")}
                          label="Sign in"
                          isBlue
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
