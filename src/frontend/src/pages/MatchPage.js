import {React, useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { useParams } from 'react-router-dom';


export const MatchPage = () => {

  const [matches,setMatches] = useState([]);

  const { teamName , year} = useParams();

  useEffect(
    () => {
      //the function passed the useEffect doesn't accept async methods, so we need to create a new function and call it
      const fetchMatches = async() =>{
        const response  = await fetch(`http://localhost:8080/teams/${teamName}/matches?year=${year}`);
        const data = await response.json();
        setMatches(data);
      };
      fetchMatches();
    }, [teamName,year]
  );
  return (
    <div className='MatchPage'>
      <h1>MatchPage</h1>
      {matches.map(match => <MatchDetailCard teamName={teamName} match={match} />)}
    </div>
  );
}
