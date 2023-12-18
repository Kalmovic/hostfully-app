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
} from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { useBookingStore } from "../providers/bookingsProvider";
import { useHotelStore } from "../providers/hotelsProvider";

type TableProps = {
  actions: ["edit", "cancel"];
  headers: string[];
  rows: string[][];
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
  border: "none",
});

const StyledRow = styled(TableRow)({
  border: "none",
});

export function Table(props: TableProps) {
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  const updateHotelAvailableDates = useHotelStore(
    (state) => state.updateHotelAvailableDates
  );

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
          const dates = row[2].split(" - ");
          return (
            <StyledRow key={row[i]}>
              {row.map((cell) =>
                cell === "Active" || cell === "Cancelled" ? (
                  <TableCell>
                    <Badge color={cell === "Active" ? "green" : "red"}>
                      {cell}
                    </Badge>
                  </TableCell>
                ) : (
                  <TableCell key={cell}>{cell}</TableCell>
                )
              )}
              <TableCell
              // style={{ // TODO: improve this
              //   minWidth: 95,
              // }}
              >
                <Flex direction="row" gap="3">
                  {props.actions.map((action) =>
                    row[4] === "Cancelled" ? null : action === "edit" ? (
                      <Tooltip content="Edit booking">
                        <IconButton variant="soft" color="indigo">
                          <Pencil1Icon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip content="Cancel booking">
                        <IconButton
                          variant="soft"
                          color="crimson"
                          onClick={() => {
                            deleteBooking(row[0]); // TODO: fix this
                            updateHotelAvailableDates({
                              id: row[1], // name
                              bookedRangeDates: dates,
                              action: "makeRangeAvailable",
                            });
                          }}
                        >
                          <TrashIcon />
                        </IconButton>
                      </Tooltip>
                    )
                  )}
                </Flex>
              </TableCell>
            </StyledRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
}
