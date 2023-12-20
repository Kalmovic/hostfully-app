export const formatToDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const unformatFromDollar = (value: string) => {
  return Number(value.replace(/[^0-9.-]+/g, ""));
};
