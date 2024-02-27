//package com.backend.bookingbackend.Partner;
//
//
//import com.backend.bookingbackend.Partner.partner.PartnerEntity;
//import com.backend.bookingbackend.Partner.partner.Role.Role;
//import com.backend.bookingbackend.Partner.partner.Role.RolesRepository;
//import com.backend.bookingbackend.Partner.partner.login.PartnerLoginDTO;
//import com.backend.bookingbackend.Partner.partner.register.RegisterDTO;
//import com.backend.bookingbackend.config.AuthResponseDTO;
//import com.backend.bookingbackend.config.TokenGenerator;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Collections;
//
//@RestController
//@RequestMapping(path = "/api/v1/auth")
//@CrossOrigin("http://localhost:5173")
//
//public class PartnerController {
//    private final PartnerRepository partnerRepository;
//
//    private final PasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//    private final TokenGenerator tokenGenerator;
//    @Autowired
//    private RolesRepository rolesRepositry;
//;
//
//    public PartnerController(PartnerRepository partnerRepository,PartnerTokenGenerator partnerTokenGenerator, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenGenerator tokenGenerator) {
//        this.partnerRepository = partnerRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//        this.partnerTokenGenerator = partnerTokenGenerator;
//        this.tokenGenerator = tokenGenerator;
//    }
//
//    @PostMapping("/partner-login")
//    public ResponseEntity<AuthResponseDTO> login(@RequestBody PartnerLoginDTO loginDto){
//     try{
//         Authentication authentication = authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
//         System.out.println("authentication=>>"+authentication);
//         SecurityContextHolder
//                 .getContext()
//                 .setAuthentication(authentication);
//         String token = partnerTokenGenerator.generateToken(authentication);
//
//         return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
//
//     }catch (Exception e){
//         e.printStackTrace();
//         return (ResponseEntity<AuthResponseDTO>) ResponseEntity.internalServerError();
//     }
//    }
//
//    @PostMapping("partner-register")
//    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
//        try{
//            if (registerDTO.getPassword() == null
//                    || registerDTO.getConfirmPassword() == null
//                    || registerDTO.getEmail() == null
//                    || registerDTO.getLastname()== null
//                    || registerDTO.getFirstname() == null
//                    || registerDTO.getPhoneNumber() == null
//
//            ){
//                return new ResponseEntity<>("Invalid data", HttpStatus.BAD_REQUEST);
//
//            }
//            if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
//                return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
//            }
//
//            if (partnerRepository.existsByEmail(registerDTO.getEmail())) {
//                return new ResponseEntity<>("Email already taken", HttpStatus.BAD_REQUEST);
//            }
//
//            PartnerEntity partner = new PartnerEntity();
//            partner.setFirstname(registerDTO.getFirstname());
//            partner.setLastname(registerDTO.getLastname());
//            partner.setEmail(registerDTO.getEmail());
//            partner.setPhoneNumber(registerDTO.getPhoneNumber().toString());
//            partner.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
//            partner.setConfirmPassword(passwordEncoder.encode(registerDTO.getConfirmPassword()));
//            Role roles = rolesRepositry.findByName("PARTNER").orElse(null);
//            System.out.println("PARTNER"+roles);
//            if (roles == null) {
//                return new ResponseEntity<>("Role not found", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//
//            partner.setRoles(Collections.singletonList(roles));
//            partnerRepository.save(partner);
//            return new ResponseEntity<>("Partner was created successfully", HttpStatus.CREATED);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//}
