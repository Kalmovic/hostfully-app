import { UserInfo } from "./userInfo";
import { Dialog, Theme } from "@radix-ui/themes";
import { ThemeProvider } from "styled-components";
import { theme } from "../providers/theme";
import { mount } from "cypress/react18";

describe("<UserInfo />", () => {
  const render = () => (
    <Theme>
      <ThemeProvider theme={theme}>
        <Dialog.Root>
          <UserInfo
            data={{}}
            onSubmit={() => {}}
            cancelButton={<button>Cancel</button>}
          />
        </Dialog.Root>
      </ThemeProvider>
    </Theme>
  );
  it("fills out form correctly", () => {
    mount(render());
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("Test");
    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='creditCardNumber']").type("1234123412341234");
    cy.get("button").contains("Continue").should("not.be.disabled");
  });
  it("submits", () => {
    mount(render());
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("Test");
    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='creditCardNumber']").type("1234123412341234");
    cy.get("button").contains("Continue").should("not.be.disabled");
    cy.get("button").contains("Continue").click();
  });
  it("fills email field incorrectly", () => {
    mount(render());
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("Test");
    cy.get("input[name='email']").type("test");
    cy.get("input[name='creditCardNumber']").type("1234123412341234");
    cy.get("button").contains("Continue").should("be.disabled");
  });
  it("fills credit card field incorrectly", () => {
    mount(render());
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("Test");
    cy.get("input[name='email']").type("test@email.com");
    cy.get("input[name='creditCardNumber']").type("12341234");
    cy.get("button").contains("Continue").should("be.disabled");
  });
  it("Doesnt fill out form", () => {
    mount(render());
    cy.get("button").contains("Continue").should("be.disabled");
  });
  it("Doesnt fill out first name", () => {
    mount(render());
    cy.get("input[name='lastName']").type("Test");
    cy.get("input[name='email']").type("test@email.com");
    cy.get("input[name='creditCardNumber']").type("12341234");
    cy.get("button").contains("Continue").should("be.disabled");
  });
  it("Doesnt fill out last name", () => {
    mount(render());
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='email']").type("test@email.com");
    cy.get("input[name='creditCardNumber']").type("12341234");
    cy.get("button").contains("Continue").should("be.disabled");
  });
  it("clicks cancel", () => {
    mount(render());
    cy.get("button").contains("Cancel").click();
  });
});
