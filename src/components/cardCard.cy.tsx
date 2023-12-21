import { Theme } from "@radix-ui/themes";
import { Card } from "./card";
import { mount } from "cypress/react18";
import { ThemeProvider } from "styled-components";
import { theme } from "../providers/theme";
import { Button } from "./button";

describe("<Card />", () => {
  it("renders as create", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <Card
            mode="explore"
            hotelDescription="test description"
            img="https://picsum.photos/seed/picsum/200/300"
            hotelPrice={100}
            hotelName="test hotel name"
            actionButtons={[<Button key={1}>test button</Button>]}
            key={1}
          />
        </ThemeProvider>
      </Theme>
    );
  });
  it("renders as explore", () => {
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <Card
            mode="manage"
            img="https://picsum.photos/seed/picsum/200/300"
            bookPrice={100}
            bookStatus="Active"
            endDate="2021-09-01"
            startDate="2021-09-01"
            hotelName="test hotel name"
            numberOfAdults={1}
            numberOfChildren={1}
            numberOfRooms={1}
            key={1}
            actionButtons={[
              <Button key={1}>edit</Button>,
              <Button key={2}>delete</Button>,
            ]}
          />
        </ThemeProvider>
      </Theme>
    );
  });
});
