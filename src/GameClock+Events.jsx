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
        currentDayOfTheMonth: 1, // Initialize with the first day of the month
        weeksElapsed: 0,
        monthsElapsed: 0,
        currentMonthOfTheYear: MonthEnum.January,
        yearsElapsed: 0,
        currentYear: 0,
        weekdayName: '',
        monthName: '',
    },
    pause: () => {},
    resume: () => {},
    addDailyEvent: () => {},
    addWeeklyEvent: () => {},
    addMonthlyEvent: () => {},
    addYearlyEvent: () => {},
});

const GameClockProvider = ({ children }) => {
    const [gameTime, setGameTime] = useState({
        hoursElapsed: 0,
        daysElapsed: 0,
        currentDayOfTheWeek: WeekdayEnum.Monday,
        currentDayOfTheMonth: 1, // Initialize with the first day of the month
        weeksElapsed: 0,
        monthsElapsed: 0,
        currentMonthOfTheYear: MonthEnum.January,
        yearsElapsed: 0,
        currentYear: 0,
        weekdayName: '',
        monthName: '',
    });

    const [isPaused, setIsPaused] = useState(false);
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
            if (!isPaused) {
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
                if (gameDaysElapsed % getDaysInMonth(gameMonthsElapsed % 12 + 1) === 0) {
                    monthlyEvents.forEach((event) => {
                        event.callback(event.payload);
                    });
                }

                // Execute yearly events
                if (gameMonthsElapsed % 12 === 0) {
                    yearlyEvents.forEach((event) => {
                        event.callback(event.payload);
                    });
                }
            }
        };

        // Update game time initially and then every second
        updateGameTime();
        interval = setInterval(updateGameTime, 1000);

        // Clean up the interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [isPaused, dailyEvents, weeklyEvents, monthlyEvents, yearlyEvents]);

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

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

    return (
      <GameClockContext.Provider
        value={{ gameTime, pause, resume, addDailyEvent, addWeeklyEvent, addMonthlyEvent, addYearlyEvent }}
      >
          {children}
      </GameClockContext.Provider>
    );
};

const GameTimeDisplay = () => {
    const { gameTime, pause, resume } = useContext(GameClockContext);

    return (
      <div>
          <p>Hour: {gameTime.hoursElapsed}</p>
          <br />
          <p>Days Elapsed: {gameTime.daysElapsed}</p>
          <p>Day of The Week: {gameTime.currentDayOfTheWeek}</p>
          <p>Day of The Month: {gameTime.currentDayOfTheMonth}</p>
          <p>Weekday Name: {gameTime.weekdayName}</p>
          <br />
          <p>Weeks Elapsed: {gameTime.weeksElapsed}</p>
          <br />
          <p>Month Elapsed: {gameTime.monthsElapsed}</p>
          <p>Month of the Year: {gameTime.currentMonthOfTheYear}</p>
          <p>Month Name: {gameTime.monthName}</p>
          <br />
          <br />
          <p>Years Elapsed: {gameTime.yearsElapsed}</p>
          <p>Current Year: {gameTime.yearsElapsed + gameTime.currentYear}</p>
          <br />
          <p>
              Date: {gameTime.currentDayOfTheMonth}/{gameTime.currentMonthOfTheYear}/
              {gameTime.yearsElapsed + gameTime.currentYear}
          </p>
          <br />
          <button onClick={pause}>Pause</button>
          <button onClick={resume}>Resume</button>
      </div>
    );
};

export { GameClockProvider, GameTimeDisplay, GameClockContext };
