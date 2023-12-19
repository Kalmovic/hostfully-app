import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { DialogTitle, DialogDescription, Flex, Text } from "@radix-ui/themes";
import { BookCalendar } from "../components/range-calendar";
import { Button } from "../components/button";
import { ManualInput } from "../components/manualInput";
import styled from "styled-components";
import { formatToDollar } from "../utils/formatCurrency";

type DateSelectionForm = {
  startDate: string;
  endDate: string;
  totalPrice: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
};

type PropsType =
  | {
      mode: "edit";
      data: {
        startDate: string;
        endDate: string;
        totalPrice: number;
        numberOfAdults: number;
        numberOfChildren: number;
        numberOfRooms: number;
      };
      onSubmit: (data: DateSelectionForm) => void;
      unavailableDates: string[][];
      defaultPrice: number;
      cancelButton: React.ReactNode;
    }
  | {
      mode: "create";
      data: {
        startDate?: string;
        endDate?: string;
        totalPrice?: number;
        numberOfAdults?: number;
        numberOfChildren?: number;
        numberOfRooms?: number;
      };
      onSubmit: (data: DateSelectionForm) => void;
      unavailableDates: string[][];
      defaultPrice: number;
      cancelButton: React.ReactNode;
    };

const schema = () =>
  yup.object().shape({
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    totalPrice: yup.number().required(),
    numberOfAdults: yup.number().required().min(1),
    numberOfChildren: yup.number().required().min(0),
    numberOfRooms: yup.number().required().min(1),
  });

export function DateSelection(props: PropsType) {
  const validationSchema = schema();

  const { handleSubmit, formState, watch, control, setValue } =
    useForm<DateSelectionForm>({
      resolver: yupResolver(validationSchema),
      defaultValues:
        props.mode === "edit"
          ? props.data
          : {
              startDate: "",
              endDate: "",
              totalPrice: 0,
              numberOfAdults: 1,
              numberOfChildren: 0,
              numberOfRooms: 1,
            },
    });

  const numberOfAdults = watch("numberOfAdults");
  const numberOfChildren = watch("numberOfChildren");
  const numberOfRooms = watch("numberOfRooms");

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <DialogTitle>Details and Availability</DialogTitle>
      <DialogDescription size="2" mb="4">
        Select the number of adults, children, room and the dates you want to
        book and check the availability.
      </DialogDescription>
      <Flex direction="column" gap="3" width="100%">
        <StyledBookingDetailsWrapper>
          <Controller
            control={control}
            name="numberOfAdults"
            render={({ field }) => (
              <ManualInput
                label="Adults"
                initialValue={`${props.data.numberOfAdults || 1}`}
                minimumValue="1"
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="numberOfChildren"
            render={({ field }) => (
              <ManualInput
                label="Children"
                initialValue={`${props.data.numberOfChildren || 0}`}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="numberOfRooms"
            render={({ field }) => (
              <ManualInput
                label="Rooms"
                initialValue={`${props.data.numberOfRooms || 1}`}
                minimumValue="1"
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </StyledBookingDetailsWrapper>
        <BookCalendar
          numberOfAdults={numberOfAdults}
          numberOfChildren={numberOfChildren}
          numberOfRooms={numberOfRooms}
          unavailableDates={props.unavailableDates}
          defaultPrice={props.defaultPrice}
          defaultValue={{
            start: props.data.startDate || "",
            end: props.data.endDate || "",
            totalPrice: props.data.totalPrice || 0,
          }}
          onChange={(dates) => {
            setValue("startDate", dates.start, { shouldValidate: true });
            setValue("endDate", dates.end, { shouldValidate: true });
            setValue("totalPrice", dates.totalPrice, {
              shouldValidate: true,
            });
          }}
        />
        <StyledFooterWrapper>
          <Text align="center">
            Total price: {formatToDollar.format(watch("totalPrice") || 0)}
          </Text>
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
        </StyledFooterWrapper>
      </Flex>
    </form>
  );
}

const StyledButtonsGrid = styled("div")({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0.5rem",
});

const StyledFooterWrapper = styled(Flex)({
  marginTop: "0.25rem",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width: 590px)": {
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "end",
  },
});

const StyledBookingDetailsWrapper = styled(Flex)({
  border: "1px solid #ccc",
  borderRadius: "4px",
  justifyContent: "space-between",
  padding: "0.2rem",
  "@media (max-width: 590px)": {
    border: "none",
    alignItems: "end",
    justifyContent: "flex-end",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0.25rem 0.25rem",
  },
});
