package com.backend.bookingbackend.Listings;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
public class ListingsControllers {
    @Autowired
    private ListingService listingService;


    @PostMapping("/create-listing")
    public ResponseEntity<String> createListing(@RequestBody ListingEntity listing) {
        return ListingService.addListings(listing);
    }

    @GetMapping("/get-listings")
    public ResponseEntity<List<ListingEntity>> getAllListings() {

        return listingService.getAllMovies();
    }

    @GetMapping("/get-listing/city-name")
    public ResponseEntity<List<ListingEntity>> getListingsByCityName(@RequestParam String city) {
        try {
            List<ListingEntity> listings = listingService.getListingsByCityName(city);
            return new ResponseEntity<>(listings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-listing/{listingId}")
    public ResponseEntity<ListingEntity> getListingById(@PathVariable String listingId) {
        try {
            ListingEntity listing = listingService.getListingByListingId(listingId);
            return new ResponseEntity<>(listing, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-listing/by-user/{userId}")
    public ResponseEntity<List<ListingEntity>> getListingByUserId(@PathVariable String userId) {
        try {
            List<ListingEntity> listing = listingService.getListingByUserId(userId);
            return new ResponseEntity<>(listing, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-listing/by-type")
    public ResponseEntity<List<ListingEntity>> getListingsByType(@RequestParam String type) {
        try {
            List<ListingEntity> listings = listingService.getListingsByType(type);
            return new ResponseEntity<>(listings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-listing/by-category")
    public ResponseEntity<List<ListingEntity>> getListingsByCategory(@RequestParam String category) {
        try {
            List<ListingEntity> listings = listingService.getListingsByCategory(category);
            return new ResponseEntity<>(listings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/get-listing/by-location")
    public ResponseEntity<List<ListingEntity>> getListingsByLocation(@RequestParam String location) {
        try {
            List<ListingEntity> listings = listingService.getListingsByLocation(location);
            return new ResponseEntity<>(listings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/listings/get-by-query")
    public ResponseEntity<List<ListingEntity>> searchPosts(
            @RequestParam(required = false) Integer bathroomCount,

//            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Integer guestCount,
            @RequestParam(required = false) String location,

            @RequestParam(required = false) Integer roomCount

    ) {


        try {
            List<ListingEntity> listings = listingService.findBySearchParams(roomCount, guestCount, bathroomCount, location);

            return new ResponseEntity<>(listings, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }

        }

    @DeleteMapping("/listings/delete-listing/{id}")
    public ResponseEntity<String> deleteListing(@PathVariable String id) {
        return  listingService.deleteListing(id);
    }
}
