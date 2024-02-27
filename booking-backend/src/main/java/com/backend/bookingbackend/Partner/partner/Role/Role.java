package com.backend.bookingbackend.Partner.partner.Role;


import com.backend.bookingbackend.RandomGUID;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "roles")
public class Role {

    @Id
    private String id;
    public Role(){
        this.id = RandomGUID.getRandomGUID();
    }

    private String name ;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
