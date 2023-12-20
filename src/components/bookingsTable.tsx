import {
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableCell,
  TableBody,
  Flex,
  Badge,
  Separator,
  Text,
} from "@radix-ui/themes";
import styled from "styled-components";
import { theme } from "../providers/theme";
import { Baby, BedDouble, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { RowsType } from "../sections/manageBookings";

type TableProps = {
  actions: ["edit", "cancel"];
  headers: string[];
  rows: RowsType[];
  bookingsIds: number[];
};

export function BookingsTable(props: TableProps) {
  return (
    <StyledTable variant="ghost">
      <TableHeader>
        <TableRow>
          {props.headers.map((header) => (
            <StyledColumnHeaderCell key={header}>
              {header}
            </StyledColumnHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.rows.map((row, i) => {
          return (
            <StyledRow key={row[i].rowKey}>
              {row.map((cell) => {
                return cell.rowKey === "status" ? (
                  <StyledTableCell
                    key={cell.rowKey}
                    aria-label={`row-${cell.rowKey}`}
                  >
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
                        {cell.content}
                      </Badge>
                    </Flex>
                  </StyledTableCell>
                ) : cell.rowKey === "bookingDetails" ? (
                  <StyledTableCell aria-label={`row-${cell.rowKey}`}>
                    <StyledBookingDetails gap="2">
                      <Flex gap="1" align="center">
                        <Users size="15px" color={theme.colors.black} />
                        <Text size="2" aria-label="adults-number">
                          {cell.content["adults"]}
                        </Text>
                      </Flex>
                      <Separator
                        orientation="vertical"
                        style={{
                          backgroundColor: theme.colors.black,
                        }}
                      />
                      <Flex gap="1" align="center">
                        <BedDouble size="15px" color={theme.colors.black} />
                        <Text size="2" aria-label="rooms-number">
                          {cell.content["rooms"]}{" "}
                        </Text>
                      </Flex>
                      <Separator
                        orientation="vertical"
                        style={{
                          backgroundColor: theme.colors.black,
                        }}
                      />
                      <Flex gap="1" align="center">
                        <Baby size="15px" color={theme.colors.black} />
                        <Text size="2" aria-label="children-number">
                          {cell.content["children"]}
                        </Text>
                      </Flex>
                    </StyledBookingDetails>
                  </StyledTableCell>
                ) : cell.rowKey === "period" ? (
                  <StyledTableCell
                    key={cell.rowKey}
                    aria-label={`row-${cell.rowKey}`}
                  >
                    <StyledPeriodText gap="2">
                      <Text size="2">
                        {format(
                          parseISO(cell.content["startDate"]),
                          "MM/dd/yy"
                        )}
                      </Text>
                      <Text size="2">to </Text>
                      <Text size="2">
                        {format(parseISO(cell.content["endDate"]), "MM/dd/yy")}
                      </Text>
                    </StyledPeriodText>
                  </StyledTableCell>
                ) : cell.rowKey === "actions" ? (
                  <StyledTableCell aria-label={`row-${cell.rowKey}`}>
                    {cell.content}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell aria-label={`row-${cell.rowKey}`}>
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
            </StyledRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
}

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

const StyledTableCell = styled(TableCell)({
  padding: "0.785rem 0.785rem",
  "@media (max-width: 768px)": {
    padding: "0.785rem 0.4rem",
  },
});
