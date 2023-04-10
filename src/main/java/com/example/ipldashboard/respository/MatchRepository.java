package com.example.ipldashboard.respository;

import com.example.ipldashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match,String> {

    List<Match> getMatchesByTeam1OrTeam2OrderByDateDesc(String team1, String team2, Pageable pageable);


    default List<Match> getLatestMatchByTeamName(String teamName,int noOfMatches){
        return getMatchesByTeam1OrTeam2OrderByDateDesc(teamName,teamName, PageRequest.of(0,noOfMatches));
    }
}
