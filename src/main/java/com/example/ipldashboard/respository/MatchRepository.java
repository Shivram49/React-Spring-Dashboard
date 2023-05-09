package com.example.ipldashboard.respository;

import com.example.ipldashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match,String> {

    List<Match> getMatchesByTeam1OrTeam2OrderByDateDesc(String team1, String team2, Pageable pageable);

    List<Match> getMatchesByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String team1, LocalDate date1,LocalDate date2, String team2,LocalDate date3,LocalDate date4,Pageable pageable);

    @Query("select m from Match m where (m.team1 = :team1 or m.team2 = :team2) and m.date between :startDate and :endDate order by m.date desc ")
    List<Match> getMatchesByYear(@Param("team1") String team1,@Param("team2")  String team2,@Param("startDate")  LocalDate startDate,@Param("endDate")  LocalDate endDate);

    default List<Match> getLatestMatchByTeamName(String teamName,int noOfMatches){
        return getMatchesByTeam1OrTeam2OrderByDateDesc(teamName,teamName, PageRequest.of(0,noOfMatches));
    }

    default List<Match> getAllMatchesByYear(String teamName,LocalDate startDate, LocalDate endDate,int noOfMatches){
        return getMatchesByYear(teamName,teamName, startDate,endDate);
    }
}
