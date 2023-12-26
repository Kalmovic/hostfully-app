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
      hotelRating: string;
      hotelName: string;
      hotelDescription: string;
      hotelPrice: number;
      actionButtons?: React.ReactNode[];
      ammenities?: string[];
    }
  | {
      mode: "manage";
      img: string;
      hotelName: string;
      bookPrice: number;
      hotelDescription: string;
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
      <Inset
        clip="padding-box"
        side="left"
        pb="current"
        style={{
          padding: 0,
        }}
      >
        <StyledImg src={props.img} loading="lazy" alt="Hotel image" />
      </Inset>
      {props.mode === "explore" ? (
        <StyledExploreContent style={{ marginLeft: 16 }}>
          <StyledHotelName>{props.hotelName}</StyledHotelName>
          <StyledRating>{props.hotelRating}</StyledRating>
          <Flex
            direction="column"
            gap="1"
            style={{
              gridArea: "price",
              alignSelf: "center",
              justifySelf: "end",
              justifyContent: "center",
              textAlign: "end",
            }}
          >
            <Text as="p" size="2">
              Price / night
            </Text>
            <StyledPrice>{formatToDollar.format(props.hotelPrice)}</StyledPrice>
            <Text as="p" size="2">
              Fees and taxes included
            </Text>
          </Flex>
          <StyledHotelDescription
            as="p"
            size="1"
            style={{
              marginTop: 2,
              marginBottom: 8,
              maxWidth: 550,
              maxHeight: 100,
              overflowY: "auto",
              gridArea: "description",
            }}
          >
            {props.hotelDescription}
          </StyledHotelDescription>
          <StyledAmmenitiesWrapper>
            {props.ammenities &&
              props.ammenities.map((ammenity) => (
                <Badge
                  key={ammenity}
                  color="green"
                  radius="full"
                  size={"1"}
                  style={{
                    width: "fit-content",
                    alignSelf: "start",
                  }}
                >
                  {ammenity}
                </Badge>
              ))}
          </StyledAmmenitiesWrapper>
          <StyledButtons>{props.actionButtons}</StyledButtons>
        </StyledExploreContent>
      ) : (
        <StyledManageContent>
          <StyledHotelName>{props.hotelName}</StyledHotelName>
          <Flex
            direction="column"
            gap="1"
            style={{
              gridArea: "price",
              alignSelf: "center",
              justifySelf: "end",
              justifyContent: "center",
              textAlign: "end",
            }}
          >
            <Text as="p" size="2">
              Total price
            </Text>
            <StyledPrice>{formatToDollar.format(props.bookPrice)}</StyledPrice>
            <Text as="p" size="2">
              Fees and taxes included
            </Text>
          </Flex>
          <Badge
            color={props.bookStatus === "Active" ? "green" : "red"}
            style={{
              gridArea: "status",
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
          <StyledButtons>{props.actionButtons}</StyledButtons>
        </StyledManageContent>
      )}
    </CardWrapper>
  );
}

const CardWrapper = styled(RadixCard)({
  display: "flex",
  flexDirection: "row",
  border: "1px solid #ccc",
  overflow: "hidden",
  marginBottom: 16,
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxHeight: 600,
  ".rt-CardInner": {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    marginTop: 0,
  },
  "@media (max-width: 768px)": {
    maxWidth: "unset",
  },
});

const StyledPeriodText = styled(Flex)({
  backgroundColor: theme.colors.surface,
  border: "1px solid black",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
  height: "fit-content",
  width: "fit-content",
  alignItems: "center",
  gridArea: "period",
});

const StyledBookingDetails = styled(Flex)({
  backgroundColor: theme.colors.surface,
  border: "1px solid black",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
  height: "fit-content",
  width: "fit-content",
  alignItems: "center",
  gridArea: "bookingDetails",
});

const StyledImg = styled("img")({
  display: "block",
  width: 350,
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
  "@media (max-width: 1000px)": {
    width: 250,
  },
  "@media (max-width: 768px)": {
    width: 200,
  },
  "@media (max-width: 620px)": {
    width: 150,
  },
});

const StyledAmmenitiesWrapper = styled("div")({
  gridArea: "ammenities",
  width: "fit-content",
  display: "grid",
  height: "fit-content",
  marginTop: "auto",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 8,
  "@media (max-width: 710px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 580px)": {
    display: "none",
  },
});

const StyledHotelDescription = styled(Text)({
  width: "100%",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "8px",
    backgroundColor: theme.colors.primary /* Set thumb color */,
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "8px",
    backgroundColor: theme.colors.primaryLight,
  },
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const StyledExploreContent = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateAreas: `
    "title title rating"
    "description description price"
    "ammenities ammenities button"
  `,
  gridTemplateColumns: "2fr 1fr 1.5fr",
  "@media (max-width: 768px)": {
    rowGap: 8,
    gridTemplateAreas: `
    "title title title"
    "rating rating rating"
    "ammenities ammenities price"
    "button button button"
    `,
    gridTemplateColumns: "1fr",
  },
  "@media (max-width: 580px)": {
    gridTemplateAreas: `
    "title title title"
    "rating rating rating"
    "price price price"
    "button button button"
  `,
    gridTemplateColumns: "1fr",
  },
});

const StyledManageContent = styled("div")({
  marginLeft: 16,
  rowGap: 0,
  width: "100%",
  display: "grid",
  gridTemplateAreas: `
    "title title title"
    "status status price"
    "period period price"
    "bookingDetails bookingDetails button"
  `,
  gridTemplateColumns: "2fr 1fr 1.5fr",
  "@media (max-width: 768px)": {
    rowGap: 8,
    gridTemplateAreas: `
    "title title title"
    "status status price"
    "period period price"
    "bookingDetails bookingDetails price"
    "button button button"
    `,
    gridTemplateColumns: "2fr 1fr 1.5fr",
  },
  "@media (max-width: 450px)": {
    gridTemplateAreas: `
    "title title title"
    "status status status"
    "price price price"
    "period period period"
    "bookingDetails bookingDetails bookingDetails"
    "button button button"
    `,
    gridTemplateColumns: "2fr 1fr 1.5fr",
  },
});

const StyledButtons = styled("div")({
  gridArea: "button",
  marginLeft: "auto",
  width: "100%",
  "@media (max-width: 580px)": {
    marginLeft: 0,
  },
});

const StyledRating = styled("span")({
  gridArea: "rating",
  alignSelf: "center",
  justifySelf: "end",
  padding: "0.6rem",
  backgroundColor: theme.colors.primary,
  color: theme.colors.white,
  borderRadius: 8,
  "@media (max-width: 768px)": {
    justifySelf: "start",
    padding: "0.4rem 0.55rem",
  },
});

const StyledPrice = styled("span")({
  fontSize: 48,
  lineHeight: 1,
  "@media (max-width: 768px)": {
    fontSize: 32,
  },
});

const StyledHotelName = styled(Text)({
  gridArea: "title",
  fontWeight: 500,
  fontSize: 28,
  "@media (max-width: 768px)": {
    fontSize: 20,
  },
});
