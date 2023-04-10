import {React, useEffect, useState} from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

// exporting a function that returns a React component and enfores the name of the component
//export default , we can call any name and the default export will be used
export const TeamPage = () => {
  
  const [team, setTeam] = useState({matches: []});
  
  useEffect(
    () => {
      //the function passed the useEffect doesn't accept async methods, so we need to create a new function and call it
      const fetchMatches = async() =>{
        const response  = await fetch('http://localhost:8080/team/Delhi%20Daredevils');
        const data = await response.json();
        setTeam(data);
      };
      fetchMatches();
    }, []
  );

  return (
    <div className='TeamPage'>
      <h1>{team.teamName}</h1>
      <h3>Latest Matches</h3>
      <MatchDetailCard match = {team.matches[0]}/>
      {team.matches.slice(1).map(match => <MatchSmallCard match = {match}/>)}
    </div>
  );
}
