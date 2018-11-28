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


    public long getPlanId() {
        return planId;
    }

    public void setPlanId(long planId) {
        this.planId = planId;
    }

    public long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public int getNumberOfRepetitions() {
        return numberOfRepetitions;
    }

    public void setNumberOfRepetitions(int numberOfRepetitions) {
        this.numberOfRepetitions = numberOfRepetitions;
    }

    public int getNumberOfSeries() {
        return numberOfSeries;
    }

    public void setNumberOfSeries(int numberOfSeries) {
        this.numberOfSeries = numberOfSeries;
    }

    public DayOfTheWeek getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public void setDayOfTheWeek(DayOfTheWeek dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

}
