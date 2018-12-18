package com.example.ricardo.gymmobile.Entities;

import java.util.List;

/**
 * Classe que representa um plano de treino
 */
public class WorkPlan {

    /**
     * Número de identificação do plano de treino
     */
    private long id;
    /**
     * Nome do plano de treino
     */
    private String name;
    /**
     * Lista de blocos de treino
     */
    public List<TrainingPlanBlock> exerciseBlocks;
    /**
     * Número de identificação do supervisionador do plano de treino
     */
    public long supervisingTrainerId;


    public WorkPlan(long id, String name, List<TrainingPlanBlock> exerciseBlocks, long supervisingTrainerId) {
        this.id                   = id;
        this.name                 = name;
        this.exerciseBlocks       = exerciseBlocks;
        this.supervisingTrainerId = supervisingTrainerId;
    }


    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<TrainingPlanBlock> getExerciseBlocks() {
        return exerciseBlocks;
    }

    public long getSupervisingTrainerId() {
        return supervisingTrainerId;
    }

    @Override
    public String toString() {
        return "WorkPlan{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", exerciseBlocks=" + exerciseBlocks +
                ", supervisingTrainerId=" + supervisingTrainerId +
                '}';
    }
}
