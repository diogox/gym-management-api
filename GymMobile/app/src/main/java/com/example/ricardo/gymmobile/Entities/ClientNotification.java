package com.example.ricardo.gymmobile.Entities;

import java.util.Date;

/**
 * Classe que representa uma notificação de um cliente
 */
public class ClientNotification {

    /**
     * Número de identificação da notificação
     */
    private long id;
    /**
     * Mensagem da notificação
     */
    private String message;
    /**
     * Data da notificação
     */
    private Date timestamp;
    /**
     * Sinalizar se a notificação já foi lida
     */
    private boolean isUnread;
    /**
     * Número de identificação do cliente a que está associada a notificação
     */
    private long clientId;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isUnread() {
        return isUnread;
    }

    public void setUnread(boolean unread) {
        isUnread = unread;
    }

    public long getClientId() {
        return clientId;
    }

    public void setClientId(long clientId) {
        this.clientId = clientId;
    }
}
