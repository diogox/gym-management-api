package com.example.ricardo.gymmobile.Entities;

public class Equipment {

    /**
     * Número identificador do equipamento
     */
    private long id;
    /**
     * Nome do equipamento
     */
    private String name;
    /**
     * Marca do equipamento
     */
    private String brandName;
    /**
     * URL que inica a imagem do equipamento
     */
    private String imageUrl;
    /**
     * Quantidade total do equipamento
     */
    private int quantity;
    /**
     * Preço em euros do equipamento
     */
    private float priceInEuro;
    /**
     * Nome do fornecedor do equipamento
     */
    private String supplierName;
    /**
     * Descrição do equipamento
     */
    private String description;


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

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getPriceInEuro() {
        return priceInEuro;
    }

    public void setPriceInEuro(float priceInEuro) {
        this.priceInEuro = priceInEuro;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
