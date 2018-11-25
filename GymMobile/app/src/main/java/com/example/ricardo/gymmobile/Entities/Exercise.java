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
     * Lista de equipamentos que o exercicio utiliza
     */
    private List<Equipment> equipmentToUse;


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MuscleGroups getTargetMuscleGroup() {
        return targetMuscleGroup;
    }

    public void setTargetMuscleGroup(MuscleGroups targetMuscleGroup) {
        this.targetMuscleGroup = targetMuscleGroup;
    }

    public DifficultyLevels getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(DifficultyLevels difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public List<Equipment> getEquipmentToUse() {
        return equipmentToUse;
    }

    public void setEquipmentToUse(List<Equipment> equipmentToUse) {
        this.equipmentToUse = equipmentToUse;
    }
}