package com.backend.bookingbackend.reservation;

import com.backend.bookingbackend.Listings.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ListingRepository listingRepository;
    @PostMapping("/reservation/create-reservation")
    public ResponseEntity<ReservationEntity> createReservation(@RequestBody ReservationDTO request) {
        ReservationEntity reservationEntity = new ReservationEntity();
        reservationEntity.setListingId(request.getListingId());
        reservationEntity.setUserId(request.getUserId());
        reservationEntity.setStartDate(request.getStartDate());
        reservationEntity.setEndDate(request.getEndDate());
        reservationEntity.setTotalPrice(request.getTotalPrice());
        ReservationEntity savedReservation = reservationService.createReservation(reservationEntity);

        return new ResponseEntity<>(savedReservation, HttpStatus.CREATED);
    }

    @GetMapping("/reservation/get-all-reservations/{listingId}")
    public ResponseEntity<List<ReservationEntity>> getAllReservationsByListingId(@PathVariable String listingId) {
        try {
            List<ReservationEntity> reservationEntities = reservationService.getAllReservationsByListingId(listingId);
            return new ResponseEntity<>(reservationEntities, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/reservation/get-reservations/{userId}")
    public ResponseEntity<List<ReservationEntity>> getAllReservationsByUserId(@PathVariable String userId) {
        try {
            List<ReservationEntity> reservationEntities =
                    reservationService.getAllReservationsByUserId(userId);

            return new ResponseEntity<>(reservationEntities, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/reservation/delete-reservation/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable String id) {
      return  reservationService.deleteReservation(id);
    }


}
