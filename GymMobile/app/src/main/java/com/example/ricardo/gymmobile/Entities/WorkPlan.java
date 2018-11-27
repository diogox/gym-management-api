package com.example.ricardo.gymmobile.Entities;

import java.util.List;

/**
 * Classe que representa um plano de treino
 */
public class WorkPlan {

    /**
     * Número de identificação do plano de treino
     */
    public long id;
    /**
     * Nome do plano de treino
     */
    public String name;
    /**
     * Lista de blocos de treino
     */
    public List<TrainingPlanBlock> exerciseBlocks;
    /**
     * Número de identificação do supervisionador do plano de treino
     */
    public long supervisingTrainerId;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TrainingPlanBlock> getExerciseBlocks() {
        return exerciseBlocks;
    }

    public void setExerciseBlocks(List<TrainingPlanBlock> exerciseBlocks) {
        this.exerciseBlocks = exerciseBlocks;
    }

    public long getSupervisingTrainerId() {
        return supervisingTrainerId;
    }

    public void setSupervisingTrainerId(long supervisingTrainerId) {
        this.supervisingTrainerId = supervisingTrainerId;
    }

}
