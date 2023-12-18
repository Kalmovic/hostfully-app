import { Table } from "../components/table";
import styled from "styled-components";
import { Flex, Text } from "@radix-ui/themes";
import { useBookingStore } from "../providers/bookingsProvider";

const Wrapper = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export function ManageListings(props) {
  const bookings = useBookingStore((state) => state.bookings);

  const rows = bookings.map((booking) => [
    booking.id,
    booking.title,
    `${booking.startDate} - ${booking.endDate}`,
    booking.price,
    booking.status,
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
          headers={["id", "Name", "Period", "Price", "Status", "Actions"]}
          rows={rows}
        />
      </Flex>
    </Wrapper>
  );
}
