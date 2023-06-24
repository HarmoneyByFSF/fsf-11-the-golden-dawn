import React, { createContext, useState } from 'react';
import { GameClockProvider } from './GameClock';
// import MyComponent from './MyComponent';
// import CustomComponent from './CustomComponent';
// import CustomComponent1 from './CustomComponent1';
import Start from './pages/Start';

import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Game from './Game';
import Overview from './pages/Overview';
import Expenses from './pages/Expenses';
import PlayerSetup from './pages/PlayerSetup';
import Recommendations from './pages/Recommendations';
import Goals from './pages/Goals';
import Incomes from './pages/Incomes';
import {
    EntertainmentExpense,
    FoodExpense,
    HealthExpense,
    HousingExpense,
    PersonalCareExpense,
    TransportationExpense,
} from './types/expense-types';

interface Player {
    name: string;
    age: number;
    life: {
        happiness: number;
        // education: number;
        lifeSatisfaction: number;
        satiety: number;
        pleasure: number;
        health: number;
        stress: number;
    };
    setStartingBalance: (value: number) => void;
    job: {
        role: string;
        level: string;
        monthlySalary: number;
        allowances: number;
    };
    setName: (value: string) => void;
    setAge: (value: number) => void;
    accountBalance: number;
    totalExpensesFunds: number;
    currentIncomes: {
        primary: Income[];
        other: Income[];
    };
    currentExpenses: {
        housing: HousingExpense[];
        transportation: TransportationExpense[];
        health: HealthExpense[];
        food: FoodExpense[];
        // personalCare: PersonalCareExpense[];
        entertainment: EntertainmentExpense[];
    };
    setCurrentIncomes: (incomes: { primary: Income[]; other: Income[] }) => void;
    setCurrentExpenses: (expenses: {
        housing: HousingExpense[];
        transportation: TransportationExpense[];
        health: HealthExpense[];
        food: FoodExpense[];
        // personalCare: PersonalCareExpense[];
        entertainment: EntertainmentExpense[];
    }) => void;
    dailyRecurringExpenses: [];
    weeklyRecurringExpenses: [];
    monthlyRecurringExpenses: [];
    yearlyRecurringExpenses:[];
    gatherAllRecurringExpensesByFrequency: () => void;
    dailyRecurringIncome: [],
    weeklyRecurringIncome: [],
    monthlyRecurringIncome: [],
    yearlyRecurringIncome: [],
    gatherAllRecurringIncomeByFrequency: () => void;
}

interface Income {
    name: string;
    amount: number;
}

interface AppContextProps {
    player: Player;
}

// Default player data
const defaultPlayer: Player = {
    name: '',
    age: 0,
    life: {
        happiness: 55,
        // education: 90,
        lifeSatisfaction: 60,
        satiety: 55,
        pleasure: 60,
        health: 40,
        stress: 10,
    },
    job: {
        role: '',
        level: '',
        monthlySalary: 0,
        allowances: 0,
    },
    setName: (value) => {defaultPlayer.name = value},
    setStartingBalance: function(value) {
        console.log('setStartingBalance')
        this.accountBalance = value;
    },
    setAge: function(value) {
        console.log('setAge')
        this.age = value;
    },
    accountBalance: 10000,
    totalExpensesFunds: 419,
    currentIncomes: {
        primary: [],
        other: [],
    },
    currentExpenses: {
        housing: [],
        transportation: [],
        health: [],
        food: [],
        // personalCare: [],
        entertainment: [],
    },
    setCurrentIncomes: (incomes) => {
        defaultPlayer.currentIncomes = incomes;
    },
    setCurrentExpenses: (expenses) => {
        defaultPlayer.currentExpenses = expenses;
    },
    dailyRecurringExpenses: [],
    weeklyRecurringExpenses: [],
    monthlyRecurringExpenses: [],
    yearlyRecurringExpenses: [],
    gatherAllRecurringExpensesByFrequency: function() {
        for (const expenseCategory in defaultPlayer.currentExpenses) {
            // @ts-ignore
            for (const expense of defaultPlayer.currentExpenses[expenseCategory]) {
                if (expense.frequency === 'daily') {
                    // @ts-ignore
                    defaultPlayer.dailyRecurringExpenses.push(expense);
                } else if (expense.frequency === 'weekly') {
                    // @ts-ignore
                    defaultPlayer.weeklyRecurringExpenses.push(expense);
                } else if (expense.frequency === 'monthly') {
                    // @ts-ignore
                    defaultPlayer.monthlyRecurringExpenses.push(expense);
                } else if (expense.frequency === 'yearly') {
                    // @ts-ignore
                    defaultPlayer.yearlyRecurringExpenses.push(expense);
                }
            }
        }
    },
    dailyRecurringIncome: [],
    weeklyRecurringIncome: [],
    monthlyRecurringIncome: [],
    yearlyRecurringIncome: [],
    gatherAllRecurringIncomeByFrequency: function() {
        for (const incomeCategory in defaultPlayer.currentIncomes) {
            // @ts-ignore
            for (const income of defaultPlayer.currentIncomes[incomeCategory]) {
                if (income.frequency === 'daily') {
                    // @ts-ignore
                    defaultPlayer.dailyRecurringIncome.push(income);
                } else if (income.frequency === 'weekly') {
                    // @ts-ignore
                    defaultPlayer.weeklyRecurringIncome.push(income);
                } else if (income.frequency === 'monthly') {
                    // @ts-ignore
                    defaultPlayer.monthlyRecurringIncome.push(income);
                } else if (income.frequency === 'yearly') {
                    // @ts-ignore
                    defaultPlayer.yearlyRecurringIncome.push(income);
                }
            }
        }
    },

};

const AppContext = createContext<AppContextProps>({
    player: defaultPlayer,
});

const App = () => {
    const [player, setPlayer] = useState<Player>(defaultPlayer);

    const setName = (value: string) => {
        setPlayer((prevPlayer) => ({ ...prevPlayer, name: value }));
    };

    const appContextValue: AppContextProps = {
        player: {
            ...player,
            setName: setName,
        },
    };

    return (
        <GameClockProvider>
            <div className="bg-gray-200"></div>
            <AppContext.Provider value={appContextValue}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path="/player-setup" element={<PlayerSetup />} />
                        <Route path="/game" element={<Game />} >
                            <Route index path="overview" element={<Overview />} />
                            <Route path="expenses" element={<Expenses />} />
                            <Route path="incomes" element={<Incomes />} />
                            <Route path="goals" element={<Goals />} />
                            <Route path="recommendations" element={<Recommendations />} />
                        </Route>
                    </Routes>
                </HashRouter>
            </AppContext.Provider>
        </GameClockProvider>
    );
};

export { App, AppContext };
