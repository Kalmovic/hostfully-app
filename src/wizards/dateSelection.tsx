import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, Controller, useForm } from "react-hook-form";

import {
  DialogTitle,
  DialogDescription,
  Flex,
  Text,
  Separator,
} from "@radix-ui/themes";
import { BookCalendar } from "../components/calendar";
import { Button } from "../components/button";
import { ManualInput } from "../components/manualInput";
import styled from "styled-components";
import { formatToDollar } from "../utils/formatCurrency";
import { Popover } from "../components/popover";
import { theme } from "../providers/theme";
import { Baby, BedDouble, Users } from "lucide-react";

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
    endDate: yup
      .string()
      .required()
      .notOneOf([yup.ref("startDate")], "Select at least 2 days"),
    totalPrice: yup.number().required(),
    numberOfAdults: yup.number().required().min(1),
    numberOfChildren: yup.number().required().min(0),
    numberOfRooms: yup.number().required().min(1),
  });

const BookingDetails = (props: {
  control: Control<DateSelectionForm, unknown>;
  data: {
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfRooms: number;
  };
}) => {
  return (
    <StyledBookingDetailsWrapper>
      <Controller
        control={props.control}
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
        control={props.control}
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
        control={props.control}
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
  );
};

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
  const isMobile = window.innerWidth <= 591;

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <DialogTitle>Details and Availability</DialogTitle>
      <DialogDescription size="2" mb="4">
        Select the number of adults, children, room and the dates you want to
        book and check the availability.
      </DialogDescription>
      <Flex direction="column" gap="6" width="100%">
        {isMobile ? (
          <Popover
            trigger={
              <StyledLineInfo aria-label="Room details">
                <Text size="2">Change room details: </Text>
                <Button
                  variant="secondary"
                  type="button"
                  style={{
                    padding: "1.2rem",
                  }}
                  autoFocus
                >
                  <Flex
                    gap="2"
                    align="center"
                    style={{
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    <Flex gap="1" align="center">
                      <Users size="15px" color={theme.colors.black} />
                      <Text size="2">{numberOfAdults} </Text>
                    </Flex>
                    <Separator
                      orientation="vertical"
                      style={{
                        backgroundColor: theme.colors.black,
                      }}
                    />
                    <Flex gap="1" align="center">
                      <BedDouble size="15px" color={theme.colors.black} />
                      <Text size="2">{numberOfRooms} </Text>
                    </Flex>
                    <Separator
                      orientation="vertical"
                      style={{
                        backgroundColor: theme.colors.black,
                      }}
                    />
                    <Flex gap="1" align="center">
                      <Baby size="15px" color={theme.colors.black} />
                      <Text size="2">{numberOfChildren} </Text>
                    </Flex>
                  </Flex>
                </Button>
              </StyledLineInfo>
            }
          >
            <Text size="4" weight="bold">
              Room details:
            </Text>
            <Separator
              style={{
                backgroundColor: theme.colors.lightGray,
                marginTop: 8,
                marginBottom: 8,
                width: "100%",
                height: 0.5,
              }}
            />
            <BookingDetails
              control={control}
              data={{
                numberOfAdults: numberOfAdults,
                numberOfChildren: numberOfChildren,
                numberOfRooms: numberOfRooms,
              }}
            />
          </Popover>
        ) : (
          <BookingDetails
            control={control}
            data={{
              numberOfAdults: numberOfAdults,
              numberOfChildren: numberOfChildren,
              numberOfRooms: numberOfRooms,
            }}
          />
        )}
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
      </Flex>
      <Flex justify="between" align="center">
        <Text color="red">{formState.errors.endDate?.message}</Text>
        <Text align="right">
          Total price:{" "}
          <strong aria-label="total-price">
            {formatToDollar.format(watch("totalPrice") || 0)}
          </strong>
        </Text>
      </Flex>
      <StyledFooterWrapper>
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
    width: "fit-content",
    flexDirection: "column",
    gap: "1.4rem",
    padding: "0.25rem 0.25rem",
    marginTop: 12,
  },
});

const StyledLineInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.colors.primaryLight,
  padding: "0.1rem 0.1rem 0.1rem 0.5rem",
  borderRadius: "0.5rem",
  gap: "1",
});
