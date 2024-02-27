package com.backend.bookingbackend.Cart;


import com.backend.bookingbackend.Users.UserRepository;
import com.backend.bookingbackend.Users.UserService;
import com.backend.bookingbackend.Users.user.UserEntity;
import com.backend.bookingbackend.reservation.ReservationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;


    @PostMapping("cart/add-to-favorites/{userId}/{listingId}")
    public ResponseEntity<String>
    addToFavorites(@PathVariable String userId, @PathVariable String listingId) {
        try {

            if (userId == null || listingId == null) {
                return new ResponseEntity<>("userId or listingId is missing", HttpStatus.BAD_REQUEST);
            }

            cartService.addToFavorites(userId, listingId);

            return new ResponseEntity<>("Item added!", HttpStatus.CREATED);
        } catch (CartService.NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
}
    @GetMapping("cart/get-favorites/{userId}")
    public ResponseEntity<List<CartEntity>> getAllReservationsByUserId(@PathVariable String userId) {
        try {
            List<CartEntity> cart = cartService.getAllFavoritesByUserId(userId);

            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("cart/remove/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable String id) {
        return  cartService.removeFromFavorites(id);
    }



}
