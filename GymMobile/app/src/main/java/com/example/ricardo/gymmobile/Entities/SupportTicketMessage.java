package com.example.ricardo.gymmobile.Entities;

import com.example.ricardo.gymmobile.Entities.Enums.SupportTicketMessageSender;

import java.util.Date;

/**
 * Classe que representa uma mensagem de um ticket de suporte
 */
public class SupportTicketMessage {

    /**
     * Número de identificação da mensagem
     */
    private long id;
    /**
     * Mensagem
     */
    private String message;
    /**
     * Data de criação da mensagem
     */
    private Date at;
    /**
     * <TALVEZ SEJA ALTERADO>
     */
    private long fromClientId;
    private long fromStaffId;
    /**
     * Número de identificação de ticket de suporte a que
     * a mensagem está associada
     */
    private long supportTicketId;
    /**
     * Entidade que enviou a mensagem
     */
    private SupportTicketMessageSender from;


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

    public Date getAt() {
        return at;
    }

    public void setAt(Date at) {
        this.at = at;
    }

    public long getFromClientId() {
        return fromClientId;
    }

    public void setFromClientId(long fromClientId) {
        this.fromClientId = fromClientId;
    }

    public long getFromStaffId() {
        return fromStaffId;
    }

    public void setFromStaffId(long fromStaffId) {
        this.fromStaffId = fromStaffId;
    }

    public long getSupportTicketId() {
        return supportTicketId;
    }

    public void setSupportTicketId(long supportTicketId) {
        this.supportTicketId = supportTicketId;
    }

    public SupportTicketMessageSender getFrom() {
        return from;
    }

    public void setFrom(SupportTicketMessageSender from) {
        this.from = from;
    }
}
