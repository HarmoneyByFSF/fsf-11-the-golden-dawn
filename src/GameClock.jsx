import React, { useEffect, useState, useContext } from 'react';
import { WeekdayEnum, MonthEnum, getDaysInMonth } from './utils/timeUtils';

// Configuration
const secondsToDay = 1; // Number of real-world seconds equivalent to a day in the game
const yearOffset = 0; // Offset to the current real-time year

const GameClockContext = React.createContext({
    gameTime: {
        hoursElapsed: 0,
        daysElapsed: 0,
        currentDayOfTheWeek: WeekdayEnum.Monday,
        currentDayOfTheMonth: 1,
        weeksElapsed: 0,
        monthsElapsed: 0,
        currentMonthOfTheYear: MonthEnum.January,
        yearsElapsed: 0,
        currentYear: 0,
        weekdayName: '',
        monthName: '',
    },
    addDailyEvent: () => {},
    addWeeklyEvent: () => {},
    addMonthlyEvent: () => {},
    addYearlyEvent: () => {},
    startGameClock: () => {},
});

const GameClockProvider = ({ children }) => {
    const [gameTime, setGameTime] = useState({
        hoursElapsed: 0,
        daysElapsed: 0,
        currentDayOfTheWeek: WeekdayEnum.Monday,
        currentDayOfTheMonth: 1,
        weeksElapsed: 0,
        monthsElapsed: 0,
        currentMonthOfTheYear: MonthEnum.January,
        yearsElapsed: 0,
        currentYear: 0,
        weekdayName: '',
        monthName: '',
    });

    const [isPaused, setIsPaused] = useState(false);
    const [isGameClockStarted, setIsGameClockStarted] = useState(false);
    const [dailyEvents, setDailyEvents] = useState([]);
    const [weeklyEvents, setWeeklyEvents] = useState([]);
    const [monthlyEvents, setMonthlyEvents] = useState([]);
    const [yearlyEvents, setYearlyEvents] = useState([]);

    useEffect(() => {
        const millisecondsPerDay = 1000 * secondsToDay;

        const startTime = new Date().getTime();
        let interval;

        let gameDaysElapsed = 0;
        let gameWeeksElapsed = 0;
        let gameMonthsElapsed = 0;
        let gameYearsElapsed = 0;

        const updateGameTime = () => {
            const currentTimestamp = new Date().getTime();
            const elapsedMilliseconds = currentTimestamp - startTime;

            // Calculate game date and time
            const elapsedDays = Math.floor(elapsedMilliseconds / millisecondsPerDay);

            // Update game time components
            while (gameDaysElapsed < elapsedDays) {
                gameDaysElapsed++;
                if (gameDaysElapsed % 7 === 0) {
                    gameWeeksElapsed++;
                }
                if (gameDaysElapsed % getDaysInMonth(gameMonthsElapsed % 12 + 1) === 0) {
                    gameMonthsElapsed++;
                    if (gameMonthsElapsed % 12 === 0) {
                        gameYearsElapsed++;
                    }
                }
            }

            // Calculate current date and year
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() + yearOffset;

            // Calculate current day of the week
            const currentDayOfTheWeek = (gameDaysElapsed % 7) + 1;
            const weekdayName = Object.keys(WeekdayEnum).find(
              (key) => WeekdayEnum[key] === currentDayOfTheWeek
            );

            // Calculate current day of the month
            const currentMonth = gameDaysElapsed % 12 + 1;
            const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
            const currentDayOfTheMonth = (gameDaysElapsed % daysInCurrentMonth) + 1;

            // Calculate current month of the year
            const currentMonthOfTheYear = (gameMonthsElapsed % 12) + 1;
            const monthName = Object.keys(MonthEnum).find(
              (key) => MonthEnum[key] === currentMonthOfTheYear
            );

            // Update the game time state
            setGameTime({
                daysElapsed: gameDaysElapsed,
                currentDayOfTheWeek: currentDayOfTheWeek,
                currentDayOfTheMonth: currentDayOfTheMonth,
                weeksElapsed: gameWeeksElapsed,
                monthsElapsed: gameMonthsElapsed,
                currentMonthOfTheYear: currentMonthOfTheYear,
                yearsElapsed: gameYearsElapsed,
                currentYear: currentYear,
                weekdayName: weekdayName,
                monthName: monthName,
            });

            // Execute daily events
            dailyEvents.forEach((event) => {
                event.callback(event.payload);
            });

            // Execute weekly events
            if (gameDaysElapsed % 7 === 0) {
                weeklyEvents.forEach((event) => {
                    event.callback(event.payload);
                });
            }

            // Execute monthly events
            if ((gameDaysElapsed + 1) % getDaysInMonth(gameMonthsElapsed % 12 + 1) === 0) {
                monthlyEvents.forEach((event) => {
                    event.callback(event.payload);
                });
            }

            // Execute yearly events
            if ((gameMonthsElapsed + 1) % 12 === 0) {
                yearlyEvents.forEach((event) => {
                    event.callback(event.payload);
                });
            }
        };

        // Update game time initially and then every second if the game clock is started
        if (isGameClockStarted) {
            updateGameTime();
            interval = setInterval(updateGameTime, 1000);
        }

        // Clean up the interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [isPaused, dailyEvents, weeklyEvents, monthlyEvents, yearlyEvents, isGameClockStarted]);

    const addDailyEvent = (name, payload, callback) => {
        setDailyEvents([...dailyEvents, { name, payload, callback }]);
    };

    const addWeeklyEvent = (name, payload, callback) => {
        setWeeklyEvents([...weeklyEvents, { name, payload, callback }]);
    };

    const addMonthlyEvent = (name, payload, callback) => {
        setMonthlyEvents([...monthlyEvents, { name, payload, callback }]);
    };

    const addYearlyEvent = (name, payload, callback) => {
        setYearlyEvents([...yearlyEvents, { name, payload, callback }]);
    };

    const startGameClock = () => {
        setIsGameClockStarted(true);
    };

    return (
      <GameClockContext.Provider
        value={{
            gameTime,
            addDailyEvent,
            addWeeklyEvent,
            addMonthlyEvent,
            addYearlyEvent,
            startGameClock,
        }}
      >
          {children}
      </GameClockContext.Provider>
    );
};

export { GameClockProvider, GameClockContext };
