import { Card } from "./components/card";
import { Tabs } from "./components/tabs";
import img from "./assets/bookingImg1.png";
import { Text } from "@radix-ui/themes";
import { ManageListings } from "./sections/manageListings";
import styled from "styled-components";

const AppWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  backgroundColor: theme.colors.lightBlue,
}));
function App() {
  return (
    <AppWrapper>
      <Text
        style={{
          fontSize: 42,
          marginBottom: 16,
          marginTop: 16,
          marginLeft: 16,
        }}
      >
        Welcome!
      </Text>
      <Tabs
        tabs={[
          {
            children: (
              <Card
                img={img}
                hotelName="Hotel 1"
                hotelDescription="Hotel 1 description"
                hotelPrice={100}
              />
            ),
            name: "Explore",
            value: "explore",
          },
          {
            children: <ManageListings />,
            name: "Bookings",
            value: "bookings",
          },
        ]}
      />
    </AppWrapper>
  );
}

export default App;
