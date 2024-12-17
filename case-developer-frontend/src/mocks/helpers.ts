import { Age } from "./models";

export function ageToMonths(age: Age): number {
  return age.years * 12 + age.months;
}
