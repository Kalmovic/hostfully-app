import React from "react";
import {
  RangeCalendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  DateValue,
} from "react-aria-components";
import "./range-calendar.css";
import {
  today,
  getLocalTimeZone,
  CalendarDate,
  toCalendarDate,
} from "@internationalized/date";
import { IconButton, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useDateFormatter } from "react-aria";

type BookCalenderProps = {
  onChange: (date: { start: string; end: string; totalPrice: number }) => void;
};

export function BookCalendar(props: BookCalenderProps) {
  const now = today(getLocalTimeZone());
  const formatter = useDateFormatter({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const isDateUnavailable = (date: DateValue) =>
    disabledRanges.some(
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
      const price = isWeekend(date) ? 200 : 100;
      totalPrice += price;
    }

    return totalPrice;
  };

  const onChangeDates = (date: RangeValue<DateValue>) => {
    // array of dates between start and end
    return props.onChange({
      start: formatter.format(date.start.toDate(getLocalTimeZone())),
      end: formatter.format(date.end.toDate(getLocalTimeZone())),
      totalPrice: calculateTotalPrice(date.start, date.end),
    });
  };
  return (
    <RangeCalendar
      aria-label="Trip dates"
      visibleDuration={{ months: 2 }}
      pageBehavior="visible"
      minValue={now}
      isDateUnavailable={isDateUnavailable}
      onChange={onChangeDates}
    >
      <header>
        <IconButton slot="prev">
          <ArrowLeftIcon />
        </IconButton>
        <Heading
          style={{
            fontSize: 16,
            fontWeight: "bold",
            margin: 0,
          }}
        />
        <IconButton slot="next">
          <ArrowRightIcon />
        </IconButton>
      </header>
      <div style={{ display: "flex", gap: 30, overflow: "auto" }}>
        <CalendarGrid>
          {(date) => (
            <CalendarCell
              date={date}
              onHoverStart={(date) => console.log(date.target.ariaLabel)}
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
                <Text size="1">{isWeekend(date) ? 200 : 100}</Text>
              </div>
            </CalendarCell>
          )}
        </CalendarGrid>
        <CalendarGrid offset={{ months: 1 }}>
          {(date) => <CalendarCell date={date} />}
        </CalendarGrid>
      </div>
    </RangeCalendar>
  );
}
