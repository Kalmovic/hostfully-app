import { Table } from "../components/table";
import styled from "styled-components";
import { Flex, Text } from "@radix-ui/themes";
import { useBookingStore } from "../providers/bookingsProvider";

const Wrapper = styled.section({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

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
      <Text
        as="span"
        size="8"
        style={{
          marginBottom: 16,
        }}
      >
        Bookings
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
    </Wrapper>
  );
}
