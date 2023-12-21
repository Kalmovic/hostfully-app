import { Theme } from "@radix-ui/themes";
import { BookCalendar } from "./calendar";
import { mount } from "cypress/react18";
import { ThemeProvider } from "styled-components";
import { theme } from "../providers/theme";

describe("<BookCalendar />", () => {
  it("renders empty", () => {
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <BookCalendar defaultPrice={100} onChange={() => {}} />
        </ThemeProvider>
      </Theme>
    );
  });
  it("renders with default value", () => {
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <BookCalendar
            defaultPrice={100}
            onChange={() => {}}
            defaultValue={{
              start: "2023-12-28",
              end: "2023-12-29",
              totalPrice: 100,
            }}
          />
        </ThemeProvider>
      </Theme>
    );
  });
  it("renders with default value and changes it", () => {
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <BookCalendar
            defaultPrice={100}
            onChange={() => {}}
            defaultValue={{
              start: "2023-12-28",
              end: "2023-12-29",
              totalPrice: 100,
            }}
          />
        </ThemeProvider>
      </Theme>
    );
    cy.get("div[data-selection-start='true']").should("contain", "28");
    cy.get("div[data-selection-end='true']").should("contain", "29");
    cy.get("div[aria-label='Tuesday, December 26, 2023']").click();
    cy.get("div[aria-label='Wednesday, December 27, 2023']").click();
    cy.get("div[data-selection-start='true']").should("contain", "26");
    cy.get("div[data-selection-end='true']").should("contain", "27");
  });
  it("renders with unavailable dates", () => {
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <BookCalendar
            defaultPrice={100}
            onChange={() => {}}
            unavailableDates={[["2023-12-26", "2023-12-27"]]}
          />
        </ThemeProvider>
      </Theme>
    );
    cy.get("div[aria-label='Tuesday, December 26, 2023']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
    cy.get("div[aria-label='Wednesday, December 27, 2023']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
  });
});
