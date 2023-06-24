import React, { useContext } from 'react';
import { GameClockContext } from './GameClock';

const CustomComponent1 = () => {
    // const { gameTime, setAlarm, setEvent } = useContext(GameClockContext);
    const { gameTime } = useContext(GameClockContext);

    // Use gameTime, setAlarm, setEvent as needed

    // addYearlyEvent('CustomComponent1 Yearly Event 1', { value: 243 }, ({ value }) => {
    //     console.log('CustomComponent1 ' + value);
    // });

    return <div></div>;
};

export default CustomComponent1;
