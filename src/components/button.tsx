import { AriaButtonProps } from "react-aria";
import React from "react";
import styled from "styled-components";
import { Button as RadixButton } from "@radix-ui/themes";

type Variants = {
  variant?: "primary" | "secondary" | "danger" | "disabled";
  fullWidth?: boolean;
};

type ButtonProps = AriaButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  Variants;

const StyledButton = styled(RadixButton)<ButtonProps>(
  ({ variant = "primary", theme, fullWidth }) => ({
    backgroundColor: theme.buttons[variant].background,
    color: theme.buttons[variant].color,
    width: fullWidth ? "100%" : "auto",
    border:
      variant === "secondary"
        ? `1px solid ${theme.buttons[variant].borderColor}`
        : "none",
    borderRadius: 4,
    padding: "12px",
    cursor: variant === "disabled" ? "not-allowed" : "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      opacity: variant === "disabled" ? 1 : 0.8,
    },
  })
);

export function Button(props: ButtonProps) {
  const { children, variant = "primary", ...rest } = props;

  return (
    <StyledButton {...rest} variant={props.isDisabled ? "disabled" : variant}>
      {children}
    </StyledButton>
  );
}
