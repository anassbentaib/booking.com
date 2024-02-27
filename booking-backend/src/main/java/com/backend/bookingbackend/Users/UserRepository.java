package com.backend.bookingbackend.Users;

import com.backend.bookingbackend.Users.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
//    Optional<UserEntity> findById(String id);

//    Optional<UserEntity> findByUserId(String id);

//    Optional<UserEntity> findUserById(String id);

}
