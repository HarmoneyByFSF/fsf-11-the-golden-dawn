import React, { useContext, useEffect, useState } from 'react';
import {Routes, Route, Outlet, redirect, Link} from 'react-router-dom';
import { AppContext } from './App';
import { GameClockContext } from './GameClock';

const Game = () => {
  const { gameTime, startGameClock, addDailyEvent, addMonthlyEvent, addYearlyEvent, addWeeklyEvent } = useContext(GameClockContext);
  const { player } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);

  const deductExpenses = () => {
    addDailyEvent("deduct daily expenses: ", { data: player.dailyRecurringExpenses }, ({data}) => {
      data.map(() => {
        player.accountBalance -= data.amount;
      })
    })
    addWeeklyEvent("deduct weekly expenses: ", { data: player.weeklyRecurringExpenses }, ({data}) => {
      data.map(() => {
        player.accountBalance -= data.amount;
      })
    })
    addMonthlyEvent("deduct monthly expenses: ", { data: player.monthlyRecurringExpenses }, ({data}) => {
      data.map(() => {
        player.accountBalance -= data.amount;
      })
    })
    addYearlyEvent("deduct yearly expenses: ", { data: player.yearlyRecurringExpenses }, ({data}) => {
      data.map(() => {
        player.accountBalance -= data.amount;
      })
    });
  }
  const addIncome = () => {
    addDailyEvent("deduct daily income: ", { data: player.dailyRecurringIncome }, ({data}) => {
      data.map(() => {
        player.accountBalance += data.amount;
      })
    })
    addWeeklyEvent("deduct weekly income: ", { data: player.weeklyRecurringIncome }, ({data}) => {
      data.map(() => {
        player.accountBalance += data.amount;
      })
    })
    addMonthlyEvent("deduct monthly income: ", { data: player.monthlyRecurringIncome }, ({data}) => {
      data.map(() => {
        player.accountBalance += data.amount;
      })
    })
    addYearlyEvent("deduct yearly income: ", { data: player.yearlyRecurringIncome }, ({data}) => {
      data.map(() => {
        player.accountBalance += data.amount;
      })
    });
  }

  useEffect(() => {
    startGameClock();
    player.gatherAllRecurringExpensesByFrequency();
    player.gatherAllRecurringIncomeByFrequency();
    deductExpenses();
    addIncome();
  }, )


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (<>
      <div className="flex items-center justify-center p-5 text-black">
        <span>Today's Date: {gameTime.currentDayOfTheMonth + " ("+ gameTime.weekdayName +") / " + gameTime.currentDayOfTheMonth + " " + "("+gameTime.monthName+") /" + gameTime.currentYear}</span>
      </div>
      <nav className="bg-gray-800 mb-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-16">
            <div className="flex justify-center items-center">
              <Link to="/game/overview" className="text-white hover:text-gray-400 px-4">Overview</Link>
              <Link to="/game/expenses" className="text-white hover:text-gray-400 px-4">Expenses</Link>
              <Link to="/game/incomes" className="text-white hover:text-gray-400 px-4">Incomes</Link>
              <Link to="/game/goals" className="text-white hover:text-gray-400 px-4">Goals</Link>
              <Link to="/game/recommendations" className="text-white hover:text-gray-400 px-4">Recommendations</Link>
            </div>
          </div>
        </div>
      </nav>
      {/* The RouterOutlet to render Overview and Expense components */}

    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <Outlet/>
      </div>
    </div>
    </>
  );
};

export default Game;
