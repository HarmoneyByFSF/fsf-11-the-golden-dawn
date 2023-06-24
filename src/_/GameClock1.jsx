import React, { useEffect, useState, useContext } from 'react';

// Configuration
const secondsToDay = 1; // Number of real-world seconds equivalent to a day in the game
const yearOffset = 0; // Offset to the current real-time year

// Weekday and month enums
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

const GameClockContext = React.createContext({
    gameTime: {
        hoursElapsed: 0,
        daysElapsed: 0,
        currentDayOfTheWeek: WeekdayEnum["Monday"],
        weeksElapsed: 0,
        monthsElapsed: 0,
        currentMonthOfTheYear: WeekdayEnum["January"],
        yearsElapsed: 0,
        currentYear: 0,
        weekdayName: '',
        monthName: '',
    },
    pause: () => {},
    resume: () => {},
});

const GameClockProvider = ({ children }) => {
    const [gameTime, setGameTime] = useState({
        hoursElapsed: 0,
        daysElapsed: 0,
        currentDayOfTheWeek: WeekdayEnum["Monday"],
        weeksElapsed: 0,
        monthsElapsed: 0,
        currentMonthOfTheYear: WeekdayEnum["January"],
        yearsElapsed: 0,
        currentYear: 0,
        weekdayName: '',
        monthName: '',
    });

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const millisecondsPerHour = 1000 * 60 * 60;
        const millisecondsPerDay = 1000 * secondsToDay;
        const millisecondsPerWeek = 7 * millisecondsPerDay;
        const millisecondsPerMonth = 30 * millisecondsPerDay;
        const millisecondsPerYear = 12 * millisecondsPerMonth;

        const startTime = new Date().getTime();
        let interval;

        const updateGameTime = () => {
            if (!isPaused) {
                const currentTimestamp = new Date().getTime();
                const elapsedMilliseconds = currentTimestamp - startTime;

                // Calculate game date and time
                const gameHoursElapsed = Math.floor(
                  (elapsedMilliseconds / millisecondsPerHour) % 24
                );
                const gameDaysElapsed = Math.floor(
                  elapsedMilliseconds / millisecondsPerDay
                );
                const gameWeeksElapsed = Math.floor(
                  elapsedMilliseconds / millisecondsPerWeek
                );
                const gameMonthsElapsed = Math.floor(
                  elapsedMilliseconds / millisecondsPerMonth
                );
                const gameYearsElapsed = Math.floor(
                  elapsedMilliseconds / millisecondsPerYear
                );

                // Calculate current date and year
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear() + yearOffset;

                /** DAY OF WEEK **/
                  // Calculate current day
                const currentDayOfTheWeek = (gameDaysElapsed + 2) % 7 || 7;
                // Calculate day of the week (assuming a 7-day week)
                const weekdayName = Object.keys(WeekdayEnum).find(
                  (key) => WeekdayEnum[key] === currentDayOfTheWeek
                );


                /** MONTH OF YEAR **/
                  // Calculate current month
                const currentMonthOfTheYear = (gameMonthsElapsed - 1) % 12;
                // Calculate month of the year (assuming a 12-month year)
                const monthName = Object.keys(MonthEnum).find(
                  (key) => MonthEnum[key] === currentMonthOfTheYear
                );

                // Update the game time state
                setGameTime({
                    hoursElapsed: gameHoursElapsed,
                    daysElapsed: gameDaysElapsed,
                    currentDayOfTheWeek: currentDayOfTheWeek,
                    weeksElapsed: gameWeeksElapsed,
                    monthsElapsed: gameMonthsElapsed,
                    currentMonthOfTheYear: currentMonthOfTheYear,
                    yearsElapsed: gameYearsElapsed,
                    currentYear: currentYear,
                    weekdayName: weekdayName,
                    monthName: monthName,
                });
            }
        };

        // Update game time initially and then every second
        updateGameTime();
        interval = setInterval(updateGameTime, 1000);

        // Clean up the interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [isPaused]);

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    return (
      <GameClockContext.Provider value={{ gameTime, pause, resume }}>
          {children}
      </GameClockContext.Provider>
    );
};

const GameClock = () => {
    const { gameTime, pause, resume } = useContext(GameClockContext);

    return (
      <div>
          <p>Hour: {gameTime.hoursElapsed}</p>
          <br />
          <p>Days Elapsed: {gameTime.daysElapsed}</p>
          <p>Day of The Week: {gameTime.currentDayOfTheWeek}</p>
          <p>Weekday Name: {gameTime.weekdayName}</p>
          <br />
          <p>Weeks Elapsed: {gameTime.weeksElapsed}</p>
          <br />
          {/* <p>Months Elapsed: {gameTime.monthsElapsed}</p>
      <p>Month Name: {monthsNames[gameTime.monthsElapsed % 12]}</p> */}
          <br />
          <p>Month of the Year: {gameTime.currentMonthOfTheYear}</p>
          <p>Month Name: {gameTime.monthName}</p>
          <br />
          <br />
          <p>Years Elapsed: {gameTime.yearsElapsed}</p>
          <p>Current Year: {gameTime.yearsElapsed + gameTime.currentYear}</p>
          <br />
          <button onClick={pause}>Pause</button>
          <button onClick={resume}>Resume</button>
      </div>
    );
};

export { GameClockProvider, GameClock, GameClockContext };
