import React, { useContext, useEffect, useState } from 'react';
import {AppContext} from "../App";
import axios from 'axios';

const Recommendations = () => {
  const { player } = useContext(AppContext);

  const [response, setResponse] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [expensesMsgPrompt, setExpensesMsgPrompt] = useState('');
  const [incomeMsgPrompt, setIncomeMsgPrompt] = useState('');

  useEffect(() => {
    setResponseMessage(response)
  }, [response]);


  useEffect(() => {
      let expensesMsg = "how can I cut down cost? with;";

      player.dailyRecurringExpenses.map(expense => {
        expensesMsg += "daily expenses of";
        expensesMsg += `${expense.amount} (${expense.amount})`;
      })
      player.weeklyRecurringExpenses.map(expense => {
        expensesMsg += "weekly expenses of";
        expensesMsg += `${expense.amount} (${expense.amount})`;
      })
      player.weeklyRecurringExpenses.map(expense => {
        expensesMsg += "monthly expenses of";
        expensesMsg += `${expense.amount} (${expense.amount})`;
      })
      player.weeklyRecurringExpenses.map(expense => {
        expensesMsg += "yearly expenses of";
        expensesMsg += `${expense.amount} (${expense.amount})`;
      })

    setExpensesMsgPrompt(expensesMsg);
    let incomeMsg = "how can I save more with;";

    player.dailyRecurringExpenses.map(expense => {
      incomeMsg += "daily come of";
      incomeMsg += `${expense.amount} (${expense.amount})`;
    })
    player.weeklyRecurringExpenses.map(expense => {
      incomeMsg += "weekly income of";
      incomeMsg += `${expense.amount} (${expense.amount})`;
    })
    player.weeklyRecurringExpenses.map(expense => {
      incomeMsg += "monthly income of";
      incomeMsg += `${expense.amount} (${expense.amount})`;
    })
    player.weeklyRecurringExpenses.map(expense => {
      incomeMsg += "yearly income of";
      incomeMsg += `${expense.amount} (${expense.amount})`;
    })
    setIncomeMsgPrompt(incomeMsg)
    },[]);


  const getResponse = async (prompt) => {
    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 1,
        n: 3,
        stop: '\n',
        model: 'gpt-3.5-turbo',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
      });

      const responseData = res.data.choices[0].message.content.trim();
      setResponse(responseData);
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

  const handleIncreaseSavings = () => {
    const prompt = 'How can I increase my savings?';
    getResponse(incomeMsgPrompt);
  };

  const handleCutDownExpenses = () => {
    const prompt = 'What are some ways to cut down expenses?';
    getResponse(expensesMsgPrompt);
  };

  return (<>
    <div className="card bg-white">
      <div className="card-body flex justify-center">
        <button className="btn btn-primary" onClick={handleIncreaseSavings}>Increase Savings</button>
        <button className="btn btn-primary" onClick={handleCutDownExpenses}>Cut Down Expenses</button>
      </div>
    </div>
    <div className="card bg-white">
      <div className="card-body flex justify-center">
        <h1>Recommendations</h1>
        <p>{responseMessage}</p>
      </div>
    </div>
  </>);
};

export default Recommendations;
