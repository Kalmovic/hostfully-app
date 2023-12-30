import React from "react";
import styled from "styled-components";
import { Drawer } from "vaul";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  Theme,
  Separator,
} from "@radix-ui/themes";

const StyledDialogRoot = styled(DialogRoot)({
  borderRadius: "10px",
  boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.1)",
});

const StyledDialogContent = styled(DialogContent)({
  padding: 16,
});

export function Dialog(props: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  onLeaveDialog?: () => void;
}) {
  const isMobile = window.innerWidth < 768;
  return isMobile ? (
    <Drawer.Root>
      <Drawer.Trigger
        style={{
          padding: 0,
          margin: 0,
          border: "none",
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        {props.trigger}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <Drawer.Content
          style={{
            position: "fixed",
            padding: 16,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Theme>
            <Separator
              style={{
                margin: "0 auto 1rem",
                borderRadius: "10px",
                height: 5,
                width: "80px",
              }}
            />
            {props.children}
          </Theme>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  ) : (
    <StyledDialogRoot>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <StyledDialogContent>{props.children}</StyledDialogContent>
    </StyledDialogRoot>
  );
}
