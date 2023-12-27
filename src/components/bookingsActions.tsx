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
  mode = "cards",
  bookingId,
}: {
  mode?: "table" | "cards";
  bookingId: number;
}) => {
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  const updateHotelAvailableDates = useHotelStore(
    (state) => state.updateHotelAvailableDates
  );
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const booking = bookingsById[bookingId];
  return (
    <Dialog
      trigger={
        mode === "table" ? (
          <IconButton variant="soft" color="crimson">
            <Tooltip content="Cancel booking">
              <TrashIcon />
            </Tooltip>
          </IconButton>
        ) : (
          <Button variant="danger">Cancellation</Button>
        )
      }
      children={
        <Flex direction="column" gap="4" p="2">
          <DialogTitle>Cancelling booking for {booking.title}</DialogTitle>
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
                    id: booking.title,
                    bookedRangeDates: [booking.startDate, booking.endDate],
                    action: "makeRangeAvailable",
                  });
                  toast.success("Booking cancelled successfully!");
                }}
              >
                Yes, cancel booking
              </Button>
            </DialogClose>
          </StyledButtonsGrid>
        </Flex>
      }
    />
  );
};

export const EditBookigDialog = ({
  mode = "cards",
  bookingId,
}: {
  mode?: "table" | "cards";
  bookingId: number;
}) => {
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const updateHotelAvailableDates = useHotelStore(
    (state) => state.updateHotelAvailableDates
  );
  const booking = bookingsById[bookingId];
  return (
    <Dialog
      onLeaveDialog={() => {
        updateHotelAvailableDates({
          id: booking.title,
          bookedRangeDates: [booking.startDate, booking.endDate],
          action: "makeRangeUnvailable",
        });
      }}
      children={
        <BookingWizard
          mode="edit"
          bookingId={bookingId}
          hotelTitle={booking.title}
          hotelDefaultPrice={booking.defaultPrice}
          defaultBookingInfo={{
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice,
            numberOfAdults: booking.numberOfAdults,
            numberOfChildren: booking.numberOfChildren,
            numberOfRooms: booking.numberOfRooms,
            firstName: booking.firstName,
            lastName: booking.lastName,
            email: booking.email,
            creditCardNumber: booking.creditCardNumber,
          }}
        />
      }
      trigger={
        mode === "table" ? (
          <IconButton variant="soft" color="indigo">
            <Tooltip content="Edit booking">
              <Pencil1Icon />
            </Tooltip>
          </IconButton>
        ) : (
          <Button variant="secondary">Edit</Button>
        )
      }
    />
  );
};

export const ActionsButtons = ({
  mode = "cards",
  actions,
  bookingId,
}: {
  mode?: "table" | "cards";
  actions: ["edit", "cancel"];
  bookingId: number;
}) => {
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const booking = bookingsById[bookingId];

  return mode === "table" ? (
    <StyledActionsWrapper gap="3">
      {actions.map((action) =>
        booking.status === "Cancelled" ? null : action === "edit" ? (
          <EditBookigDialog mode={mode} bookingId={bookingId} />
        ) : (
          <CancelBookingDialog mode={mode} bookingId={bookingId} />
        )
      )}
    </StyledActionsWrapper>
  ) : (
    <StyledButtonsGrid aria-label="card-actions-buttons">
      {actions.map((action) =>
        booking.status === "Cancelled" ? null : action === "edit" ? (
          <EditBookigDialog mode={mode} bookingId={bookingId} />
        ) : (
          <CancelBookingDialog mode={mode} bookingId={bookingId} />
        )
      )}
    </StyledButtonsGrid>
  );
};

const StyledActionsWrapper = styled(Flex)({
  flexDirection: "row",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const StyledButtonsGrid = styled("div")({
  display: "grid",
  marginTop: "0.4rem",
  justifyContent: "flex-end",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0.5rem",
  width: "100%",
});
