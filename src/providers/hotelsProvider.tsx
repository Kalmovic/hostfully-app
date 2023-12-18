import { create } from "zustand";
import img from "../assets/bookingImg1.png";

type Hotel = {
  id: number;
  title: string;
  description: string;
  defaultPrice: number;
  location: string;
  image: string;
  unavailableDates: string[][];
};

type HotelStore = {
  hotels: Hotel[];
  updateHotelAvailableDates: ({
    id,
    bookedRangeDates,
    action,
  }: {
    id: string;
    bookedRangeDates: string[];
    action?: "remove" | "add";
  }) => void;
};

const initialState = {
  hotels: [
    {
      id: 1,
      title: "Gran Hotel La Florida",
      description:
        "The Gran Hotel La Florida is a 5-star hotel located on Mount Tibidabo, the highest point of the Collserola Ridge in the Sarrià-Sant Gervasi district of Barcelona. It is located in a restored building that dates back to the early 20th century and was inaugurated on 23 February 1925 by King Alfonso XIII of Spain. It was originally known as the Hotel del Tibidabo.",
      defaultPrice: 100,
      location: "London",
      image: img,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
    {
      id: 2,
      title: "El Palace Barcelona",
      description:
        "The hotel El Palace Barcelona is a historic luxury hotel located in Gran Via de les Corts Catalanes, 668, between Passeig de Gràcia and Pau Claris, in the center of Barcelona. It was inaugurated in 1919 and designed by the architect Adolf Florensa.",
      defaultPrice: 200,
      location: "London",
      image: img,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
    {
      id: 3,
      title: "Hotel Rio Lancaster",
      description:
        "The Rio Lancaster Hotel is a hotel located on Avenida Atlântica, in Copacabana, Rio de Janeiro. It is one of the most traditional hotels in the city, having been inaugurated in 1950. It is located in front of the beach, between the streets of Constante Ramos and Santa Clara.",
      defaultPrice: 300,
      location: "London",
      image: img,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
  ],
};

export const useHotelStore = create<HotelStore>((set) => ({
  ...initialState,
  updateHotelAvailableDates: ({ id, bookedRangeDates, action = "remove" }) => {
    set((state) => {
      const updatedHotel = state.hotels.find((h) => h.title === id);
      if (updatedHotel) {
        if (action === "remove") {
          updatedHotel.unavailableDates.push(bookedRangeDates);
        } else {
          updatedHotel.unavailableDates = updatedHotel.unavailableDates.filter(
            (date) => date[0] !== bookedRangeDates[0]
          );
        }
        return {
          ...state,
          hotels: state.hotels.map((h) => (h.title === id ? updatedHotel : h)),
        };
      } else {
        return state;
      }
    });
  },
}));
