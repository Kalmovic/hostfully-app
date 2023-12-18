import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  DialogTitle,
  DialogDescription,
  TextField,
  Flex,
} from "@radix-ui/themes";
import { Button } from "../components/button";
import styled from "styled-components";
type UserInfoForm = {
  firstName: string;
  lastName: string;
  email: string;
  creditCardNumber: string;
};

const schema = () =>
  yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    creditCardNumber: yup.string().required().length(16),
  });

type UserInfoProps = {
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    creditCardNumber?: string;
  };
  onSubmit: (data: UserInfoForm) => void;
  cancelButton: React.ReactNode;
};

export function UserInfo(props: UserInfoProps) {
  const validationSchema = schema();

  const { handleSubmit, control, formState } = useForm<UserInfoForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: props.data,
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <DialogTitle>Information</DialogTitle>
      <DialogDescription size="2" mb="4">
        Enter your information below to complete the booking.
      </DialogDescription>

      <Flex direction="column" gap="3">
        <Controller
          control={control}
          name="firstName"
          defaultValue="John"
          render={({ field }) => (
            <TextField.Input
              {...field}
              aria-label="First name"
              placeholder="Enter your full name"
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          defaultValue="Doe"
          render={({ field }) => (
            <TextField.Input {...field} placeholder="Enter your full name" />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField.Input
              {...field}
              defaultValue=""
              type="email"
              placeholder="Enter your email"
            />
          )}
        />
        <Controller
          control={control}
          name="creditCardNumber"
          render={({ field }) => (
            <TextField.Input
              {...field}
              defaultValue=""
              type=""
              placeholder="Enter your credit card number"
            />
          )}
        />
        <StyledButtonsGrid>
          {props.cancelButton}
          <Button
            fullWidth
            disabled={!formState.isValid}
            variant="primary"
            type="submit"
          >
            Continue
          </Button>
        </StyledButtonsGrid>
      </Flex>
    </form>
  );
}

const StyledButtonsGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
  "@media (max-width: 590px)": {
    gridTemplateColumns: "1fr",
  },
});
