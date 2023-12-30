import React from "react";
import { DateSelection } from "./dateSelection";
import { ReviewBooking } from "./reviewBooking";
import { useHotelStore } from "../providers/hotelsProvider";
import { useBookingStore } from "../providers/bookingsProvider";
import { formatToDollar } from "../utils/formatCurrency";
import { DialogClose } from "@radix-ui/themes";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum BookingSteps {
  DATE_SELECTION = "DATE_SELECTION",
  ROOM_DETAILS = "ROOM_DETAILS",
  REVIEW_BOOKING = "REVIEW_BOOKING",
}

type DateSelectionData = {
  kind: BookingSteps.DATE_SELECTION;
  data: {
    startDate?: string;
    endDate?: string;
    totalPrice?: number;
    numberOfAdults?: number;
    numberOfChildren?: number;
    numberOfRooms?: number;
  };
};

type ReviewBookingData = {
  kind: BookingSteps.REVIEW_BOOKING;
  data: {
    startDate: string;
    endDate: string;
    totalPrice: number;
    numberOfChildren: number;
    numberOfAdults: number;
    numberOfRooms: number;
  };
};

type WizardState = DateSelectionData | ReviewBookingData;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        borderRadius: "5px",
        padding: "0.5rem",
      }}
    >
      {children}
    </div>
  );
};

type BookingWizardProps =
  | {
      mode: "create";
      hotelTitle: string;
      hotelDefaultPrice: number;
      defaultBookingInfo?: {
        startDate?: string;
        endDate?: string;
        totalPrice?: number;
        numberOfAdults?: number;
        numberOfChildren?: number;
        numberOfRooms?: number;
      };
    }
  | {
      mode: "edit";
      bookingId: number;
      hotelTitle: string;
      hotelDefaultPrice: number;
      defaultBookingInfo: {
        startDate: string;
        endDate: string;
        totalPrice: number;
        numberOfAdults: number;
        numberOfChildren: number;
        numberOfRooms: number;
      };
    };

const CancelButton = () => (
  <DialogClose>
    <Button variant="secondary" aria-label="cancel-button">
      Cancel
    </Button>
  </DialogClose>
);

export function BookingWizard({
  hotelTitle,
  hotelDefaultPrice,
  ...props
}: BookingWizardProps) {
  const [wizardState, setWizardState] = React.useState<WizardState>({
    kind: BookingSteps.DATE_SELECTION,
    data: props.mode === "edit" ? props.defaultBookingInfo : {},
  });
  const addBooking = useBookingStore((state) => state.addBooking);
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const updateHotelAvailableDates = useHotelStore(
    (state) => state.updateHotelAvailableDates
  );
  const hotels = useHotelStore((state) => state.hotels);

  const hotel = hotels.find((hotel) => hotel.title === hotelTitle)!;

  const unavailableDates =
    props.mode === "edit"
      ? hotel.unavailableDates.filter(
          (date) => date[0] === props.defaultBookingInfo.startDate[0]
        )
      : hotel.unavailableDates;

  const onDateSelectionSubmit = (data: ReviewBookingData["data"]) => {
    setWizardState({
      kind: BookingSteps.REVIEW_BOOKING,
      data,
    });
  };

  const onReviewBookingSubmit = (bookingInfo: ReviewBookingData["data"]) => {
    updateHotelAvailableDates({
      id: hotel.title,
      bookedRangeDates: [bookingInfo.startDate, bookingInfo.endDate],
    });
    if (props.mode === "edit") {
      updateBooking(props.bookingId, {
        ...bookingInfo,
        description: hotel.description,
        id: props.bookingId,
        image: hotel.image,
        location: hotel.location,
        price: formatToDollar.format(bookingInfo.totalPrice),
        defaultPrice: hotelDefaultPrice,
        title: hotel.title,
        status: "Active",
      });
      toast.success("Booking updated successfully!");
    } else {
      addBooking({
        description: hotel.description,
        id: hotel.id,
        image: hotel.image,
        location: hotel.location,
        price: formatToDollar.format(bookingInfo.totalPrice),
        defaultPrice: hotelDefaultPrice,
        title: hotel.title,
        ...bookingInfo,
        status: "Active",
      });
      toast.success("Booking created successfully!");
    }
  };

  switch (wizardState.kind) {
    case BookingSteps.DATE_SELECTION:
      return (
        <Wrapper>
          {props.mode === "edit" ? (
            <DateSelection
              mode={props.mode}
              data={props.defaultBookingInfo}
              cancelButton={<CancelButton />}
              onSubmit={onDateSelectionSubmit}
              unavailableDates={unavailableDates}
              defaultPrice={hotelDefaultPrice}
            />
          ) : (
            <DateSelection
              mode={props.mode}
              data={wizardState.data}
              cancelButton={<CancelButton />}
              onSubmit={(data) =>
                onDateSelectionSubmit({
                  ...wizardState.data,
                  ...data,
                })
              }
              unavailableDates={hotel.unavailableDates}
              defaultPrice={hotelDefaultPrice}
            />
          )}
        </Wrapper>
      );
    case BookingSteps.REVIEW_BOOKING:
      return (
        <Wrapper>
          <ReviewBooking
            data={wizardState.data}
            cancelButton={<CancelButton />}
            onSubmit={() => onReviewBookingSubmit(wizardState.data)}
          />
        </Wrapper>
      );
    // exhaustive check protects us from forgetting to handle a case
    default:
      return (
        <Wrapper>
          <h1>Something went wrong</h1>
        </Wrapper>
      );
  }
}
