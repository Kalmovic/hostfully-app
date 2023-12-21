import { Dialog } from "./dialog";
import { mount } from "cypress/react18";
import { DialogClose, Theme } from "@radix-ui/themes";
import { ThemeProvider } from "styled-components";
import { theme } from "../providers/theme";
import { Button } from "./button";

describe("<Dialog />", () => {
  it("opens and closes dialog", () => {
    mount(
      <Theme>
        <ThemeProvider theme={theme}>
          <Dialog
            children={
              <>
                <span>test dialog</span>
                <DialogClose>
                  <Button variant="danger">Close</Button>
                </DialogClose>
              </>
            }
            trigger={<Button>test trigger</Button>}
          />
        </ThemeProvider>
      </Theme>
    );
    cy.get("button").click();
    cy.get("div").contains("test dialog");
    cy.get("button").contains("Close").click();
  });
});
