//Omit
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keysToOmit: K[]
): Omit<T, K> {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const currentKey = key as keyof T;
      if (!keysToOmit.includes(currentKey as K)) {
        newObj[currentKey] = obj[currentKey];
      }
    }
  }
  return newObj as Omit<T, K>;
}

//Date and time
export function formatDate(date: Date | string) {
  const d = new Date(date);

  // Day with suffix
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  // Month name
  const month = d.toLocaleString("en-US", { month: "long" });

  // Hours and minutes in 12-hour format
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12

  return `${day}${suffix} ${month}, ${hours}:${minutes}${ampm}`;
}
