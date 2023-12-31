import styled from "styled-components";
import { Tabs } from "./components/tabs";
import { ManageBookings } from "./sections/manageBookings";
import { Explore } from "./sections/explore";
import { Header } from "./sections/header";

const AppWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
});
function App() {
  return (
    <>
      <Header />
      <AppWrapper>
        <Tabs
          tabs={[
            {
              children: <Explore />,
              name: "Explore",
              value: "explore",
            },
            {
              children: <ManageBookings />,
              name: "Bookings",
              value: "bookings",
            },
          ]}
        />
      </AppWrapper>
    </>
  );
}

export default App;
