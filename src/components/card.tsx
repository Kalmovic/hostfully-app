import styled from "styled-components";
import {
  Card as RadixCard,
  Inset,
  Text,
  Flex,
  Badge,
  Separator,
} from "@radix-ui/themes";
import { formatToDollar } from "../utils/formatCurrency";
import { format, parseISO } from "date-fns";
import { Baby, BedDouble, Users } from "lucide-react";
import { theme } from "../providers/theme";

type CardProps =
  | {
      mode: "explore";
      img: string;
      hotelName: string;
      hotelDescription: string;
      hotelPrice: number;
      actionButtons?: React.ReactNode[];
    }
  | {
      mode: "manage";
      img: string;
      hotelName: string;
      bookPrice: number;
      bookStatus: "Active" | "Cancelled";
      actionButtons?: React.ReactNode[];
      numberOfAdults: number;
      numberOfChildren: number;
      numberOfRooms: number;
      startDate: string;
      endDate: string;
    };

export function Card(props: CardProps) {
  return (
    <CardWrapper size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={props.img}
          loading="lazy"
          alt="Hotel image"
          height={140}
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Inset>
      {props.mode === "explore" ? (
        <>
          <Text as="p" size="4" weight="bold" aria-label="hotel-name">
            {props.hotelName}
          </Text>
          <Text color="jade" as="p" size="1" style={{ marginBottom: 8 }}>
            Starting at {formatToDollar.format(props.hotelPrice)}
          </Text>
          <Text
            as="p"
            size="1"
            style={{
              marginTop: 16,
              marginBottom: 8,
              height: 130,
              overflowY: "auto",
            }}
          >
            {props.hotelDescription}
          </Text>
        </>
      ) : (
        <Flex direction="column" gap="2">
          <Text as="p" size="4" weight="bold">
            {props.hotelName}
          </Text>
          <Badge
            color={props.bookStatus === "Active" ? "green" : "red"}
            style={{
              width: "fit-content",
              alignSelf: "start",
            }}
          >
            {props.bookStatus}
          </Badge>
          <StyledPeriodText gap="2">
            <Text size="2">
              {format(parseISO(props.startDate), "MM/dd/yy")}
            </Text>
            <Text size="2">to </Text>
            <Text size="2">{format(parseISO(props.endDate), "MM/dd/yy")}</Text>
          </StyledPeriodText>
          <StyledBookingDetails gap="2">
            <Flex gap="1" align="center">
              <Users size="15px" color={theme.colors.black} />
              <Text size="2">{props.numberOfAdults}</Text>
            </Flex>
            <Separator
              orientation="vertical"
              style={{
                backgroundColor: theme.colors.black,
              }}
            />
            <Flex gap="1" align="center">
              <BedDouble size="15px" color={theme.colors.black} />
              <Text size="2">{props.numberOfRooms} </Text>
            </Flex>
            <Separator
              orientation="vertical"
              style={{
                backgroundColor: theme.colors.black,
              }}
            />
            <Flex gap="1" align="center">
              <Baby size="15px" color={theme.colors.black} />
              <Text size="2">{props.numberOfChildren}</Text>
            </Flex>
          </StyledBookingDetails>
        </Flex>
      )}
      <Flex
        direction="column"
        justify="between"
        style={{
          marginTop: "auto",
        }}
      >
        {props.actionButtons}
      </Flex>
    </CardWrapper>
  );
}

const CardWrapper = styled(RadixCard)({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  borderRadius: 4,
  overflow: "hidden",
  marginBottom: 16,
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: 300,
  maxHeight: 600,
  img: {
    width: 200,
    height: 150,
    objectFit: "fill",
  },
  ".rt-CardInner": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  "@media (max-width: 768px)": {
    maxWidth: "unset",
  },
});

const StyledPeriodText = styled(Flex)({
  padding: "0.25rem 0.5rem",
  width: "fit-content",
  alignItems: "center",
});

const StyledBookingDetails = styled(Flex)({
  padding: "0.25rem 0.5rem",
  width: "fit-content",
  alignItems: "center",
});
