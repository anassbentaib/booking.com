package com.backend.bookingbackend.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<ReservationEntity , String> {
    List<ReservationEntity> findByListingId(String listingId);

    List<ReservationEntity> findByUserId(String userId);
    Optional<ReservationEntity> findById(String id);
}
