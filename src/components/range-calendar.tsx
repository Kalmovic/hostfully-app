import React from "react";
import { format } from "date-fns";
import {
  RangeCalendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  DateValue,
} from "react-aria-components";
import {
  today,
  getLocalTimeZone,
  CalendarDate,
  toCalendarDate,
  parseDate,
} from "@internationalized/date";
import { IconButton, Text } from "@radix-ui/themes";
import { I18nProvider } from "@react-aria/i18n";
import { theme } from "../providers/theme";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import "./range-calendar.css";

type BookCalenderProps = {
  onChange: (date: { start: string; end: string; totalPrice: number }) => void;
  numberOfAdults?: number;
  numberOfChildren?: number;
  numberOfRooms?: number;
  unavailableDates?: string[][];
  defaultPrice: number;
  defaultValue?: { start: string; end: string; totalPrice: number };
};

export function BookCalendar({
  numberOfAdults = 1,
  numberOfChildren = 0,
  numberOfRooms = 1,
  onChange,
  unavailableDates,
  defaultPrice,
  defaultValue,
}: BookCalenderProps) {
  const [calendarInfo, setCalendarInfo] = React.useState({
    start: defaultValue?.start || "",
    end: defaultValue?.end || "",
    totalPrice: defaultValue?.totalPrice || 0,
  });
  React.useEffect(() => {
    updateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfAdults, numberOfChildren, numberOfRooms]);
  const updateTotalPrice = () => {
    // if total price is already calculated, we know
    // that the user has already selected a date range
    // so we dont call updateTotalPrice on mount
    if (calendarInfo.totalPrice === 0) {
      return;
    }
    const start = parseDate(calendarInfo.start).add({
      days: 1,
    });
    const end = parseDate(calendarInfo.end).add({
      days: 1,
    });
    const newCalendarInfo = {
      ...calendarInfo,
      totalPrice: calculateTotalPrice(start, end),
    };

    setCalendarInfo(newCalendarInfo);
    return onChange(newCalendarInfo);
  };
  const now = today(getLocalTimeZone());
  const disabledRanges = unavailableDates?.map((range) => {
    const isoStartDate = format(new Date(range[0]), "yyyy-MM-dd");
    const isoEndDate = format(new Date(range[1]), "yyyy-MM-dd");

    return [
      parseDate(isoStartDate).add({
        days: 1,
      }),
      parseDate(isoEndDate).add({
        days: 1,
      }),
    ];
  });

  const isDateUnavailable = (date: DateValue) =>
    disabledRanges?.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  const isWeekend = (date: CalendarDate) => {
    return date.toDate(getLocalTimeZone()).getDay() === 0 ||
      date.toDate(getLocalTimeZone()).getDay() === 6
      ? true
      : false;
  };

  const calculateTotalPrice = (start: DateValue, end: DateValue) => {
    let totalPrice = 0;
    for (
      let currentDate = start;
      currentDate.compare(end) <= 0;
      currentDate = currentDate.add({ days: 1 })
    ) {
      const date = toCalendarDate(currentDate);
      const price = calculateDayPrice(date);
      totalPrice += price;
    }
    return totalPrice;
  };

  const calculateDayPrice = (date: CalendarDate) => {
    let basePrice = defaultPrice;
    basePrice *= numberOfAdults;
    basePrice += numberOfChildren * Math.ceil(defaultPrice / 2);
    basePrice += numberOfRooms * defaultPrice;

    return isWeekend(date) ? basePrice * 2 : basePrice;
  };

  const onChangeDates = (date: RangeValue<DateValue>) => {
    // array of dates between start and end
    setCalendarInfo({
      start: `${date.start.year}-${date.start.month}-${date.start.day}`,
      end: `${date.end.year}-${date.end.month}-${date.end.day}`,
      totalPrice: calculateTotalPrice(date.start, date.end),
    });
    return onChange({
      start: `${date.start.year}-${date.start.month}-${date.start.day}`,
      end: `${date.end.year}-${date.end.month}-${date.end.day}`,
      totalPrice: calculateTotalPrice(date.start, date.end),
    });
  };
  return (
    <I18nProvider locale="en">
      <RangeCalendar
        aria-label="Trip dates"
        visibleDuration={{ months: 2 }}
        pageBehavior="visible"
        minValue={now}
        defaultValue={
          defaultValue.start
            ? {
                start: parseDate(defaultValue.start),
                end: parseDate(defaultValue.end),
              }
            : undefined
        }
        isDateUnavailable={isDateUnavailable}
        onChange={onChangeDates}
        style={{
          width: "100%",
          backgroundColor: theme.colors.surface,
        }}
      >
        <header>
          <IconButton
            slot="next"
            color="indigo"
            variant="outline"
            size="2"
            style={{
              boxShadow: "none",
            }}
          >
            <CaretLeftIcon width={24} height={24} />
          </IconButton>
          <Heading
            style={{
              fontSize: 16,
              fontWeight: "bold",
              margin: 0,
            }}
          />
          <IconButton
            slot="next"
            color="indigo"
            variant="outline"
            size="2"
            style={{
              boxShadow: "none",
            }}
          >
            <CaretRightIcon width={24} height={24} />
          </IconButton>
        </header>
        <div
          style={{
            display: "flex",
            gap: 30,
            overflow: "auto",
            justifyContent: "center",
          }}
        >
          <CalendarGrid>
            {(date) => (
              <CalendarCell
                date={date}
                style={{
                  gap: 0.2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.2,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <Text size="2">{date.day}</Text>
                  {/* price based on weekday (if weekend, double)*/}
                  <Text size="1">{calculateDayPrice(date)}</Text>
                </div>
              </CalendarCell>
            )}
          </CalendarGrid>
          <CalendarGrid offset={{ months: 1 }}>
            {(date) => (
              <CalendarCell
                date={date}
                style={{
                  gap: 0.2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.2,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <Text size="2">{date.day}</Text>
                  <Text size="1">{calculateDayPrice(date)}</Text>
                </div>
              </CalendarCell>
            )}
          </CalendarGrid>
        </div>
      </RangeCalendar>
    </I18nProvider>
  );
}
