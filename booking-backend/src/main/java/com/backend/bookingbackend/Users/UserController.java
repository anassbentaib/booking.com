package com.backend.bookingbackend.Users;


import com.backend.bookingbackend.Users.user.UserEntity;
import com.backend.bookingbackend.Users.user.login.LoginDTO;
import com.backend.bookingbackend.Users.user.register.RegisterDTO;
import com.backend.bookingbackend.config.AuthResponseDTO;
import com.backend.bookingbackend.config.TokenGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/auth/")
@CrossOrigin("http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenGenerator tokenGenerator;


    public UserController(UserRepository userRepository
            , PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager,TokenGenerator tokenGenerator) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenGenerator = tokenGenerator;

    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);
        Optional<UserEntity> userOptional = userRepository.findByEmail(loginDto.getEmail());
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            System.out.println("user=>> "+user);
            System.out.println("user=>>i  "+user.getFavoriteIds());




            String token = tokenGenerator.generateToken(authentication,user);

            return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        try {
            if (registerDTO.getPassword() == null
                    || registerDTO.getConfirmPassword() == null
                    || registerDTO.getEmail() == null) {
                return new ResponseEntity<>("Invalid Credentials", HttpStatus.BAD_REQUEST);
            }

            if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
                return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
            }

            if (userRepository.existsByEmail(registerDTO.getEmail())) {
                return new ResponseEntity<>("Email already taken", HttpStatus.BAD_REQUEST);
            }

            UserEntity user = new UserEntity();
            user.setEmail(registerDTO.getEmail());
            user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            user.setConfirmPassword(passwordEncoder.encode(registerDTO.getConfirmPassword()));

            userRepository.save(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Internal Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
