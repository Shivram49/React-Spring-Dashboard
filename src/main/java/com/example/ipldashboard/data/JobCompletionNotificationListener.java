package com.example.ipldashboard.data;

import com.example.ipldashboard.model.Match;
import com.example.ipldashboard.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager em;

    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");
            Map<String, Team> teamData = new HashMap<>();

            em.createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .map(e -> new Team((String) e[0],(long) e[1]))
                    .forEach(team -> teamData.put(team.getTeamName(),team));

            em.createQuery("select m.team2, count(*) from Match m group by m.team2", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        if(teamData.containsKey((String) e[0])){
                            Team currTeam = teamData.get((String)e[0]);
                            currTeam.setTotalMatches(currTeam.getTotalMatches() + (long) e[1]);
                        }
                        else{
                            //if the team only plays in away
                            teamData.put((String) e[0],new Team((String) e[0],(long) e[1]));
                        }
                    });
            em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e ->{
                        String teamName = (String) e[0];
                        long countWins = (long) e[1];
                        Team currTeam = teamData.get(teamName);
                        if(currTeam != null)
                            currTeam.setTotalWins(countWins);
                    });
            teamData.values().forEach(team -> {em.persist(team);});
            teamData.values().forEach(team -> {System.out.println(team);});


        }
    }
}