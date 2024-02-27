package com.backend.bookingbackend.Cart;

import com.backend.bookingbackend.Listings.ListingEntity;
import com.backend.bookingbackend.Listings.ListingRepository;
import com.backend.bookingbackend.Users.UserRepository;
import com.backend.bookingbackend.Users.user.UserEntity;
import com.backend.bookingbackend.reservation.ReservationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CartService {
    @Autowired
    private final CartRepository cartRepository;


    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ListingRepository listingRepository;
    public CartService(CartRepository cartRepository, UserRepository userRepository, ListingRepository listingRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    public List<CartEntity> getAllFavoritesByUserId(String userId) {
        List<CartEntity> favoritesEntityList =  cartRepository.findByUserId(userId);
        for (CartEntity favoeitesEntity : favoritesEntityList) {
            Optional<ListingEntity> listing = listingRepository.findById(favoeitesEntity.getListingId());
            listing.ifPresent(listingEntity -> {
                favoeitesEntity.setCity(listing.get().getCity());
                favoeitesEntity.setLocation(listing.get().getLocation());
                favoeitesEntity.setImages(listing.get().getImageSrc());
                cartRepository.save(favoeitesEntity);
            });        }

        return favoritesEntityList;

    }


    public class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }

    public CartEntity addToFavorites(String userId, String listingId) {
        Optional<ListingEntity> listingOptional = listingRepository.findById(listingId);
        Optional<UserEntity> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent() && listingOptional.isPresent()) {
            boolean isAlreadyFavorited = cartRepository.existsByUserIdAndListingId(userId, listingId);

            if (isAlreadyFavorited) {
                System.out.println("Item already exists in cart!");
                // You may want to throw an exception or return some indication of failure here.
                throw new RuntimeException("Item already exists in cart!");
            } else {
                CartEntity favorite = new CartEntity();
                favorite.setUserId(userId);
                favorite.setListingId(listingId);
                return cartRepository.save(favorite);
            }
        } else {
            throw new NotFoundException("User or Listing not found");
        }


    }

    public ResponseEntity<String> removeFromFavorites(String id) {
      try{
          Optional<CartEntity> favoriteOptional = cartRepository.findById(id);
          if (favoriteOptional.isPresent()){
              cartRepository.deleteById(id);

          }
           return new ResponseEntity<>("Item removed", HttpStatus.OK);
          } catch (Exception e){
              return new ResponseEntity<>("Item not removed", HttpStatus.NOT_FOUND);
          }
      }

}
