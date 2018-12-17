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
     * Remetente e destinatário do da mensagem
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


    public SupportTicketMessage(long id, String message, Date at, long fromClientId, long fromStaffId, long supportTicketId, SupportTicketMessageSender from) {
        this.id              = id;
        this.message         = message;
        this.at              = at;
        this.fromClientId    = fromClientId;
        this.fromStaffId     = fromStaffId;
        this.supportTicketId = supportTicketId;
        this.from            = from;
    }

    public SupportTicketMessage(String message, long supportTicketId, SupportTicketMessageSender from) {
        this.message = message;
        this.supportTicketId = supportTicketId;
        this.from = from;
    }


    public long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Date getAt() {
        return at;
    }

    public long getFromClientId() {
        return fromClientId;
    }

    public long getFromStaffId() {
        return fromStaffId;
    }

    public long getSupportTicketId() {
        return supportTicketId;
    }

    public SupportTicketMessageSender getFrom() {
        return from;
    }
}
