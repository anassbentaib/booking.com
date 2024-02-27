package com.backend.bookingbackend.config;

import java.security.Key;
import java.util.Collection;

import com.backend.bookingbackend.Users.user.UserEntity;
import io.jsonwebtoken.Claims;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

    @Component
    public class TokenGenerator {

        private static final
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        public String generateToken(Authentication authentication, UserEntity user){
            String email = authentication.getName();
            String id = user.getId();
            List<String> favoriteIds = user.getFavoriteIds();
            List<String> sanitizedFavoriteIds = favoriteIds != null ? favoriteIds : Collections.emptyList();

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

            Date currentDate = new Date();
            Date expireDate = new Date(currentDate.getTime() + SecurityConstant.JWT_EXPIRATION);
            String token = Jwts.builder()
                    .setSubject(email)
                    .claim("id",id)
                    .claim("favorite_ids",sanitizedFavoriteIds)
//                    .claim("favoriteIds",favoriteIds)

                    .setIssuedAt(new Date())
                    .setExpiration(expireDate)
                    .signWith(key)
                    .compact();


            return token;
        }

    public String getEmailFromJwt(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SecurityConstant.JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean ValidationToken(String token){
            try {
                Jwts.parser()
                        .setSigningKey(SecurityConstant.JWT_SECRET)
                        .parseClaimsJws(token);
                return true;
            }catch (Exception e){
                throw new
                        AuthenticationCredentialsNotFoundException
                        ("JWT was expired or incorrect.");
            }
    }

}
