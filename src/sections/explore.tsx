import { Card } from "../components/card";
import styled from "styled-components";
import { useHotelStore } from "../providers/hotelsProvider";
import { Button } from "../components/button";
import { Dialog } from "../components/dialog";
import { BookingWizard } from "../wizards/bookingWizard";

const ExploreWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 16,
});

export function Explore() {
  const hotels = useHotelStore((state) => state.hotels);
  return (
    <ExploreWrapper>
      {hotels.map((hotel) => (
        <Card
          mode="explore"
          key={hotel.id}
          hotelName={hotel.title}
          hotelDescription={hotel.description}
          hotelPrice={hotel.defaultPrice}
          img={hotel.image}
          actionButtons={[
            <Dialog
              children={
                <BookingWizard
                  mode="create"
                  hotelTitle={hotel.title}
                  hotelDefaultPrice={hotel.defaultPrice}
                />
              }
              trigger={<Button fullWidth>Book now</Button>}
            />,
          ]}
        />
      ))}
    </ExploreWrapper>
  );
}
