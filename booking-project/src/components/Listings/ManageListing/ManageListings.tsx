import { useSelector } from "react-redux";
import { Container, Navbar } from "../..";
import { items } from "../../../Constants";
import ListingCard from "../../../ui/Cards/ListingCard";
import Heading from "../../../ui/Heading/Heading";
import { RootState } from "../../../types";

const ManageListings = () => {
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const login = () => {
    window.location.assign("/sign-in");
  };
  if (currentUser === null) {
    login();
  }

  return (
    <div className="min-h-screen">
      <div className=" py-10 px-3 ">
        <Container>
          <Container>
            <Heading
              title="List your property on Booking.com and start welcoming guests in no time!"
              subTitle="To get started, select the type of property you want to list on Booking.com"
            />
            <div className="mx-auto relative w-full py-10">
              {items?.length && (
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  w-full">
                  {items?.map((item) => (
                    <div key={item.title}>
                      <ListingCard item={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default ManageListings;
