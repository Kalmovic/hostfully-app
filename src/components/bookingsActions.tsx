import {
  DialogClose,
  DialogDescription,
  DialogTitle,
  Flex,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import { BookingWizard } from "../wizards/bookingWizard";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Dialog } from "./dialog";
import styled from "styled-components";
import { Button } from "./button";
import { toast } from "react-toastify";
import { useBookingStore } from "../providers/bookingsProvider";
import { useHotelStore } from "../providers/hotelsProvider";

export const CancelBookingDialog = ({
  bookingId,
  hotelTitle,
  startDate,
  endDate,
}: {
  bookingId: number;
  hotelTitle: string;
  startDate: string;
  endDate: string;
}) => {
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  const updateHotelAvailableDates = useHotelStore(
    (state) => state.updateHotelAvailableDates
  );

  return (
    <Dialog
      trigger={
        <IconButton variant="soft" color="crimson">
          <Tooltip content="Cancel booking">
            <TrashIcon />
          </Tooltip>
        </IconButton>
      }
      children={
        <>
          <DialogTitle>Cancelling booking for {hotelTitle}</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This will make the
            booked dates available again and you'll receive the refund next
            week.
          </DialogDescription>
          <StyledButtonsGrid>
            <DialogClose>
              <Button variant="secondary">No</Button>
            </DialogClose>
            <DialogClose>
              <Button
                variant="danger"
                onClick={() => {
                  deleteBooking(bookingId);
                  updateHotelAvailableDates({
                    id: hotelTitle, // name
                    bookedRangeDates: [startDate, endDate],
                    action: "makeRangeAvailable",
                  });
                  toast.success("Booking cancelled successfully!");
                }}
              >
                Yes, cancel booking
              </Button>
            </DialogClose>
          </StyledButtonsGrid>
        </>
      }
    />
  );
};

export const EditBookigDialog = ({
  bookingId,
  hotelTitle,
  startDate,
  endDate,
  totalPrice,
  numberOfAdults,
  numberOfChildren,
  numberOfRooms,
}: {
  bookingId: number;
  hotelTitle: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
}) => (
  <Dialog
    children={
      <BookingWizard
        mode="edit"
        bookingId={bookingId}
        hotelTitle={hotelTitle}
        hotelDefaultPrice={100}
        defaultBookingInfo={{
          startDate,
          endDate,
          totalPrice,
          numberOfAdults,
          numberOfChildren,
          numberOfRooms,
        }}
      />
    }
    trigger={
      <IconButton variant="soft" color="indigo">
        <Tooltip content="Edit booking">
          <Pencil1Icon />
        </Tooltip>
      </IconButton>
    }
  />
);

export const ActionsButtons = ({
  actions,
  bookingId,
  hotelTitle,
  startDate,
  endDate,
  totalPrice,
  numberOfAdults,
  numberOfChildren,
  numberOfRooms,
  status,
}: {
  actions: ["edit", "cancel"];
  bookingId: number;
  hotelTitle: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
  status: string;
}) => (
  <StyledActionsWrapper gap="3">
    {actions.map((action) =>
      status === "Cancelled" ? null : action === "edit" ? (
        <EditBookigDialog
          bookingId={bookingId}
          hotelTitle={hotelTitle}
          startDate={startDate}
          endDate={endDate}
          totalPrice={totalPrice}
          numberOfAdults={numberOfAdults}
          numberOfChildren={numberOfChildren}
          numberOfRooms={numberOfRooms}
        />
      ) : (
        <CancelBookingDialog
          bookingId={bookingId}
          hotelTitle={hotelTitle}
          startDate={startDate}
          endDate={endDate}
        />
      )
    )}
  </StyledActionsWrapper>
);

const StyledActionsWrapper = styled(Flex)({
  flexDirection: "row",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const StyledButtonsGrid = styled("div")({
  marginTop: "2rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});
