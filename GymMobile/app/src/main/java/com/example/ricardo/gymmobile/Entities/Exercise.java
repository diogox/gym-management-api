package com.example.ricardo.gymmobile.Entities;

import com.example.ricardo.gymmobile.Entities.Enums.DifficultyLevels;
import com.example.ricardo.gymmobile.Entities.Enums.MuscleGroups;

import java.util.List;

/**
 * Classe que representa um exercicio de treino
 */
public class Exercise {

    /**
     * Número de identificação do exercicio
     */
    private long id;
    /**
     * Nome do exercicio
     */
    private String name;
    /**
     * Descrição do exercicio
     */
    private String description;
    /**
     * Url da imagem do exercicio
     */
    private String imageUrl;
    /**
     * Musculo alvo do exercicio
     */
    private MuscleGroups targetMuscleGroup;
    /**
     * Nível de dificuldade do exercicio
     */
    private DifficultyLevels difficultyLevel;
    /**
     * Número de identificação do equipamento que o exercicio utiliza
     */
    private Long equipmentId;


    public Exercise(long id, String name, String description, String imageUrl, MuscleGroups targetMuscleGroup, DifficultyLevels difficultyLevel, Long equipmentId) {
        this.id                = id;
        this.name              = name;
        this.description       = description;
        this.imageUrl          = imageUrl;
        this.targetMuscleGroup = targetMuscleGroup;
        this.difficultyLevel   = difficultyLevel;
        this.equipmentId       = equipmentId;
    }


    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public MuscleGroups getTargetMuscleGroup() {
        return targetMuscleGroup;
    }

    public DifficultyLevels getDifficultyLevel() {
        return difficultyLevel;
    }

    public Long getEquipmentId() {
        return equipmentId;
    }
}