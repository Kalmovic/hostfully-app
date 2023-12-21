## Further Improvements

For further improvements on the providers, mainly on scalability, we can add a lookup for bookings. This remove the necessity to map over the bookings array to find the bookings for a specific provider. This will improve the scalability of the application as the number of bookings increase.

Example:

```javascript
const lookup = bookings.reduce((acc, booking) => {
  return {
    ...acc,
    [booking.id]: booking,
  };
}, {});
```

```javascript
// result
const lookupById = {
  1: {
    id: 1,
    startDate: "2017-10-01",
    endDate: "2017-10-01",
    ...
  },
  2: {
    id: 1,
    startDate: "2017-10-01",
    endDate: "2017-10-01",
    ...
  },
};
```

Resulting in a O(1) lookup time.

```javascript
const updatedBooking = lookupById[bookingId];
```
