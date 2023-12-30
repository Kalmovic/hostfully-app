import { Popover as RadixPopover } from "@radix-ui/themes";
import { styled } from "styled-components";
import { theme } from "../providers/theme";

export function Popover(props: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger>{props.trigger}</RadixPopover.Trigger>
      <PopoverContent sideOffset={5} side="bottom" align="end">
        {props.children}
      </PopoverContent>
    </RadixPopover.Root>
  );
}

const PopoverContent = styled(RadixPopover.Content)({
  borderRadius: 4,
  padding: 20,
  width: "fit-content",
  minWidth: "unset",
  backgroundColor: "white",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${theme.colors.primary}`,
  },
});

export default Popover;
