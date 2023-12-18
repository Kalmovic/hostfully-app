import { useForm } from "react-hook-form";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Baby, BedDouble, Users } from "lucide-react";
import { Button } from "../components/button";
import { format } from "date-fns";
import { theme } from "../providers/theme";
import styled from "styled-components";
import { formatToDollar } from "../utils/formatCurrency";

type ReviewBookingData = {
  data: {
    startDate: string;
    endDate: string;
    totalPrice: number;
    firstName: string;
    lastName: string;
    email: string;
    creditCardNumber: string;
    numberOfChildren: number;
    numberOfAdults: number;
    numberOfRooms: number;
  };
  onSubmit: () => void;
};

const StyledLineInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.colors.primaryLight,
  padding: "0.1rem 0.1rem 0.1rem 0.5rem",
  borderRadius: "0.5rem",
  gap: "1",
});

export function ReviewBooking({ data, onSubmit }: ReviewBookingData) {
  const { handleSubmit } = useForm<ReviewBookingData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Review your booking</DialogTitle>
      <DialogDescription size="2" mb="4">
        Check the details below and confirm your booking.
      </DialogDescription>

      <Flex direction="column" gap="2">
        <StyledLineInfo>
          <Text size="2">Booking period: </Text>
          <Text
            size="2"
            style={{
              backgroundColor: theme.colors.surface,
              border: "1px solid black",
              borderRadius: "0.5rem",
              padding: "0.25rem 0.5rem",
            }}
          >
            {format(new Date(data.startDate), "MM/dd/yyyy")} to{" "}
            {format(new Date(data.endDate), "MM/dd/yyyy")}
          </Text>
        </StyledLineInfo>
        <StyledLineInfo>
          <Text size="2">Room details: </Text>
          <Flex
            gap="2"
            align="center"
            style={{
              backgroundColor: theme.colors.surface,
              border: "1px solid black",
              borderRadius: "0.5rem",
              padding: "0.25rem 0.5rem",
            }}
          >
            {/* {data.numberOfAdults} adults, {data.numberOfChildren} children */}
            <Flex gap="1" align="center">
              <BedDouble size="15px" color={theme.colors.black} />
              <Text size="2">{data.numberOfRooms} </Text>
            </Flex>
            <Separator
              orientation="vertical"
              style={{
                backgroundColor: theme.colors.black,
              }}
            />
            <Flex gap="1" align="center">
              <Users size="15px" color={theme.colors.black} />
              <Text size="2">{data.numberOfAdults} </Text>
            </Flex>
            <Separator
              orientation="vertical"
              style={{
                backgroundColor: theme.colors.black,
              }}
            />
            <Flex gap="1" align="center">
              <Baby size="15px" color={theme.colors.black} />
              <Text size="2">{data.numberOfAdults} </Text>
            </Flex>
          </Flex>
        </StyledLineInfo>
        <StyledLineInfo>
          <Text size="2">Total price: </Text>
          <Text
            size="2"
            style={{
              backgroundColor: theme.colors.surface,
              border: "1px solid black",
              borderRadius: "0.5rem",
              padding: "0.25rem 0.5rem",
            }}
          >
            {formatToDollar.format(data.totalPrice)}
          </Text>
        </StyledLineInfo>
      </Flex>
      <Flex gap="3" mt="4" justify="end">
        <DialogClose>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <DialogClose>
          <Button type="submit">Continue</Button>
        </DialogClose>
      </Flex>
    </form>
  );
}