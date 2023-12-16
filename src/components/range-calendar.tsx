import React from "react";
import {
  RangeCalendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  DateValue,
} from "react-aria-components";
import "./range-calendar.css";
import { today, getLocalTimeZone } from "@internationalized/date";
import { IconButton } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export function BookCalendar(props) {
  const now = today(getLocalTimeZone());
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
  return (
    <RangeCalendar
      aria-label="Trip dates"
      visibleDuration={{ months: 2 }}
      pageBehavior="visible"
      minValue={now}
      isDateUnavailable={isDateUnavailable}
    >
      <header>
        <IconButton slot="prev">
          <ArrowLeftIcon />
        </IconButton>
        <Heading />
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
            />
          )}
        </CalendarGrid>
        <CalendarGrid offset={{ months: 1 }}>
          {(date) => <CalendarCell date={date} />}
        </CalendarGrid>
      </div>
    </RangeCalendar>
  );
}
