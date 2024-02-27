package com.backend.bookingbackend.Cart;

import com.backend.bookingbackend.Listings.ListingEntity;
import com.backend.bookingbackend.Users.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository<CartEntity , String> {
    Boolean existsByUserIdAndListingId(String userId, String listingId);

    Optional<CartEntity> findByListingId(String listingId);

    Optional<CartEntity> findById(String userId);

    List<CartEntity> findByUserId(String userId);

//    Optional<CartEntity> existsByListingId(String listingId);
////    List<CartEntity> findByUser(UserEntity user);
//    List<CartEntity> findByUserId(Long userId);


}
