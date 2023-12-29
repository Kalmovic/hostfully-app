import { ReviewBooking } from "./reviewBooking";
import { Dialog, Theme } from "@radix-ui/themes";
import { ThemeProvider } from "styled-components";
import { theme } from "../providers/theme";
import { Button } from "../components/button";
import { mount } from "cypress/react18";

describe("<ReviewBooking />", () => {
  const render = () => (
    <Theme>
      <ThemeProvider theme={theme}>
        <Dialog.Root>
          <ReviewBooking
            onSubmit={() => {}}
            cancelButton={<Button variant="secondary">Cancel</Button>}
            data={{
              endDate: "2021-10-10",
              startDate: "2021-10-10",
              numberOfAdults: 1,
              numberOfChildren: 0,
              numberOfRooms: 1,
              totalPrice: 100,
            }}
          />
        </Dialog.Root>
      </ThemeProvider>
    </Theme>
  );
  it("submits", () => {
    mount(render());
    cy.get("button").contains("Book Now").click();
  });
});
