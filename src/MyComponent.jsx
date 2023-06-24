import { useContext } from 'react';
import { GameClockContext } from './GameClock';

const MyComponent = () => {
  const { addDailyEvent, addWeeklyEvent, addMonthlyEvent, addYearlyEvent } = useContext(
    GameClockContext
  );

  const handleDailyEvent = () => {
    console.log('Daily event triggered');
  };

  const handleWeeklyEvent = () => {
    console.log('Weekly event triggered');
  };

  const handleMonthlyEvent = (payload) => {
    console.log('Monthly event triggered with payload:', payload);
  };

  const handleYearlyEvent = (payload) => {
    console.log('Yearly event triggered with payload:', payload);
  };

  const addEvents = () => {
    addDailyEvent('Daily Event', null, handleDailyEvent);
    addWeeklyEvent('Daily Event', null, handleWeeklyEvent);
    addMonthlyEvent('Monthly Event', { data: 'example' }, handleMonthlyEvent);
    addYearlyEvent('Yearly Event', { value: 123 }, handleYearlyEvent);
  };

  return (
    <div>
      <button onClick={addEvents}>Add Events (MyComponent)</button>
    </div>
  );
};

export default MyComponent;
