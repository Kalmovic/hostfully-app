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
  rating: string;
  description: string;
  defaultPrice: number;
  location: string;
  image: string;
  unavailableDates: string[][];
  ammenities: string[];
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
      rating: "9,5",
      description:
        "The Gran Hotel La Florida is a 5-star hotel located on Mount Tibidabo, the highest point of the Collserola Ridge in the Sarrià-Sant Gervasi district of Barcelona. It is located in a restored building that dates back to the early 20th century and was inaugurated on 23 February 1925 by King Alfonso XIII of Spain. It was originally known as the Hotel del Tibidabo.",
      ammenities: [
        "Free Wi-Fi",
        "Air conditioning",
        "Beachfront",
        "Fitness center",
        "Spa",
        "Pool",
      ],
      defaultPrice: 400,
      location: "London",
      image: img1,
      unavailableDates: [],
    },
    {
      id: 2,
      title: "El Palace Barcelona",
      rating: "9,0",
      description:
        "The hotel El Palace Barcelona is a historic luxury hotel located in Gran Via de les Corts Catalanes, 668, between Passeig de Gràcia and Pau Claris, in the center of Barcelona. It was inaugurated in 1919 and designed by the architect Adolf Florensa.",
      ammenities: [
        "Free Wi-Fi",
        "Air conditioning",
        "Pool",
        "Beachfront",
        "Fitness center",
        "24h room service",
      ],
      defaultPrice: 200,
      location: "London",
      image: img2,
      unavailableDates: [],
    },
    {
      id: 3,
      title: "Hotel Rio Lancaster",
      rating: "8,5",
      description:
        "The Rio Lancaster Hotel is a hotel located on Avenida Atlântica, in Copacabana, Rio de Janeiro. It is one of the most traditional hotels in the city, having been inaugurated in 1950. It is located in front of the beach, between the streets of Constante Ramos and Santa Clara.",
      ammenities: ["Free Wi-Fi", "Air conditioning", "Spa", "Fitness center"],
      defaultPrice: 100,
      location: "London",
      image: img3,
      unavailableDates: [],
    },
    {
      id: 4,
      title: "Hotel Fasano Rio de Janeiro",
      rating: "9,0",
      description:
        "The Hotel Fasano Rio de Janeiro is a luxury hotel located on Avenida Vieira Souto, in front of Ipanema Beach, in Rio de Janeiro. It was inaugurated in 2007 and is the first hotel of the Fasano chain outside São Paulo. It is located in a building designed by the architect Oscar Niemeyer.",
      ammenities: [
        "Free Wi-Fi",
        "Air conditioning",
        "Beachfront",
        "Restaurant",
        "Bar",
        "Transfer service",
      ],
      defaultPrice: 400,
      location: "London",
      image: img4,
      unavailableDates: [],
    },
    {
      id: 5,
      title: "Hotel Nacional Rio de Janeiro",
      rating: "8,5",
      description:
        "The Hotel Nacional Rio de Janeiro is a hotel located on Avenida Niemeyer, in São Conrado, Rio de Janeiro. It was inaugurated in 1972 and is considered one of the most luxurious hotels in the city. It was designed by the architect Oscar Niemeyer and is located in front of the beach.",
      ammenities: [
        "Free Wi-Fi",
        "Air conditioning",
        "Pool",
        "Beachfront",
        "Restaurant",
        "Transfer service",
      ],
      defaultPrice: 200,
      location: "London",
      image: img5,
      unavailableDates: [],
    },
    {
      id: 6,
      title: "Hotel Copacabana Palace",
      rating: "9,8",
      description:
        "The Copacabana Palace Hotel is a luxury hotel located on Avenida Atlântica, in Copacabana, Rio de Janeiro. It was inaugurated in 1923 and is considered the most famous hotel in Brazil. It is located in front of the beach, between the streets of Constante Ramos and Santa Clara.",
      ammenities: [
        "Free Wi-Fi",
        "Air conditioning",
        "Pool",
        "Beachfront",
        "Spa",
        "24h room service",
      ],
      defaultPrice: 600,
      location: "London",
      image: img6,
      unavailableDates: [],
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
