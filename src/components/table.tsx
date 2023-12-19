import {
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableCell,
  TableBody,
  Flex,
  Badge,
  IconButton,
  Tooltip,
  Separator,
  Text,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { useBookingStore } from "../providers/bookingsProvider";
import { useHotelStore } from "../providers/hotelsProvider";
import { BookingWizard } from "../wizards/bookingWizard";
import { Dialog } from "./dialog";
import { theme } from "../providers/theme";
import { Baby, BedDouble, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "./button";
import { toast } from "react-toastify";

type TableProps = {
  actions: ["edit", "cancel"];
  headers: string[];
  rows: (
    | { rowKey: string; content: number }
    | { rowKey: string; content: string }
    | { rowKey: string; content: { title: string; value: string }[] }
    | { rowKey: string; content: { title: string; value: number }[] }
  )[][];
};

const StyledTable = styled(TableRoot)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: 8,
  overflow: "hidden",
  marginBottom: 16,
  width: "100%",
  backgroundColor: theme.colors.white,
}));

const StyledColumnHeaderCell = styled(TableColumnHeaderCell)({
  fontWeight: 500,
  padding: "0.785rem 0.785rem",
  "@media (max-width: 768px)": {
    padding: "0.785rem 0.4rem",
  },
});

const StyledRow = styled(TableRow)({
  border: "none",
});

const StyledPeriodText = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  border: "1px solid black",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
  width: "fit-content",
  alignItems: "center",
  "@media (max-width: 768px)": {
    border: "none",
    gap: "1px",
    padding: "0.25rem 0.25rem",
    flexDirection: "column",
  },
}));

const StyledBookingDetails = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  border: "1px solid black",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
  width: "fit-content",
  alignItems: "center",
  "@media (max-width: 768px)": {
    border: "none",
    gap: "1px",
    padding: "0.25rem 0.25rem",
    flexDirection: "column",
    "[role='separator']": {
      display: "none",
    },
  },
}));

const StyledActionsWrapper = styled(Flex)({
  flexDirection: "row",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
});

const StyledTableCell = styled(TableCell)({
  padding: "0.785rem 0.785rem",
  "@media (max-width: 768px)": {
    padding: "0.785rem 0.4rem",
  },
});

const StyledButtonsGrid = styled("div")({
  marginTop: "2rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const CancelBookingDialog = ({
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

export function Table(props: TableProps) {
  return (
    <StyledTable variant="ghost">
      <TableHeader>
        <TableRow>
          {props.headers.map((header) => (
            <StyledColumnHeaderCell>{header}</StyledColumnHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.rows.map((row, i) => {
          const bookingId = (row[0].rowKey === "id" &&
            row[0].content) as number;
          const hotelTitle = (row[1].rowKey === "title" &&
            row[1].content) as string;
          const totalPrice = (row[4].rowKey === "price" &&
            row[4].content) as number;
          const startDate = (row[2].rowKey === "period" &&
            row[2].content.map((date) => date.value)[0]) as string;
          const endDate = (row[2].rowKey === "period" &&
            row[2].content.map((date) => date.value)[1]) as string;
          const numberOfAdults = (row[3].rowKey === "bookingDetails" &&
            row[3].content.map((detail) => detail.value)[0]) as number;
          const numberOfChildren = (row[3].rowKey === "bookingDetails" &&
            row[3].content.map((detail) => detail.value)[1]) as number;
          const numberOfRooms = (row[3].rowKey === "bookingDetails" &&
            row[3].content.map((detail) => detail.value)[2]) as number;
          const status = (row[5].rowKey === "status" &&
            row[5].content) as string;
          return (
            <StyledRow key={row[i].rowKey}>
              {row.map((cell) => {
                return cell.rowKey === "status" ? (
                  <StyledTableCell style={{}}>
                    <Flex
                      gap="2"
                      align="center"
                      style={{
                        padding: "0.25rem 0",
                      }}
                    >
                      <Badge
                        color={cell.content === "Active" ? "green" : "red"}
                      >
                        {status}
                      </Badge>
                    </Flex>
                  </StyledTableCell>
                ) : cell.rowKey === "bookingDetails" ? (
                  <StyledTableCell>
                    <StyledBookingDetails gap="2">
                      <Flex gap="1" align="center">
                        <Users size="15px" color={theme.colors.black} />
                        <Text size="2">{numberOfAdults}</Text>
                      </Flex>
                      <Separator
                        orientation="vertical"
                        style={{
                          backgroundColor: theme.colors.black,
                        }}
                      />
                      <Flex gap="1" align="center">
                        <BedDouble size="15px" color={theme.colors.black} />
                        <Text size="2">{numberOfRooms} </Text>
                      </Flex>
                      <Separator
                        orientation="vertical"
                        style={{
                          backgroundColor: theme.colors.black,
                        }}
                      />
                      <Flex gap="1" align="center">
                        <Baby size="15px" color={theme.colors.black} />
                        <Text size="2">{numberOfChildren} </Text>
                      </Flex>
                    </StyledBookingDetails>
                  </StyledTableCell>
                ) : cell.rowKey === "period" ? (
                  <StyledTableCell key={cell.rowKey}>
                    <StyledPeriodText gap="2">
                      <Text size="2">
                        {format(parseISO(startDate), "MM/dd/yy")}
                      </Text>
                      <Text size="2">to </Text>
                      <Text size="2">
                        {format(parseISO(endDate), "MM/dd/yy")}
                      </Text>
                    </StyledPeriodText>
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>
                    <Flex
                      gap="2"
                      align="center"
                      style={{
                        padding: "0.25rem 0rem",
                      }}
                    >
                      {cell.content}
                    </Flex>
                  </StyledTableCell>
                );
              })}
              <StyledTableCell>
                <StyledActionsWrapper gap="3">
                  {props.actions.map((action) =>
                    status === "Cancelled" ? null : action === "edit" ? (
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
              </StyledTableCell>
            </StyledRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
}
