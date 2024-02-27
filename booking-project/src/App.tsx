import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AlternativePlaces,
  Apartement,
  CreateListing,
  DashboardLayout,
  Favorites,
  Footer,
  Home,
  Homes,
  Hotels,
  Layout,
  ListingByCityName,
  ListingId,
  Login,
  ManageListings,
  Properties,
  Reservations,
  SearchResult,
  Signup,
} from "./components";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/listings/listing" element={<ListingByCityName />} />
            <Route
              path="/listings/listing/searchresults"
              element={<SearchResult />}
            />

            <Route
              path="/listings/listing/:listingId"
              element={<ListingId />}
            />
          </Route>
          <Route
            path="/reservations/reservation/:userId"
            element={<Reservations />}
          />
          <Route path="/favorites/:userId" element={<Favorites />} />
          <Route path="/properties/:userId" element={<Properties />} />

          <Route path="/create-listings" element={<CreateListing />} />
          <Route element={<Layout />}>
            <Route
              path="/create-listings/become-a-host"
              element={<ManageListings />}
            />
            <Route
              path="/create-listings/become-a-host/:type"
              element={<Apartement />}
            />
            <Route
              path="/create-listings/become-a-host/:type"
              element={<Homes />}
            />
            <Route
              path="/create-listings/become-a-host/:type"
              element={<Hotels />}
            />
            <Route
              path="/create-listings/become-a-host/:type"
              element={<AlternativePlaces />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
