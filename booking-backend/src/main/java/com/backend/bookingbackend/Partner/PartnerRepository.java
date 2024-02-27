package com.backend.bookingbackend.Partner;

import com.backend.bookingbackend.Partner.partner.PartnerEntity;
import com.backend.bookingbackend.Users.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PartnerRepository extends JpaRepository<PartnerEntity, String> {
    Boolean existsByEmail(String email);
    Optional<PartnerEntity> findByEmail(String email);

}
