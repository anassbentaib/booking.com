import { Container } from "../..";
import Card from "../../../ui/Cards/Card";

const CreateDashboard = () => {
  return (
    <Container>
      <Container>
        <div className="flex items-center justify-center mx-auto">
          <div className="grid gap-9 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 5xl:grid-cols-5 mt-5">
            <div className="flex items-center justify-center ">
              <div className="text-center sm:text-center md:text-center lg:text-start xl:text-start 2xk:text-start">
                <h1 className="text-[25px] sm:text-[30px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[40px]  font-bold pb-2">
                  List your
                </h1>
                <h1 className="text-[25px] sm:text-[30px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[40px]   font-bold pb-2 text-blue-600">
                  vacation home
                </h1>
                <h1 className="text-[25px] sm:text-[30px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[40px] font-bold pb-5">
                  on Booking.com
                </h1>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] font-semibold ">
                  Whether hosting is your side passion or full-time job,
                  register your vacation rental on Booking.com to reach
                  travelers worldwide
                </p>
              </div>
            </div>
            <Card />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default CreateDashboard;
