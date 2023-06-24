import React, { useContext } from 'react';
import { GameClockContext } from './GameClock';

const CustomComponent = () => {
    const { gameTime, addDailyEvent, addWeeklyEvent, addMonthlyEvent, addYearlyEvent } = useContext(
      GameClockContext
    );

    const addEvents = () => {
        addDailyEvent('Daily Event', null,  () => {
            console.log("CustomComponent Daily Event 1");
        });
        addWeeklyEvent('Daily Event', {}, ({ value }) => {
            console.log('CustomComponent Yearly Event 3 with value : ' + value);
        });
        addMonthlyEvent('Monthly Event', { name: 'Example', age: 99 }, ({ name, age }) => {
            console.log('CustomComponent Monthly Event 2 with Data: ' + name + " Age:" + age);
        });
        addYearlyEvent('Yearly Event', { amount: 300000 }, ({ amount }) => {
            console.log('CustomComponent Yearly Event 3 with value : ' + amount);
        });
    };

    return (
      <div>
          <button onClick={addEvents}>Add Events (CustomComponent)</button>
      </div>
    );
};

export default CustomComponent;
