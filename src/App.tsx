import { Tabs } from "./components/tabs";
import { Text } from "@radix-ui/themes";
import { ManageBookings } from "./sections/manageBookings";
import styled from "styled-components";
import { Explore } from "./sections/explore";
import logo from "./assets/hostfully-logo.svg";

const AppWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  backgroundColor: theme.colors.lightBlue,
  maxWidth: "1400px",
  margin: "0 auto",
}));
function App() {
  return (
    <AppWrapper>
      <Text
        style={{
          display: "flex",
          fontSize: 28,
          marginBottom: 16,
          marginTop: 16,
          marginLeft: 16,
          alignItems: "baseline",
        }}
      >
        Welcome to{" "}
        <img
          src={logo}
          alt="logo"
          style={{ width: 150, position: "relative", top: 8, left: 8 }}
        />
      </Text>
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
  );
}

export default App;
