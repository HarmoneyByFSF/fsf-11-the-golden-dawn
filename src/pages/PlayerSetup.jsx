import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const PlayerSetup = () => {
  const { player } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState('profile');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [startingBalance, setStartingBalance] = useState(0);
  const [incomes, setIncomes] = useState(player.currentIncomes);
  const [expenses, setExpenses] = useState(player.currentExpenses);

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentPage === 'profile') {
      setCurrentPage('incomes');
    } else if (currentPage === 'incomes') {
      setCurrentPage('expenses');
    }
  };

  const handleFinish = () => {
    player.setName(name);
    player.setAge(Number(age));
    player.setStartingBalance(Number(startingBalance));
    player.setCurrentIncomes(incomes);
    player.setCurrentExpenses(expenses);
    // Perform any necessary actions after finishing player setup
    navigate("/game/overview");
  };

  const handleBack = () => {
    if (currentPage === 'incomes') {
      setCurrentPage('profile');
    } else if (currentPage === 'expenses') {
      setCurrentPage('incomes');
    }
  };

  const renderPlayerProfile = () => (
    <>
      <h2 className="mb-2">Player Profile</h2>
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered input-primary mb-2 w-full max-w-xs"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {/*<input*/}
      {/*  type="number"*/}
      {/*  placeholder="Age"*/}
      {/*  className="input input-bordered input-primary mb-2 w-full max-w-xs"*/}
      {/*  value={age}*/}
      {/*  onChange={(event) => setAge(parseInt(event.target.value, 10))}*/}
      {/*/>*/}
      {/*<input*/}
      {/*  type="number"*/}
      {/*  placeholder="Starting Balance"*/}
      {/*  className="input input-bordered input-primary mb-2 w-full max-w-xs"*/}
      {/*  value={startingBalance}*/}
      {/*  onChange={(event) => setStartingBalance(parseFloat(event.target.value))}*/}
      {/*/>*/}
    </>
  );

  const renderIncomes = () => (
    <>
      <h2 className="mb-2">Incomes Page</h2>
      {/* Render income page content */}
      {Object.keys(incomes).map((category) => (
        <div className="card w-full mb-2 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-actions justify-end">
              <div key={category}>
                <h3>{category}</h3>
                {incomes[category].map((income, index) => (
                  <div className="mb-1" key={index}>
                    <h4>Income {index + 1}</h4>
                    <input
                      type="text"
                      value={income.name}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) => handleIncomeInputChange(category, index, 'name', event.target.value)}
                    />
                    <input
                      type="number"
                      value={income.amount}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) =>
                        handleIncomeInputChange(category, index, 'amount', Number(event.target.value))
                      }
                    />
                    <select
                      value={income.frequency}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) =>
                        handleIncomeInputChange(category, index, 'frequency', event.target.value)
                      }
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    {/* Render additional fields for the income */}
                    {/* ... */}
                    <button className="btn btn-outline btn-error btn-sm" onClick={() => handleRemoveIncome(category, index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button className="btn btn-outline btn-success btn-sm  w-full" onClick={() => handleAddIncome(category)}>
                  Add Income
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* ... */}
    </>
  );

  const renderExpenses = () => (
    <>
      <h2 className="mb-2">Expenses Page</h2>
      {/* Render expenses page content */}
      {Object.keys(expenses).map((category) => (
        <div className="card w-full mb-2  bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-actions justify-end">
              <div key={category}>
                <h3>{category}</h3>
                {expenses[category].map((expense, index) => (
                  <div key={index}>
                    <h4>Expense {index + 1}</h4>
                    <input
                      type="text"
                      value={expense.name}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) => handleExpenseInputChange(category, index, 'name', event.target.value)}
                    />
                    <input
                      type="number"
                      value={expense.amount}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) =>
                        handleExpenseInputChange(category, index, 'amount', Number(event.target.value))
                      }
                    />
                    <select
                      value={expense.frequency}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) =>
                        handleExpenseInputChange(category, index, 'frequency', event.target.value)
                      }
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    {/* Render additional fields for the expense */}
                    <input
                      type="number"
                      value={expense[`${category}Points`]}
                      className="input input-bordered input-primary input-sm"
                      onChange={(event) =>
                        handleExpenseInputChange(category, index, `${category}Points`, Number(event.target.value))
                      }
                    />
                    <button className="btn btn-outline btn-error btn-sm" onClick={() => handleRemoveExpense(category, index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button className="btn btn-outline btn-success btn-sm w-full" onClick={() => handleAddExpense(category)}>
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const handleIncomeInputChange = (category, index, field, value) => {
    const updatedIncomes = { ...incomes };
    updatedIncomes[category][index][field] = value;
    setIncomes(updatedIncomes);
  };

  const handleAddIncome = (category) => {
    const updatedIncomes = { ...incomes };
    updatedIncomes[category].push({ name: '', amount: 0, frequency: 'daily' });
    setIncomes(updatedIncomes);
  };

  const handleRemoveIncome = (category, index) => {
    const updatedIncomes = { ...incomes };
    updatedIncomes[category].splice(index, 1);
    setIncomes(updatedIncomes);
  };

  const handleExpenseInputChange = (category, index, field, value) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = { ...prevExpenses };
      updatedExpenses[category][index][field] = value;
      return updatedExpenses;
    });
  };

  const handleAddExpense = (category) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: [
        ...prevExpenses[category],
        { name: '', amount: 0, frequency: 'daily', [`${category}Points`]: 0 },
      ],
    }));
  };

  const handleRemoveExpense = (category, index) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = { ...prevExpenses };
      updatedExpenses[category].splice(index, 1);
      return updatedExpenses;
    });
  };

  const renderPageContent = () => {
    if (currentPage === 'profile') {
      return renderPlayerProfile();
    } else if (currentPage === 'incomes') {
      return renderIncomes();
    } else if (currentPage === 'expenses') {
      return renderExpenses();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        {renderPageContent()}
        <div className="mb-2">
          <button
            className="btn btn-outline btn-primary mr-2"
            onClick={handleBack}
            disabled={currentPage === 'profile'}
          >
            Back
          </button>
          {currentPage !== 'expenses' && (
            <button
              className="btn btn-outline btn-primary"
              onClick={handleNext}
              disabled={!name && !(!age && (age!==0)) && !(!startingBalance && (startingBalance!==0)) && currentPage === 'profile'}
            >
              Next
            </button>
          )}
          {currentPage === 'expenses' && (
            <button
              className="btn btn-outline btn-primary"
              onClick={handleFinish}
              disabled={!name}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;
