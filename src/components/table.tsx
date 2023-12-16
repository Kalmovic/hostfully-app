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

type TableProps = {
  actions: ["edit", "delete"];
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

const StyledTableHeader = styled(TableHeader)(({ theme }) => ({}));

const StyledColumnHeaderCell = styled(TableColumnHeaderCell)(({ theme }) => ({
  // color: theme.colors.primary,
  fontWeight: 500,
  border: "none",
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  border: "none",
}));

export function Table(props: TableProps) {
  return (
    <StyledTable variant="ghost">
      <StyledTableHeader>
        <TableRow>
          {props.headers.map((header) => (
            <StyledColumnHeaderCell>{header}</StyledColumnHeaderCell>
          ))}
        </TableRow>
      </StyledTableHeader>
      <TableBody>
        {props.rows.map((row, i) => (
          <StyledRow key={row[i]}>
            {row.map((cell) => (
              <TableCell key={cell}>{cell}</TableCell>
            ))}
            <TableCell>
              <Badge color="green">Active</Badge>
            </TableCell>
            <TableCell>
              <Flex direction="row" gap="3">
                {props.actions.map((action) =>
                  action === "edit" ? (
                    <Tooltip content="Edit booking">
                      <IconButton variant="soft" color="indigo">
                        <Pencil1Icon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip content="Cancel booking">
                      <IconButton variant="soft" color="crimson">
                        <TrashIcon />
                      </IconButton>
                    </Tooltip>
                  )
                )}
              </Flex>
            </TableCell>
          </StyledRow>
        ))}
      </TableBody>
    </StyledTable>
  );
}
