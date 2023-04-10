import {React} from 'react';

// exporting a function that returns a React component and enfores the name of the component
//export default , we can call any name and the default export will be used
export const MatchDetailCard = ({match}) => {
  if(!match) return null;
    return (
    <div className='MatchDetailCard'>
      <h4>{match.team1} vs {match.team2}</h4>
    </div>
  );
}
