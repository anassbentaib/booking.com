package com.backend.bookingbackend.Users;


import com.backend.bookingbackend.Users.user.UserEntity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public UserEntity updateUser(UserEntity currentUser) {
        if (userRepository.existsById(currentUser.getId())) {
            return userRepository.save(currentUser);
        } else {
            throw new IllegalArgumentException("User does not exist");
        }
    }

    public void addToFavorites(String userId, String listingId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        List<String> favoriteIds = user.getFavoriteIds();
        if (favoriteIds == null) {
            favoriteIds = new ArrayList<>();
        }

        if (!favoriteIds.contains(listingId)) {
            favoriteIds.add(listingId);
            user.setFavoriteIds(favoriteIds);
            userRepository.save(user);
        }
    }

    public void removeFromFavorites(String userId, String listingId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        List<String> favoriteIds = user.getFavoriteIds();
        if (favoriteIds != null) {
            favoriteIds.remove(listingId);
            userRepository.save(user);
        }
    }
}
