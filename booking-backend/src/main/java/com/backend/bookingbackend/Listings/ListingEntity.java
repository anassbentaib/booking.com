package com.backend.bookingbackend.Listings;

import com.backend.bookingbackend.Partner.partner.PartnerEntity;
import com.backend.bookingbackend.RandomGUID;
import com.backend.bookingbackend.Users.user.UserEntity;
import com.backend.bookingbackend.reservation.ReservationEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@Table(name = "listings")
public class ListingEntity {
    @Id
    private String id;
    public  ListingEntity(){
        this.id = RandomGUID.getRandomGUID();
    }
    @JoinColumn(name = "user_id")
    private String userId;


    private Integer price;
    private List<String> imageSrc;

    private String propertyName;
    @Column(name = "property_description", length = 100000)
    private String propertyDescription;
    private Integer guestCount ;
    private Integer roomCount;
    private Integer bathroomCount;
    private String location;
    private String street;
    private String zipCode;
    private String city;
    private String category;
    private  String  property;
    private  String subProperty;
    private String kingBed;
    private String queenBed;
    private String twinBed;
    private String privateProperty;
    private Integer numberOfProperties;
    private String publicProperty;
    private String type;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
