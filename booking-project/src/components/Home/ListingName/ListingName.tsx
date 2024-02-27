import { useSearchParams } from "react-router-dom";
import PropertiesCard from "../../../ui/Cards/PropertiesCard";
import {
  useGetListingsByCategoryQuery,
  useGetListingsByCityNameQuery,
  useGetListingsByCountryQuery,
  useGetListingsByTypeQuery,
} from "../../../state/api";
import LoadingCard from "../../../ui/Cards/LoadingCard";
import Container from "../../../ui/Container/Container";
import { toast } from "react-hot-toast";

const ListingByCityName = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const location = searchParams.get("location");
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  let queryHook;
  let queryParameter;
  if (city) {
    queryHook = useGetListingsByCityNameQuery;
    queryParameter = city;
  } else if (location) {
    queryHook = useGetListingsByCountryQuery;
    queryParameter = location;
  } else if (type) {
    queryHook = useGetListingsByTypeQuery;
    queryParameter = type;
  } else if (category) {
    queryHook = useGetListingsByCategoryQuery;
    queryParameter = category;
  } else {
    return toast.error("Invalid query");
  }
  const { data, error, isLoading } = queryHook(queryParameter);

  function capitalizeFirstLetter(string: any) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }
  return (
    <div className=" min-h-[100vh] ">
      <Container>
        <Container>
          <Container>
            <div className=" w-full px-0 sm:px-3  md:px-0 xl:px-0 2xl:px-0 5xl:px-0 3xl:px-0 mx-0 rounded-md min-h-[100vh] ">
              <div className="px-5 pt-10 sm:px-1 md:px-2 lg:px-6">
                <h1
                  className=" font-bold
                  text-start text-[14px] sm:text-[17px] md:text-[19px] lg:text-[22px] xl:text-xl 2xl:text-2xl "
                >
                  {`${
                    capitalizeFirstLetter(
                      city || location || type || category || undefined
                    ) || undefined
                  }: ${data?.length || 0} properties found`}
                </h1>

                <div className="mt-7 lg:grid lg:grid-cols-12 lg:items-start  ">
                  <div className="lg:col-span-12 l">
                    {data?.length === 0 && (
                      <p className="text-neutral-500">No properties found</p>
                    )}
                    <ul>
                      {data?.map((item: any) =>
                        isLoading ? (
                          <LoadingCard />
                        ) : (
                          <PropertiesCard
                            key={item}
                            item={item}
                            isLoading={isLoading}
                          />
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ListingByCityName;
