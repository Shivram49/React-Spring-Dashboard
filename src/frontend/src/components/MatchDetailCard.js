import {React} from 'react';
import {Link} from 'react-router-dom';
import './MatchDetailCard.scss';


// exporting a function that returns a React component and enfores the name of the component
//export default , we can call any name and the default export will be used
export const MatchDetailCard = ({teamName,match}) => {
  if(!match) return null;
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1; 
  const otherTeamRoute = `/teams/${otherTeam}`;
  const isMatchWon = teamName === match.matchWinner;
    return (
    <div className= {isMatchWon? 'MatchDetailCard won-card': 'MatchDetailCard lost-card'}>
      <div> 
        <span className='vs'>vs</span>
        <h1> <Link to = {otherTeamRoute}>{otherTeam}</Link></h1>
        <h2 className='match-date'>{match.date}</h2>
        <h3 className='match-venue'>{match.venue}</h3>
        <h3 className='match-result'>{match.matchWinner} won by {match.resultMargin}</h3>
      </div>
        <div className='additional-detail'>
        <h3>first innings</h3>
        <p>{match.team1}</p>
        <h3>second innings</h3>
        <p>{match.team2}</p>
        <h3>Player of the Match</h3>
        <p>{match.playerOfMatch}</p>
        <h3>Umpires</h3>
        <p>{match.umpire1} & {match.umpire2}</p>
      </div>
    </div>
  );
}
