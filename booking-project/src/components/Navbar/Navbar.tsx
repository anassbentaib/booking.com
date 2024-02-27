import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import Container from "../../ui/Container/Container";
import Currency from "../Currency/Currency";
import Languages from "../Languages/Languages";
import UserMenu from "../UserMenu/UserMenu";
import Categories from "../Categories/Categories";
import Drawer from "../../Menu/Menu";
interface NavbarProps {
  isMad?: boolean;
  isUser?: boolean;
  categories?: boolean;
}
const Navbar = ({ isMad, isUser, categories }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const onToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=" min-h-[10vh] bg-[#003b95] text-white px-3">
      <Container>
        <Container>
          <Container>
            <div className="flex items-center justify-between pt-4  ">
              <a href="/" className="font-bold text-xl">
                Booking.com
              </a>
              <div className=" items-center hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
                {isMad && <Currency />}
                <Languages />

                {isUser && <UserMenu />}
              </div>
              <div
                onClick={onToggle}
                className="flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden"
              >
                {isOpen ? (
                  <IoMdClose size={24} />
                ) : (
                  <HiOutlineMenuAlt1 size={26} />
                )}
              </div>
            </div>
            {categories && <Categories />}
          </Container>
        </Container>
      </Container>

      <Drawer open={openRight} side="right" setOpen={setOpenRight} />
    </div>
  );
};

export default Navbar;
