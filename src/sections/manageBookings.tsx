import { BookingsTable } from "../components/bookingsTable";
import styled from "styled-components";
import { Flex, Text } from "@radix-ui/themes";
import { useBookingStore } from "../providers/bookingsProvider";
import { Info } from "lucide-react";
import { ActionsButtons } from "../components/bookingsActions";
import { unformatFromDollar } from "../utils/formatCurrency";

const Wrapper = styled.section({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

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
      style={{
        marginBottom: 16,
      }}
    >
      You have no bookings yet.
    </Text>
    <Text
      as="span"
      size="4"
      style={{
        marginBottom: 16,
      }}
    >
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
          actions={["edit", "cancel"]}
          bookingId={booking.id}
          hotelTitle={booking.title}
          startDate={booking.startDate}
          endDate={booking.endDate}
          totalPrice={unformatFromDollar(booking.price)}
          numberOfAdults={booking.numberOfAdults}
          numberOfChildren={booking.numberOfChildren}
          numberOfRooms={booking.numberOfRooms}
          status={booking.status}
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
          </Flex>
        </>
      )}
    </Wrapper>
  );
}
