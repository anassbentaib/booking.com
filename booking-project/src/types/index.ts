export interface User {
  sub: string;
  iat: number;
  exp: number;
  id: string | null;
}

export interface Reservation {
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  listingId: string;
  userId: string;
}
export interface Listings {
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  listingId: string;
  userId: string;
}

export interface RootState {
  user: {
    currentUser: User | null;
  };
  reservations: {
    reservationData: Reservation[];
  };
  reservationDates: {
    reservationData: Reservation[];
  };
  listings: {
    listings: Listings[];
  };
}
