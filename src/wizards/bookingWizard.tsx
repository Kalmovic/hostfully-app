import React, { useEffect } from "react";
import { DateSelection } from "./dateSelection";
import { ReviewBooking } from "./reviewBooking";
import { UserInfo } from "./userInfo";
import { useHotelStore } from "../providers/hotelsProvider";
import { useBookingStore } from "../providers/bookingsProvider";
import { formatToDollar } from "../utils/formatCurrency";
import { DialogClose } from "@radix-ui/themes";
import { Button } from "../components/button";

enum BookingSteps {
  DATE_SELECTION = "DATE_SELECTION",
  USER_INFO = "USER_INFO",
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

type UserInfoData = {
  kind: BookingSteps.USER_INFO;
  data: {
    startDate: string;
    endDate: string;
    totalPrice: number;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfRooms: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    creditCardNumber?: string;
  };
};

type ReviewBookingData = {
  kind: BookingSteps.REVIEW_BOOKING;
  data: {
    startDate: string;
    endDate: string;
    totalPrice: number;
    firstName: string;
    lastName: string;
    email: string;
    creditCardNumber: string;
    numberOfChildren: number;
    numberOfAdults: number;
    numberOfRooms: number;
  };
};

type WizardState = DateSelectionData | UserInfoData | ReviewBookingData;

const Wrapper = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "300px",
        margin: "auto",
        // border: "1px solid black",
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
      bookingId: string;
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

  const hotel = hotels.find((hotel) => hotel.title === hotelTitle);

  useEffect(() => {
    if (props.mode === "edit") {
      updateHotelAvailableDates({
        id: hotel.title,
        bookedRangeDates: [
          props.defaultBookingInfo.startDate,
          props.defaultBookingInfo.endDate,
        ],
        action: "makeRangeAvailable",
      });
    }
  }, [props.mode, hotel.title]);

  useEffect(() => {
    return () => {
      resetWizardState();
    };
  }, []);

  const onUpdateCancel = () => {
    if (props.mode === "create") return;
    updateHotelAvailableDates({
      id: hotel.title,
      bookedRangeDates: [
        props.defaultBookingInfo.startDate,
        props.defaultBookingInfo.endDate,
      ],
      action: "makeRangeUnvailable",
    });
  };

  const changeWizardState = (kind, data) => {
    setWizardState({
      kind,
      data: {
        ...wizardState.data,
        ...data,
      },
    });
  };

  const resetWizardState = () => {
    setWizardState({
      kind: BookingSteps.DATE_SELECTION,
      data: {},
    });
  };

  const onDateSelectionSubmit = (dateInfo: DateSelectionData["data"]) => {
    changeWizardState(BookingSteps.USER_INFO, dateInfo);
  };

  const onUserInfoFormSubmit = (userInfo: UserInfoData["data"]) => {
    changeWizardState(BookingSteps.REVIEW_BOOKING, userInfo);
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
        title: hotel.title,
        status: "Active",
      });
    } else {
      addBooking({
        description: hotel.description,
        id: hotel.id,
        image: hotel.image,
        location: hotel.location,
        price: formatToDollar.format(bookingInfo.totalPrice),
        title: hotel.title,
        ...bookingInfo,
        status: "Active",
      });
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
              cancelButton={
                <DialogClose
                  onClick={() =>
                    props.mode === "edit" ? onUpdateCancel() : null
                  }
                >
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              }
              onSubmit={onDateSelectionSubmit}
              unavailableDates={hotel.unavailableDates}
              defaultPrice={hotelDefaultPrice}
            />
          ) : (
            <DateSelection
              mode={props.mode}
              data={wizardState.data}
              cancelButton={
                <DialogClose>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              }
              onSubmit={onDateSelectionSubmit}
              unavailableDates={hotel.unavailableDates}
              defaultPrice={hotelDefaultPrice}
            />
          )}
        </Wrapper>
      );
    case BookingSteps.USER_INFO:
      return (
        <Wrapper>
          <UserInfo
            data={wizardState.data}
            cancelButton={
              <DialogClose
                onClick={() =>
                  props.mode === "edit" ? onUpdateCancel() : null
                }
              >
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            }
            onSubmit={onUserInfoFormSubmit}
          />
        </Wrapper>
      );
    case BookingSteps.REVIEW_BOOKING:
      return (
        <Wrapper>
          <ReviewBooking
            data={wizardState.data}
            cancelButton={
              <DialogClose
                onClick={() =>
                  props.mode === "edit" ? onUpdateCancel() : null
                }
              >
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
            }
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
