import { create } from "zustand";

type Booking = {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  image: string;
  startDate: string;
  endDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
  firstName: string;
  lastName: string;
  email: string;
  creditCardNumber: string;
  status: "Active" | "Cancelled";
};

type BookingStore = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  deleteBooking: (id: number) => void;
  updateBooking: (id: number, booking: Booking) => void;
};

const initialState = {
  bookings: [],
};

export const useBookingStore = create<BookingStore>()((set) => ({
  ...initialState,
  addBooking: (booking) => {
    set((state) => ({
      bookings: [
        ...state.bookings,
        { ...booking, id: state.bookings.length + 1 },
      ],
    }));
  },
  deleteBooking: (id) => {
    set((state) => {
      return {
        bookings: state.bookings.map((b) => {
          if (b.id === id) {
            return { ...b, status: "Cancelled" };
          }
          return b;
        }),
      };
    });
  },
  updateBooking: (id, booking) => {
    set((state) => ({
      bookings: state.bookings.map((b) => {
        if (b.id === id) {
          return booking;
        }
        return b;
      }),
    }));
  },
}));
