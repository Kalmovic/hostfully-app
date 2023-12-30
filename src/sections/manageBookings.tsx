import { BookingsTable } from "../components/bookingsTable";
import styled from "styled-components";
import { Box, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { useBookingStore } from "../providers/bookingsProvider";
import { Info } from "lucide-react";
import { ActionsButtons } from "../components/bookingsActions";
import { unformatFromDollar } from "../utils/formatCurrency";
import { CardStackIcon, TableIcon } from "@radix-ui/react-icons";
import React from "react";
import { Card } from "../components/card";

const EmptyBookings = () => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    gap="5"
    style={{
      height: "100%",
      padding: 16,
      borderRadius: 8,
      width: "fit-content",
      alignSelf: "center",
      marginTop: 64,
    }}
  >
    <Info size={64} />
    <Text
      as="span"
      size="4"
      align="center"
      style={{
        marginBottom: 16,
        gap: 16,
      }}
    >
      You have no bookings yet.
      <br />
      <br />
      You can book a hotel from the Explore tab.
    </Text>
  </Flex>
);

type RowKind =
  | {
      rowKey: "id";
      content: number;
    }
  | {
      rowKey: "title";
      content: string;
    }
  | {
      rowKey: "period";
      content: {
        startDate: string;
        endDate: string;
      };
    }
  | {
      rowKey: "bookingDetails";
      content: {
        adults: number;
        children: number;
        rooms: number;
      };
    }
  | {
      rowKey: "price";
      content: string;
    }
  | {
      rowKey: "status";
      content: string;
    }
  | {
      rowKey: "actions";
      content: React.ReactNode;
    };

export type RowsType = RowKind[];

export function ManageBookings() {
  const bookings = useBookingStore((state) => state.bookings);
  const bookingsIds = bookings.map((booking) => booking.id);
  const rows: RowsType[] = bookings.map((booking) => [
    {
      rowKey: "title",
      content: booking.title,
    },
    {
      rowKey: "period",
      content: {
        startDate: booking.startDate,
        endDate: booking.endDate,
      },
    },
    {
      rowKey: "bookingDetails",
      content: {
        adults: booking.numberOfAdults,
        children: booking.numberOfChildren,
        rooms: booking.numberOfRooms,
      },
    },
    {
      rowKey: "price",
      content: booking.price,
    },
    {
      rowKey: "status",
      content: booking.status,
    },
    {
      rowKey: "actions",
      content: (
        <ActionsButtons
          key={booking.id}
          mode="table"
          actions={["edit", "cancel"]}
          bookingId={booking.id}
        />
      ),
    },
  ]);

  return (
    <Wrapper>
      {bookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <>
          <Text
            as="span"
            size="6"
            style={{
              marginBottom: 16,
            }}
          >
            Manage your bookings
          </Text>
          <Flex gap="4">
            <Box
              width="100%"
              display={{
                initial: "none",
                sm: "block",
              }}
            >
              <BookingsTable
                actions={["edit", "cancel"]}
                headers={[
                  "Hotel Name",
                  "Period",
                  "Details",
                  "Price",
                  "Status",
                  "Actions",
                ]}
                rows={rows}
                bookingsIds={bookingsIds}
              />
            </Box>
            <Box
              width="100%"
              display={{
                initial: "block",
                sm: "none",
              }}
            >
              <MultipleViewsBookings rows={rows} bookingsIds={bookingsIds} />
            </Box>
          </Flex>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const BookingCardList = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  gap: 2,
});

const StyledIconButton = styled(IconButton)({
  alignSelf: "start",
  marginBottom: "1rem",
  "@media (min-width: 768px)": {
    display: "none",
  },
});

const MultipleViewsBookings = ({
  rows,
  bookingsIds,
}: {
  rows: RowsType[];
  bookingsIds: number[];
}) => {
  const isMobile = window.innerWidth <= 767;
  const bookings = useBookingStore((state) => state.bookings);
  const [renderMode, setRenderMode] = React.useState<"table" | "cards">(
    isMobile ? "cards" : "table"
  );
  return (
    <>
      <Tooltip
        content={`Change to ${renderMode === "table" ? "cards" : "table"}`}
      >
        <StyledIconButton
          variant="soft"
          color="indigo"
          aria-label="change-view-mode"
          onClick={() =>
            renderMode === "table"
              ? setRenderMode("cards")
              : setRenderMode("table")
          }
        >
          {renderMode === "table" ? <TableIcon /> : <CardStackIcon />}
        </StyledIconButton>
      </Tooltip>
      {renderMode === "table" ? (
        <BookingsTable
          actions={["edit", "cancel"]}
          headers={[
            "Hotel Name",
            "Period",
            "Details",
            "Price",
            "Status",
            "Actions",
          ]}
          rows={rows}
          bookingsIds={bookingsIds}
        />
      ) : (
        <BookingCardList>
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              mode="manage"
              hotelName={booking.title}
              bookPrice={unformatFromDollar(booking.price)}
              bookStatus={booking.status}
              startDate={booking.startDate}
              hotelDescription={booking.description}
              endDate={booking.endDate}
              numberOfAdults={booking.numberOfAdults}
              numberOfChildren={booking.numberOfChildren}
              numberOfRooms={booking.numberOfRooms}
              img={booking.image}
              actionButtons={[
                <ActionsButtons
                  key={booking.id}
                  mode="cards"
                  actions={["edit", "cancel"]}
                  bookingId={booking.id}
                />,
              ]}
            />
          ))}
        </BookingCardList>
      )}
    </>
  );
};
