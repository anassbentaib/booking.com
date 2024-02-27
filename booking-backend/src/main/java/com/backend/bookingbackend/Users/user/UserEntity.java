package com.backend.bookingbackend.Users.user;
import com.backend.bookingbackend.RandomGUID;
import com.backend.bookingbackend.reservation.ReservationEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    private String id;
    public UserEntity(){
        this.id= RandomGUID.getRandomGUID();
    }

    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    @Column(name = "Confirm_password")
    private String confirmPassword;
    private List<String> favoriteIds;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<ReservationEntity> reservations = new ArrayList<>();


    public List<String> getFavoriteIds() {
        return favoriteIds;
    }


    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword(String encode) {
        return confirmPassword;
    }
}
