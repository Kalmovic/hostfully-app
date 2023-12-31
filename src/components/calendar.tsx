import React from "react";
import { format, parseISO } from "date-fns";
import {
  RangeCalendar,
  CalendarGrid,
  CalendarCell,
  Heading,
  DateValue,
  Button,
} from "react-aria-components";
import {
  today,
  getLocalTimeZone,
  CalendarDate,
  toCalendarDate,
  parseDate,
  parseDateTime,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { Text } from "@radix-ui/themes";
import { I18nProvider } from "@react-aria/i18n";
import { theme } from "../providers/theme";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import "./calendar.css";
import styled from "styled-components";

type BookCalenderProps = {
  onChange: (date: { start: string; end: string; totalPrice: number }) => void;
  onChangeDatesInProgress?: (date: string) => void;
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
  const isMobile = window.innerWidth <= 591;
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
    disabledRanges
      ? disabledRanges.some(
          (interval) =>
            date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
        )
      : false;

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
    basePrice += (numberOfRooms - 1) * defaultPrice;

    return isWeekend(date) ? basePrice * 2 : basePrice;
  };

  // @ts-expect-error cant import RangeValue from react-aria-components
  const onChangeDates = (date: RangeValue<DateValue>) => {
    // array of dates between start and end
    const start = format(date.start.toDate(getLocalTimeZone()), "yyyy-MM-dd");
    const end = format(date.end.toDate(getLocalTimeZone()), "yyyy-MM-dd");
    setCalendarInfo({
      start,
      end,
      totalPrice: calculateTotalPrice(date.start, date.end),
    });
    return onChange({
      start,
      end,
      totalPrice: calculateTotalPrice(date.start, date.end),
    });
  };
  const placeholderValue = () => {
    if (!defaultValue?.start) return undefined;
    const isoStartDate = format(parseISO(defaultValue?.start), "yyyy-MM-dd");
    const isoEndDate = format(parseISO(defaultValue?.end), "yyyy-MM-dd");
    let start;
    let end;

    try {
      start = parseDateTime(isoStartDate);
      end = parseDateTime(isoEndDate);
    } catch (e) {
      try {
        start = parseDate(isoStartDate);
        end = parseDate(isoEndDate);
      } catch (e) {
        try {
          start = parseDate(isoStartDate).add({
            days: 1,
          });
          end = parseDate(isoEndDate).add({
            days: 1,
          });
        } catch (e) {
          try {
            start = parseAbsoluteToLocal(isoStartDate);
            end = parseAbsoluteToLocal(isoEndDate);
          } catch (e) {
            try {
              start = parseAbsoluteToLocal(isoStartDate).add({
                days: 1,
              });
              end = parseAbsoluteToLocal(isoEndDate).add({
                days: 1,
              });
            } catch (e) {
              console.log("Invalid date format", e);
            }
          }
        }
      }
    }

    return {
      start,
      end,
      // @ts-expect-error cant import RangeValue from react-aria-components
    } as RangeValue<DateValue>;
  };
  return (
    <I18nProvider locale="en">
      <RangeCalendar
        aria-label="Hotel dates"
        visibleDuration={{ months: isMobile ? 1 : 2 }}
        pageBehavior="visible"
        minValue={now}
        defaultValue={placeholderValue()}
        isDateUnavailable={isDateUnavailable}
        onChange={onChangeDates}
        style={{
          width: "100%",
          backgroundColor: theme.colors.surface,
        }}
      >
        <header>
          <Button
            slot="previous"
            style={{
              boxShadow: "none",
              outline: "none",
              border: "0.8px solid indigo",
              borderRadius: "10%",
              backgroundColor: theme.colors.surface,
            }}
          >
            <CaretLeftIcon width={24} height={24} />
          </Button>
          <Heading
            style={{
              fontSize: 16,
              fontWeight: "bold",
              margin: 0,
            }}
          />
          <Button
            slot="next"
            style={{
              boxShadow: "none",
              outline: "none",
              border: "0.8px solid indigo",
              borderRadius: "10%",
              backgroundColor: theme.colors.surface,
            }}
          >
            <CaretRightIcon width={24} height={24} />
          </Button>
        </header>
        <StyledCalendarWrapper>
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
                    maxWidth: "40px",
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
          {isMobile ? null : (
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
          )}
        </StyledCalendarWrapper>
      </RangeCalendar>
    </I18nProvider>
  );
}

const StyledCalendarWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: 15,
  justifyContent: "center",
  padding: "0.5rem",
  "@media (max-width: 591px)": {
    width: "fit-content",
    margin: "0 auto",
    flexDirection: "column",
  },
});
