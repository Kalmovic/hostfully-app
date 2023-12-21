import React from "react";
import styled from "styled-components";

import { DialogRoot, DialogTrigger, DialogContent } from "@radix-ui/themes";

const MobileDialogRoot = styled(DialogRoot)({
  borderRadius: "10px",
  boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.1)",
});

// write as object
const MobileDialogContent = styled(DialogContent)({
  padding: 16,

  "@media (max-width: 767px)": {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    width: "100%",
    overflowY: "auto",
    maxWidth: "unset",
  },
});

export function Dialog(props: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <MobileDialogRoot>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <MobileDialogContent>{props.children}</MobileDialogContent>
    </MobileDialogRoot>
  );
}
