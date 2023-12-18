import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import {
  DialogTitle,
  DialogDescription,
  Flex,
  Text,
  DialogClose,
} from "@radix-ui/themes";
import { BookCalendar } from "../components/range-calendar";
import { Button } from "../components/button";
import { ManualInput } from "../components/manualInput";

type DateSelectionForm = {
  startDate: string;
  endDate: string;
  totalPrice: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
};

type PropsType = {
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
      defaultValues: props.data,
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
        <Flex
          gap="3"
          p="1"
          justify="between"
          width="100%"
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <Controller
            control={control}
            name="numberOfAdults"
            defaultValue={1}
            render={({ field }) => (
              <ManualInput
                label="Adults"
                initialValue="1"
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
            defaultValue={0}
            render={({ field }) => (
              <ManualInput
                label="Children"
                initialValue="0"
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="numberOfRooms"
            defaultValue={1}
            render={({ field }) => (
              <ManualInput
                label="Rooms"
                initialValue="1"
                minimumValue="1"
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </Flex>
        <BookCalendar
          numberOfAdults={numberOfAdults}
          numberOfChildren={numberOfChildren}
          numberOfRooms={numberOfRooms}
          unavailableDates={props.unavailableDates}
          defaultPrice={props.defaultPrice}
          onChange={(dates) => {
            setValue("startDate", dates.start, { shouldValidate: true });
            setValue("endDate", dates.end, { shouldValidate: true });
            setValue("totalPrice", dates.totalPrice, {
              shouldValidate: true,
            });
          }}
        />
      </Flex>

      <Flex mt="4" justify="between">
        <Text>Total price: {watch("totalPrice")}</Text>
        <Flex gap="3">
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button disabled={!formState.isValid} variant="primary" type="submit">
            Continue
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
