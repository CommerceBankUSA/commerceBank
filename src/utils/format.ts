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
