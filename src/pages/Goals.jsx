import React, {useContext} from 'react';
import {AppContext} from "../App";

const Goals = () => {
  const { player } = useContext(AppContext);

  return (<>
    <div className="card bg-white">
      <div className="card-body flex justify-center">
        Goals {player.name}
      </div>
    </div>
  </>);
};

export default Goals;
