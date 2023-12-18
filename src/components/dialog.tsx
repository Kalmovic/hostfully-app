import React from "react";

import { DialogRoot, DialogTrigger, DialogContent } from "@radix-ui/themes";

export function Dialog(props: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <DialogRoot>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <DialogContent style={{ maxWidth: "fit-content" }}>
        {props.children}
      </DialogContent>
    </DialogRoot>
  );
}
