import { create } from "zustand";
import img1 from "../assets/bookingImg1.png";
import img2 from "../assets/bookingImg2.png";
import img3 from "../assets/bookingImg3.png";
import img4 from "../assets/bookingImg4.png";
import img5 from "../assets/bookingImg5.png";
import img6 from "../assets/bookingImg6.png";

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
    action?: "makeRangeUnvailable" | "makeRangeAvailable";
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
      image: img1,
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
      image: img2,
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
      image: img3,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
    {
      id: 4,
      title: "Hotel Fasano Rio de Janeiro",
      description:
        "The Hotel Fasano Rio de Janeiro is a luxury hotel located on Avenida Vieira Souto, in front of Ipanema Beach, in Rio de Janeiro. It was inaugurated in 2007 and is the first hotel of the Fasano chain outside São Paulo. It is located in a building designed by the architect Oscar Niemeyer.",
      defaultPrice: 400,
      location: "London",
      image: img4,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
    {
      id: 5,
      title: "Hotel Nacional Rio de Janeiro",
      description:
        "The Hotel Nacional Rio de Janeiro is a hotel located on Avenida Niemeyer, in São Conrado, Rio de Janeiro. It was inaugurated in 1972 and is considered one of the most luxurious hotels in the city. It was designed by the architect Oscar Niemeyer and is located in front of the beach.",
      defaultPrice: 500,
      location: "London",
      image: img5,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
    {
      id: 6,
      title: "Hotel Copacabana Palace",
      description:
        "The Copacabana Palace Hotel is a luxury hotel located on Avenida Atlântica, in Copacabana, Rio de Janeiro. It was inaugurated in 1923 and is considered the most famous hotel in Brazil. It is located in front of the beach, between the streets of Constante Ramos and Santa Clara.",
      defaultPrice: 600,
      location: "London",
      image: img6,
      unavailableDates: [
        ["2024-01-10", "2024-01-13"],
        ["2023-12-22", "2023-12-24"],
      ],
    },
  ],
};

export const useHotelStore = create<HotelStore>((set) => ({
  ...initialState,
  updateHotelAvailableDates: ({
    id,
    bookedRangeDates,
    action = "makeRangeUnvailable",
  }) => {
    set((state) => {
      const updatedHotel = state.hotels.find((h) => h.title === id);
      if (updatedHotel) {
        if (action === "makeRangeUnvailable") {
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
