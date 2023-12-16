import { Table } from "../components/table";
import styled from "styled-components";
import { Flex, Text } from "@radix-ui/themes";
import { Calendar } from "../components/calendar";
import { BookCalendar } from "../components/range-calendar";

const Wrapper = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export function ManageListings(props) {
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
          actions={["edit", "delete"]}
          headers={["Name", "Description", "Price", "Status", "Actions"]}
          rows={[
            ["Hotel 1", "Hotel 1 description", "100"],
            ["Hotel 2", "Hotel 2 description", "200"],
            ["Hotel 3", "Hotel 3 description", "300"],
          ]}
        />
        <Calendar />
      </Flex>
      <BookCalendar />
    </Wrapper>
  );
}
