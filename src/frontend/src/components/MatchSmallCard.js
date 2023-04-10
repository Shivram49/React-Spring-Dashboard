import {React} from 'react';
import {Link} from 'react-router-dom';
 
// exporting a function that returns a React component and enfores the name of the component
//export default , we can call any name and the default export will be used
export const MatchSmallCard = ({teamName, match}) => {
  if(!match) return null;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`;
  return (
    <div className='MatchSmallCard'>
      <h3> vs <Link to = {otherTeamRoute}>{otherTeam}</Link> </h3>
      <p>{match.matchWinner} won by {match.resultMargin}</p>

    </div>
  );
}
