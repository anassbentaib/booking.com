import { Container, Trending } from "..";
import { useGetListingsQuery } from "../../state/api";
import Explorer from "./Explorer/Explorer";
import Homes from "./Homes/Homes";
import QuickTrip from "./QuickTrip/QuickTrip";
import PropertyType from "./propertyType/PropertyType";
import ListingByType from "./ListingsByTypes/ListingsByTypes";

const Home = () => {
  const { data, isLoading } = useGetListingsQuery({});
 

  return (
    <Container>
      <Container>
        <Container>
          <div className="px-3">
            <div className="py-6 mt-3">
              <Trending />
            </div>
            <div className="py-6 mt-3">
              <Explorer isLoading={isLoading} data={data} />
            </div>
            <div className="py-6">
              <ListingByType isLoading={isLoading} data={data} />
            </div>
            <div className="py-6 ">
              <QuickTrip isLoading={isLoading} data={data} />
            </div>
            <div className=" mt-">
              <PropertyType isLoading={isLoading} data={data} />
            </div>
            <div className=" mt-">
              <Homes isLoading={isLoading} data={data} />
            </div>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
