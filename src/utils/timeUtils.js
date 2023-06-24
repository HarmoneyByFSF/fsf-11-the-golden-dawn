const WeekdayEnum = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const MonthEnum = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDaysInMonth = (month, year) => {
  switch (month) {
    case MonthEnum.January:
    case MonthEnum.March:
    case MonthEnum.May:
    case MonthEnum.July:
    case MonthEnum.August:
    case MonthEnum.October:
    case MonthEnum.December:
      return 31;
    case MonthEnum.April:
    case MonthEnum.June:
    case MonthEnum.September:
    case MonthEnum.November:
      return 30;
    case MonthEnum.February:
      // Adjust for leap year if necessary
      // const currentYear = currentDate.getFullYear() + yearOffset;
      // return isLeapYear(currentYear) ? 29 : 28;
      return 28
    default:
      return 0; // Invalid month
  }
};

export { WeekdayEnum, MonthEnum, getDaysInMonth };
