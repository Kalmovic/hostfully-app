import { Table } from "../components/table";
import styled from "styled-components";
import { Flex, Text } from "@radix-ui/themes";
import { useBookingStore } from "../providers/bookingsProvider";
import { Info } from "lucide-react";

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

export function ManageListings() {
  const bookings = useBookingStore((state) => state.bookings);

  const rows = bookings.map((booking) => [
    {
      rowKey: "id",
      content: booking.id,
    },
    {
      rowKey: "title",
      content: booking.title,
    },
    {
      rowKey: "period",
      content: [
        {
          title: "Start Date",
          value: booking.startDate,
        },
        {
          title: "End Date",
          value: booking.endDate,
        },
      ],
    },
    {
      rowKey: "bookingDetails",
      content: [
        {
          title: "Adults",
          value: booking.numberOfAdults,
        },
        {
          title: "Children",
          value: booking.numberOfChildren,
        },
        {
          title: "Rooms",
          value: booking.numberOfRooms,
        },
      ],
    },
    {
      rowKey: "price",
      content: booking.price,
    },
    {
      rowKey: "status",
      content: booking.status,
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
            size="8"
            style={{
              marginBottom: 16,
            }}
          >
            Manage your bookings
          </Text>
          <Flex gap="4">
            <Table
              actions={["edit", "cancel"]}
              headers={[
                "id",
                "Name",
                "Period",
                "Booking Details",
                "Price",
                "Status",
                "Actions",
              ]}
              rows={rows}
            />
          </Flex>
        </>
      )}
    </Wrapper>
  );
}
