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
  status: "Active" | "Cancelled";
  totalPrice: number;
  defaultPrice: number;
};

type BookingStore = {
  bookings: Booking[];
  bookingsById: Record<number, Booking>;
  addBooking: (booking: Booking) => void;
  deleteBooking: (id: number) => void;
  updateBooking: (id: number, booking: Booking) => void;
  restoreBooking: (id: number) => void;
};

const initialState = {
  bookings: [],
};

export const useBookingStore = create<BookingStore>()((set) => ({
  ...initialState,
  bookingsById: {},
  addBooking: (booking) => {
    set((state) => {
      const id = state.bookings.length + 1;
      return {
        bookings: [{ ...booking, id }, ...state.bookings],
        bookingsById: {
          [id]: {
            ...booking,
            id,
          },
          ...state.bookingsById,
        },
      };
    });
  },
  deleteBooking: (id) => {
    set((state) => {
      const deletedBooking = {
        ...state.bookingsById[id],
        status: "Cancelled",
      } as Booking;
      const filteredBookings = state.bookings.filter(
        (booking) => booking.id !== id
      );
      const firstCancelledBookingIndex = filteredBookings.findIndex(
        (booking) => booking.status === "Cancelled"
      );
      if (firstCancelledBookingIndex !== -1) {
        filteredBookings.splice(firstCancelledBookingIndex, 0, deletedBooking);
      } else {
        filteredBookings.push(deletedBooking);
      }

      const updatedBookings =
        state.bookings.length === 1 ? [deletedBooking] : filteredBookings;

      return {
        bookings: updatedBookings,
        bookingsById: {
          ...state.bookingsById,
          [id]: { ...deletedBooking, status: "Cancelled" },
        },
      };
    });
  },
  updateBooking: (id, booking) => {
    set((state) => {
      const updatedBooking = {
        ...state.bookingsById[id],
        ...booking,
      } as Booking;

      const bookings = state.bookings;

      const updatedBookingIndex = bookings.findIndex(
        (booking) => booking.id === id
      );
      if (updatedBookingIndex !== -1) {
        bookings.splice(updatedBookingIndex, 1, updatedBooking);
      } else {
        bookings.push(updatedBooking);
      }

      const updatedBookings =
        state.bookings.length === 1 ? [updatedBooking] : bookings;

      return {
        bookings: updatedBookings,
        bookingsById: {
          ...state.bookingsById,
          [id]: updatedBooking,
        },
      };
    });
  },
  restoreBooking: (id) => {
    set((state) => {
      const restoredBooking = {
        ...state.bookingsById[id],
        status: "Active",
      } as Booking;
      return {
        bookings: state.bookings.map((b) => {
          if (b.id === id) {
            return restoredBooking;
          }
          return b;
        }),
        bookingsById: {
          ...state.bookingsById,
          [id]: restoredBooking,
        },
      };
    });
  },
}));
