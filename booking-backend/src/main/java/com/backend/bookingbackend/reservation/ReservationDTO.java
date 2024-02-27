package com.backend.bookingbackend.reservation;

import com.backend.bookingbackend.Listings.ListingEntity;
import com.backend.bookingbackend.Users.user.UserEntity;

import java.time.LocalDate;
import java.util.Date;

public class ReservationDTO {

    private String listingId;
    private String userId;
    private Date startDate;
    private Date endDate;
    private Integer totalPrice;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getListingId() {
        return listingId;
    }

    public void setListingId(String listingId) {
        this.listingId = listingId;
    }




    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


}
