package com.example.ricardo.gymmobile.Entities;

/**
 * Representa um equipamento do ginásio
 */
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


    public Equipment(long id, String name, String brandName, String imageUrl, int quantity,
                     float priceInEuro, String supplierName, String description) {
        this.id           = id;
        this.name         = name;
        this.brandName    = brandName;
        this.imageUrl     = imageUrl;
        this.quantity     = quantity;
        this.priceInEuro  = priceInEuro;
        this.supplierName = supplierName;
        this.description  = description;
    }


    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBrandName() {
        return brandName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public float getPriceInEuro() {
        return priceInEuro;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public String getDescription() {
        return description;
    }
}
