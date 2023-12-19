import styled from "styled-components";
import { Card as RadixCard, Inset, Text, Flex } from "@radix-ui/themes";
import { formatToDollar } from "../utils/formatCurrency";

type CardProps = {
  img: string;
  hotelName: string;
  hotelDescription: string;
  hotelPrice: number;
  actionButtons?: React.ReactNode[];
};

export function Card(props: CardProps) {
  const { img, hotelName, hotelDescription, hotelPrice, actionButtons } = props;

  return (
    <CardWrapper size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={img}
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
      <Text as="p" size="4" weight="bold">
        {hotelName}
      </Text>
      <Text color="jade" as="p" size="1" style={{ marginBottom: 8 }}>
        Starting at {formatToDollar.format(hotelPrice)}
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
        {hotelDescription}
      </Text>
      <Flex
        direction="column"
        justify="between"
        style={{
          marginTop: "auto",
        }}
      >
        <Flex
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {actionButtons}
        </Flex>
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
  maxWidth: 240,
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
