import { Card } from "../components/card";
import styled from "styled-components";
import { useHotelStore } from "../providers/hotelsProvider";
import { Button } from "../components/button";
import { Dialog } from "../components/dialog";
import { BookingWizard } from "../wizards/bookingWizard";

const ExploreWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: 2,
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
          hotelRating={hotel.rating}
          hotelDescription={hotel.description}
          hotelPrice={hotel.defaultPrice}
          img={hotel.image}
          ammenities={hotel.ammenities}
          actionButtons={[
            <Dialog
              key={hotel.id}
              children={
                <BookingWizard
                  mode="create"
                  hotelTitle={hotel.title}
                  hotelDefaultPrice={hotel.defaultPrice}
                />
              }
              trigger={
                <Button
                  fullWidth
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  Book now
                </Button>
              }
            />,
          ]}
        />
      ))}
    </ExploreWrapper>
  );
}
