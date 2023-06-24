import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

const Incomes = () => {
  const { player } = useContext(AppContext);

  useEffect(() => {
    console.log(player?.dailyRecurringIncomes?.length);
  }, []);

  if (!player) {
    return null; // Render null or a loading state if player is not defined
  }

  return (
    <>
      <div className="card bg-white">
        <div className="card-body flex justify-center">
          <h1>Daily Recurring Incomes</h1>
          <div>
            {player.dailyRecurringIncomes?.map((income, index) => (
              <div key={index}>
                <p className="text-sm">
                  Name: {income.name} - <strong>MUR {income.amount}</strong>
                </p>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={player.dailyRecurringIncomes}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                name="Recurring Daily Incomes"
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card bg-white">
        <div className="card-body flex justify-center">
          <h1>Recurring Weekly Incomes</h1>
          <div>
            {player.weeklyRecurringIncomes?.map((income, index) => (
              <div key={index}>
                <p className="text-sm">
                  Name: {income.name} - <strong>MUR {income.amount}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card bg-white">
        <div className="card-body flex justify-center">
          <h1>Recurring Monthly Incomes</h1>
          <div>
            {player.monthlyRecurringIncomes?.map((income, index) => (
              <div key={index}>
                <p className="text-sm">
                  Name: {income.name} - <strong>MUR {income.amount}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card bg-white">
        <div className="card-body flex justify-center">
          <h1>Recurring Yearly Incomes</h1>
          <div>
            {player.yearlyRecurringIncomes?.map((income, index) => (
              <div key={index}>
                <p className="text-sm">
                  Name: {income.name} - <strong>MUR {income.amount}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Incomes;
