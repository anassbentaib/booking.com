package com.backend.bookingbackend.Listings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface    ListingRepository  extends JpaRepository<ListingEntity , String> {
    List<ListingEntity> findByCity(String city);

    List<ListingEntity> findByType(String type);

    List<ListingEntity> findByCategory(String category);

    List<ListingEntity> findByLocation(String location);
    @Query(
            value = "SELECT DISTINCT l FROM ListingEntity l " +

                    "WHERE (l.roomCount >= :roomCount) " +
                    "OR ( l.guestCount = :guestCount) " +
                    "OR (l.bathroomCount >= :bathroomCount) " +
                    "OR (l.location = :location) "
            // Add more conditions as needed
            ,
            nativeQuery = false // Ensure it's not a native query
    )
    List<ListingEntity> findBySearchParams(
            @Param("roomCount") Integer roomCount,
            @Param("guestCount") Integer guestCount,
            @Param("bathroomCount") Integer bathroomCount,
            @Param("location") String location
            // Add more parameters as needed
    );

    List<ListingEntity> findByUserId(String userId);


//    @Query(
//            value = "SELECT DISTINCT l FROM ListingEntity l " +
//                    "JOIN l.reservations r " +
//                    "WHERE (:roomCount IS NULL OR l.roomCount >= :roomCount) " +
//                    "AND (:guestCount IS NULL OR l.guestCount = :guestCount) " +
//                    "AND (:bathroomCount IS NULL OR l.bathroomCount >= :bathroomCount) " +
//                    "AND (:location IS NULL OR l.location = :location) "
////                    "AND (:startDate IS NULL OR :endDate IS NULL OR NOT EXISTS " +
////                    "(SELECT r FROM ReservationEntity r WHERE r.listingEntity = l AND " +
////                    "((r.endDate >= :startDate AND r.startDate <= :startDate) OR " +
////                    "(r.startDate <= :endDate AND r.endDate >= :endDate))))"
//            ,
//            nativeQuery = false // Ensure it's not a native query
//    )
//    List<ListingEntity> findBySearchParams(
//            @Param("roomCount") Integer roomCount,
//            @Param("guestCount") Integer guestCount,
//            @Param("bathroomCount") Integer bathroomCount,
//            @Param("location") String location
////            @Param("startDate") LocalDate startDate,
////            @Param("endDate") LocalDate endDate
//    );

//    @Query("SELECT DISTINCT l FROM ListingEntity l " +
//            "JOIN l.reservations r " +
//            "WHERE (:roomCount IS NULL OR l.roomCount >= :roomCount) " +
//            "AND (:guestCount IS NULL OR l.guestCount = :guestCount) " +
//            "AND (:bathroomCount IS NULL OR l.bathroomCount >= :bathroomCount) " +
//            "AND (:location IS NULL OR l.location = :location) " +
//            "AND (:startDate IS NULL OR :endDate IS NULL OR NOT EXISTS " +
//            "(SELECT r FROM ReservationEntity r WHERE r.listingEntity = l AND " +
//            "((r.endDate >= :startDate AND r.startDate <= :startDate) OR " +
//            "(r.startDate <= :endDate AND r.endDate >= :endDate))))")
//    List<ListingEntity> findByBathroomCountAndEndDateAndGuestCountAndAndLocationAndAndRoomCountAndStartDate(
//            @Param("roomCount") Integer roomCount,
//            @Param("guestCount") Integer guestCount,
//            @Param("bathroomCount") Integer bathroomCount,
//            @Param("location") String location,
//            @Param("startDate") LocalDate startDate,
//
//            @Param("startDate")  (cast(:fromDate as date) is null ),
//
//    @Param("endDate") LocalDate endDate
//    );


//    @Query("SELECT DISTINCT l FROM ListingEntity l " +
//            "JOIN l.reservations r " +
//            "WHERE r.startDate >= :startDate " +
//            "AND r.endDate <= :endDate " +
//            "AND l.guestCount = :guestCount " +
//            "AND l.location = :location "
//    )
//    List<ListingEntity> findByBathroomCountAndEndDateAndGuestCountAndAndLocationAndAndRoomCountAndStartDate(
//            @Param("endDate") LocalDateTime endDate,
//            @Param("guestCount") Integer guestCount,
//            @Param("location") String location,
//            @Param("startDate") LocalDateTime startDate
//    );
//@Query("SELECT DISTINCT l FROM ListingEntity l " +
//        "JOIN l.reservations r " +
//        "WHERE (:roomCount IS NULL OR l.roomCount >= :roomCount) " +
//        "AND (:guestCount IS NULL OR l.guestCount = :guestCount) " +
//        "AND (:bathroomCount IS NULL OR l.bathroomCount >= :bathroomCount) " +
//        "AND (:location IS NULL OR l.location = :location) " +
//        "AND (:startDate IS NULL OR :endDate IS NULL OR NOT EXISTS " +
//        "(SELECT r FROM ReservationEntity r WHERE r.listingEntity = l AND " +
//        "((r.endDate >= :startDate AND r.startDate <= :startDate) OR " +
//        "(r.startDate <= :endDate AND r.endDate >= :endDate))))")
//List<ListingEntity> findBySearchParams(
//        @Param("roomCount") Integer roomCount,
//        @Param("guestCount") Integer guestCount,
//        @Param("bathroomCount") Integer bathroomCount,
//        @Param("location") String location,
//        @Param("startDate") LocalDateTime startDate,
//        @Param("endDate") LocalDateTime endDate
//);
//
    //    Optional<ListingEntity> findById(String id);

//    Optional<ListingEntity> findByListingId(String id);
}
