export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getFormat(format) {
  const fmt = {
    nc: () => "NetCDF (.nc)",
    tif: () => "GeoTIFF (.tif)",
  };
  return fmt[format]();
}

export function getHour(time) {
  const hours = {
    0: () => "00:00",
    6: () => "06:00",
    12: () => "12:00",
    18: () => "18:00",
  };
  return hours[time]();
}

export function getFullDate(date) {
  const event = new Date(date.split("T")[0]);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return event.toLocaleDateString("en-GB", options);
}
