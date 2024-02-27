package com.backend.bookingbackend.Listings;

import com.backend.bookingbackend.Partner.PartnerRepository;
import com.backend.bookingbackend.reservation.ReservationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service

public class ListingService {
    private static ListingRepository listingRepository;
    private static PartnerRepository partnerRepository;


    @Autowired
    public ListingService(ListingRepository listingRepository,PartnerRepository partnerRepository) {
        this.listingRepository = listingRepository;
        this.partnerRepository = partnerRepository;
    }

    public static ResponseEntity<String> addListings(ListingEntity listing) {
        try {
            ListingEntity listingEntity = listingRepository.save(listing);
                return new ResponseEntity<>("success", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("INTERNAL ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ListingEntity>> getAllMovies() {
        try {
            return new ResponseEntity<>(listingRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public List<ListingEntity> getListingsByCityName(String city) {
        try {
            List<ListingEntity> listings = listingRepository.findByCity(city);
            return  listings;
        } catch (Exception e) {
            // Log the exception or handle it appropriately
            throw new RuntimeException("Internal Server Error", e);
        }

    }

    public ListingEntity getListingByListingId(String listingId) {
        try {
            Optional<ListingEntity> listingOptional = listingRepository.findById(listingId);

            if (listingOptional.isPresent()) {
                return listingOptional.get();
            } else {
                throw new NoSuchFieldException("Listing not found with id: " + listingId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Internal Server Error", e);
        }
    }

    public List<ListingEntity> getListingsByType(String type) {
        try {
            List<ListingEntity> listings = listingRepository.findByType(type);
            return  listings;
        } catch (Exception e) {
            throw new RuntimeException("Internal Server Error", e);
        }
    }

    public List<ListingEntity> getListingsByCategory(String category) {
        try {
            List<ListingEntity> listings = listingRepository.findByCategory(category);
            return  listings;
        } catch (Exception e) {
            throw new RuntimeException("Internal Server Error", e);
        }
    }

    public List<ListingEntity> getListingsByLocation(String location) {
        try {
            List<ListingEntity> listings = listingRepository.findByLocation(location);
            return  listings;
        } catch (Exception e) {
            throw new RuntimeException("Internal Server Error", e);
        }
    }

    public List<ListingEntity> findBySearchParams(
             Integer roomCount,
            Integer guestCount,
          Integer bathroomCount,
        String location
    ) {

        return
                listingRepository.findBySearchParams(roomCount,guestCount, bathroomCount, location);
    }


    public List<ListingEntity> getListingByUserId(String userId) {
        try {
            List<ListingEntity> listingEntities = listingRepository.findByUserId(userId);

            if (!listingEntities.isEmpty()) {
                return listingEntities;
            } else {
                throw new NoSuchMethodException("Listing not found with user id: " + userId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Internal Server Error", e);
        }
    }

    public ResponseEntity<String> deleteListing(String id) {
            Optional<ListingEntity> listing= listingRepository.findById(id);


            if (listing.isPresent()) {
                listingRepository.deleteById(id);
                return new ResponseEntity<>("deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);

        }
    }
}
