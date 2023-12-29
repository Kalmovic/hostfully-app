import { Theme } from "@radix-ui/themes";
import { BookCalendar } from "./calendar";
import { mount } from "cypress/react18";
import { ThemeProvider } from "styled-components";
import { theme } from "../providers/theme";

describe("<BookCalendar />", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });
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
              start: "2024-12-28",
              end: "2024-12-29",
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
              start: "2024-01-28",
              end: "2024-01-29",
              totalPrice: 100,
            }}
          />
        </ThemeProvider>
      </Theme>
    );
    cy.get("div[data-selection-start='true']").should("contain", "28");
    cy.get("div[data-selection-end='true']").should("contain", "29");
    cy.get("div[aria-label='Friday, January 26, 2024']").click();
    cy.get("div[aria-label='Saturday, January 27, 2024']").click();
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
            unavailableDates={[["2024-01-26", "2024-01-27"]]}
          />
        </ThemeProvider>
      </Theme>
    );
    cy.get("div[aria-label='Friday, January 26, 2024']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
    cy.get("div[aria-label='Saturday, January 27, 2024']").should(
      "have.attr",
      "data-unavailable",
      "true"
    );
  });
});
