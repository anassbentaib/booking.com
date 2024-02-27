package com.backend.bookingbackend.Cart;


import com.backend.bookingbackend.Listings.ListingEntity;
import com.backend.bookingbackend.RandomGUID;
import com.backend.bookingbackend.Users.user.UserEntity;
import jakarta.persistence.*;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Entity
@Table(name = "Cart")
public class CartEntity {
    @Id
    private String id;
    public CartEntity(){
        this.id = RandomGUID.getRandomGUID();
    }

    @Column(name = "user_id")
    private String userId;
    private List<String> images;

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    @Column(name = "listing_id")
    private String listingId;
    private String location;
    private String city;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setListingId(String listingId) {
        this.listingId = listingId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getListingId() {
        return listingId;
    }

    public String getUserId() {
        return userId;
    }
}
