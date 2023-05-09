import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';

// exporting a function that returns a React component and enfores the name of the component
//export default , we can call any name and the default export will be used
export const HomePage = () => {
  
  const [teams, setTeams] = useState([]);

  const { teamName } = useParams();
  
  useEffect(
    () => {
      //the function passed the useEffect doesn't accept async methods, so we need to create a new function and call it
      const fetchTeam = async() =>{
        const response  = await fetch(`http://localhost:8080/team/`);
        const data = await response.json();
        setTeams(data);
      };
      fetchTeam();
    }, []
  );
  if(!teams) {
    return <h1>Team not found</h1>
  }
  return (
    <div className='HomePage'>
      <div className='header-section'>
        <h1 className='app-name'>Dashboard</h1>
      </div>
      <div className='team-grid'>
        {teams.map(team => <TeamTile teamName={team.teamName}/>)}   
     </div>
    </div>
  );
}
