package com.example.ricardo.gymmobile.Entities;

import java.util.Date;

/**
 * Classe que representa um check-in de um cliente
 */
public class ClientCheckIn {

    /**
     * Número de identificação do check-in
     */
    private long id;
    /**
     * Data do check-in
     */
    private Date at;
    /**
     * Número de identificação do cliente que está asociado o check-in
     */
    private long ClientId;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAt() {
        return at;
    }

    public void setAt(Date at) {
        this.at = at;
    }

    public long getClientId() {
        return ClientId;
    }

    public void setClientId(long clientId) {
        ClientId = clientId;
    }
}
