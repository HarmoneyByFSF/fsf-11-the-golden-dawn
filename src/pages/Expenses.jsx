import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const Expenses = () => {

  const { player } = useContext(AppContext);

  useEffect(() => {
    // console.log(player.dailyRecurringExpenses.length);
  }, []);


  return (<>
    <div className="card bg-white">
      <div className="card-body flex justify-center">
        <h1>Daily Recurring Expenses</h1>
        <div>
          {player.dailyRecurringExpenses.map((expense, index) => (
            <div key={index}>
              <p className="text-sm">Name: {expense.name} - <strong>MUR {expense.amount}</strong></p>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={player.dailyRecurringExpenses}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Recurring Daily Expenses" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
      <div className="card bg-white">
      <div className="card-body flex justify-center">
        <h1>Recurring Daily Expenses</h1>
        <div>
          {player.weeklyRecurringExpenses.map((expense, index) => (
            <div key={index}>
              <p className="text-sm">Name: {expense.name} - <strong>MUR {expense.amount}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
      <div className="card bg-white">
      <div className="card-body flex justify-center">
        <h1>Recurring Monthly Expenses</h1>
        <div>
          {player.monthlyRecurringExpenses.map((expense, index) => (
            <div key={index}>
              <p className="text-sm">Name: {expense.name} - <strong>MUR {expense.amount}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
      <div className="card bg-white">
      <div className="card-body flex justify-center">
        <h1>Recurring Yearly Expenses</h1>
        <div>
          {player.yearlyRecurringExpenses.map((expense, index) => (
            <div key={index}>
              <p className="text-sm">Name: {expense.name} - <strong>MUR {expense.amount}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Expenses;
