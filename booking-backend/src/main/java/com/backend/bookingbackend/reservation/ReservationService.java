package com.backend.bookingbackend.reservation;


import com.backend.bookingbackend.Listings.ListingEntity;
import com.backend.bookingbackend.Listings.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private  ReservationRepository reservationRepository;
    @Autowired
    private ListingRepository listingRepository;
    public ReservationEntity createReservation(ReservationEntity reservationEntity) {
        return reservationRepository.save(reservationEntity);

    }

    public List<ReservationEntity> getAllReservations() {
       List<ReservationEntity> reservationEntityList =  reservationRepository.findAll();
       return reservationEntityList;
    }

    public List<ReservationEntity> getAllReservationsByListingId(String listingId) {
        List<ReservationEntity> reservationEntityList =  reservationRepository.findByListingId(listingId);
        return reservationEntityList;
    }

    public List<ReservationEntity> getAllReservationsByUserId(String userId) {

        List<ReservationEntity> reservationEntityList =  reservationRepository.findByUserId(userId);

        for (ReservationEntity reservationEntity : reservationEntityList) {
           Optional<ListingEntity> listing = listingRepository.findById(reservationEntity.getListingId());
            listing.ifPresent(listingEntity -> {
                reservationEntity.setCity(listing.get().getCity());
                reservationEntity.setLocation(listing.get().getLocation());
                reservationEntity.setImages(listing.get().getImageSrc());
                reservationRepository.save(reservationEntity);
            });        }

        return reservationEntityList;
    }


    public ResponseEntity<String> deleteReservation(String id) {
            Optional<ReservationEntity> reservation = reservationRepository.findById(id);


        if (reservation.isPresent()) {
            reservationRepository.deleteById(id);
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }
    }
}
