import { Tabs } from "./components/tabs";
import { Text } from "@radix-ui/themes";
import { ManageListings } from "./sections/manageListings";
import styled from "styled-components";
import { Explore } from "./sections/explore";

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
            children: <Explore />,
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
