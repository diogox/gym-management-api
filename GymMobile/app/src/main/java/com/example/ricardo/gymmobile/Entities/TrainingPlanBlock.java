package com.example.ricardo.gymmobile.Entities;

import com.example.ricardo.gymmobile.Entities.Enums.DayOfTheWeek;

/**
 * Classe que represenata um bloco de treino de um determinado plano de treino
 */
public class TrainingPlanBlock {

    /**
     * Número de identificação do bloco de treino
     */
    private long planId;
    /**
     * Número de identificação do exercicio associado ao bloco de treino
     */
    private long exerciseId;
    /**
     * Número de repetições do exercicio
     */
    private int numberOfRepetitions;
    /**
     * Número de séies do exercicio
     */
    private int numberOfSeries;
    /**
     * Dia da semana em que o bloco de treino é realizado
     */
    private DayOfTheWeek dayOfTheWeek;


    public TrainingPlanBlock(long planId, long exerciseId, int numberOfRepetitions, int numberOfSeries, DayOfTheWeek dayOfTheWeek) {
        this.planId              = planId;
        this.exerciseId          = exerciseId;
        this.numberOfRepetitions = numberOfRepetitions;
        this.numberOfSeries      = numberOfSeries;
        this.dayOfTheWeek        = dayOfTheWeek;
    }


    public long getPlanId() {
        return planId;
    }

    public long getExerciseId() {
        return exerciseId;
    }

    public int getNumberOfRepetitions() {
        return numberOfRepetitions;
    }

    public int getNumberOfSeries() {
        return numberOfSeries;
    }

    public DayOfTheWeek getDayOfTheWeek() {
        return dayOfTheWeek;
    }
}
