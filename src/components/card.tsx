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
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
          }}
        />
      </Inset>
      <Text as="p" size="4" weight="bold">
        {hotelName}
      </Text>
      <Text color="jade" as="p" size="1" style={{ marginBottom: 8 }}>
        Starting at {formatToDollar.format(hotelPrice)}
      </Text>
      <Flex
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Text
          as="p"
          size="1"
          style={{
            marginTop: 16,
            marginBottom: 8,
            height: 100,
            overflow: "scroll",
          }}
        >
          {hotelDescription}
        </Text>
        {actionButtons}
      </Flex>
    </CardWrapper>
  );
}

const CardWrapper = styled(RadixCard)({
  border: "1px solid #ccc",
  borderRadius: 4,
  overflow: "hidden",
  marginBottom: 16,
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: 240,
  maxHeight: 400,
  img: {
    width: 200,
    height: 150,
    objectFit: "fill",
  },
  "@media (max-width: 768px)": {
    maxWidth: "unset",
  },
});
