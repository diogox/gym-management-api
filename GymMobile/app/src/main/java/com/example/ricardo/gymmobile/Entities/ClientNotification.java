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
     * Titulo da notificação
     */
    private String title;
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

    public ClientNotification(long id, String title, String message, Date timestamp, boolean isUnread, long clientId) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.timestamp = timestamp;
        this.isUnread = isUnread;
        this.clientId = clientId;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public boolean isUnread() {
        return isUnread;
    }

    public long getClientId() {
        return clientId;
    }
}
