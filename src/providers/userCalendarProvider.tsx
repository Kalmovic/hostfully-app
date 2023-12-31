import { create } from "zustand";

type UserCalendarStore = {
  unavailableDates: string[][];
  updateCalendar: ({
    bookedRangeDates,
    action,
  }: {
    bookedRangeDates: string[];
    action: "makeAvailable" | "makeUnavailable";
  }) => void;
};

const initialState = {
  unavailableDates: [],
};

export const userCalendarProvider = create<UserCalendarStore>((set) => ({
  ...initialState,
  updateCalendar: ({ bookedRangeDates, action }) => {
    set((state) => {
      let updatedUnavailableDates = state.unavailableDates;
      if (action === "makeUnavailable") {
        updatedUnavailableDates.push(bookedRangeDates);
      } else {
        updatedUnavailableDates = updatedUnavailableDates.filter(
          (date) => date[0] !== bookedRangeDates[0]
        );
      }
      return {
        ...state,
        unavailableDates: updatedUnavailableDates,
      };
    });
  },
}));
