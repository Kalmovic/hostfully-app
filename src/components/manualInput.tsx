import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import React from "react";

type ManualInputProps = {
  label: string;
  initialValue: string;
  minimumValue?: string;
  onChange: (value: number) => void;
};

export function ManualInput({
  label,
  initialValue,
  minimumValue = "0",
  onChange,
}: ManualInputProps) {
  const [value, setValue] = React.useState(initialValue);
  return (
    <Flex gap="2" align="center">
      <Text>{label}</Text>
      <Flex direction="row" align="center" gap="2">
        <IconButton
          disabled={Number(value) === Number(minimumValue)}
          variant="soft"
          color="indigo"
          type="button"
          aria-label={`decrement-${label}`}
          onClick={() => {
            setValue(String(Number(value) - 1));
            onChange(Number(value) - 1);
          }}
        >
          <MinusIcon />
        </IconButton>
        <Text aria-label={`value-${label}`}>{value}</Text>
        <IconButton
          disabled={Number(value) === 10}
          variant="soft"
          color="indigo"
          type="button"
          aria-label={`increment-${label}`}
          onClick={() => {
            setValue(String(Number(value) + 1));
            onChange(Number(value) + 1);
          }}
        >
          <PlusIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
}
