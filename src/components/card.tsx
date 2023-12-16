import styled from "styled-components";
import { Button } from "./button";
import { Card as RadixCard, Inset, Text } from "@radix-ui/themes";

type CardProps = {
  img: string;
  hotelName: string;
  hotelDescription: string;
  hotelPrice: number;
};

const CardTitleWrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
});

export function Card(props: CardProps) {
  const { img, hotelName, hotelDescription, hotelPrice } = props;

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
      <CardTitleWrapper>
        <Text
          as="p"
          size="4"
          weight="bold"
          style={{ marginTop: 16, marginBottom: 8 }}
        >
          {hotelName}
        </Text>
        <Text as="p" size="3" style={{ marginTop: 16, marginBottom: 8 }}>
          {hotelPrice}
        </Text>
      </CardTitleWrapper>
      <Text as="p" size="3">
        {hotelDescription}
      </Text>
      <Button fullWidth>Click me</Button>
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
  img: {
    width: 200,
    height: 150,
    objectFit: "fill",
  },
});
