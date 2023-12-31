import React from "react";
import { DateSelection } from "./dateSelection";
import { ReviewBooking } from "./reviewBooking";
import { useHotelStore } from "../providers/hotelsProvider";
import { useBookingStore } from "../providers/bookingsProvider";
import { formatToDollar } from "../utils/formatCurrency";
import { DialogClose, Flex, Text } from "@radix-ui/themes";
import { Button } from "../components/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { userCalendarProvider } from "../providers/userCalendarProvider";

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

  const hotels = useHotelStore((state) => state.hotels);

  const hotel = hotels.find((hotel) => hotel.title === hotelTitle)!;

  const userUnavailableDates = userCalendarProvider(
    (state) => state.unavailableDates
  );
  const updateCalendar = userCalendarProvider((state) => state.updateCalendar);

  const unavailableDates =
    props.mode === "edit"
      ? userUnavailableDates.filter(
          (date) => date[0] !== props.defaultBookingInfo.startDate
        )
      : userUnavailableDates;

  const onDateSelectionSubmit = (data: ReviewBookingData["data"]) => {
    setWizardState({
      kind: BookingSteps.REVIEW_BOOKING,
      data,
    });
  };

  const onReviewBookingSubmit = (bookingInfo: ReviewBookingData["data"]) => {
    if (props.mode === "edit") {
      if (
        props.defaultBookingInfo.startDate !== bookingInfo.startDate ||
        props.defaultBookingInfo.endDate !== bookingInfo.endDate
      ) {
        updateCalendar({
          bookedRangeDates: [
            props.defaultBookingInfo.startDate,
            props.defaultBookingInfo.endDate,
          ],
          action: "makeAvailable",
        });
        updateCalendar({
          bookedRangeDates: [bookingInfo.startDate, bookingInfo.endDate],
          action: "makeUnavailable",
        });
      }
      updateBooking(props.bookingId, {
        description: hotel.description,
        id: props.bookingId,
        image: hotel.image,
        location: hotel.location,
        price: formatToDollar.format(bookingInfo.totalPrice),
        defaultPrice: hotelDefaultPrice,
        title: hotel.title,
        status: "Active",
        ...bookingInfo,
      });
      toast.success("Booking updated successfully!", {
        description: (
          <Flex direction={"column"}>
            <Text>
              <strong>{hotel.title}</strong>
              <span>
                {" "}
                from {format(
                  new Date(bookingInfo.startDate),
                  "MM/dd/YYY"
                )} to {format(new Date(bookingInfo.endDate), "MM/dd/YYY")}
              </span>
            </Text>
            {props.defaultBookingInfo.numberOfAdults !==
              bookingInfo.numberOfAdults && (
              <Text>
                <strong>Adults:</strong>{" "}
                {props.defaultBookingInfo.numberOfAdults} →{" "}
                {bookingInfo.numberOfAdults}
              </Text>
            )}
            {props.defaultBookingInfo.numberOfChildren !==
              bookingInfo.numberOfChildren && (
              <Text>
                <strong>Children:</strong>{" "}
                {props.defaultBookingInfo.numberOfChildren} →{" "}
                {bookingInfo.numberOfChildren}
              </Text>
            )}
            {props.defaultBookingInfo.numberOfRooms !==
              bookingInfo.numberOfRooms && (
              <Text>
                <strong>Rooms:</strong> {props.defaultBookingInfo.numberOfRooms}{" "}
                → {bookingInfo.numberOfRooms}
              </Text>
            )}
          </Flex>
        ),
      });
    } else {
      updateCalendar({
        bookedRangeDates: [bookingInfo.startDate, bookingInfo.endDate],
        action: "makeUnavailable",
      });
      addBooking({
        description: hotel.description,
        id: hotel.id,
        image: hotel.image,
        location: hotel.location,
        price: formatToDollar.format(bookingInfo.totalPrice),
        defaultPrice: hotelDefaultPrice,
        title: hotel.title,
        status: "Active",
        ...bookingInfo,
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
              unavailableDates={unavailableDates}
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
