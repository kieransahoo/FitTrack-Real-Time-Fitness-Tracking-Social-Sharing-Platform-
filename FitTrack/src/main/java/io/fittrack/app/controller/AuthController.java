package io.fittrack.app.controller;

import io.fittrack.app.dto.LoginRequest;
import io.fittrack.app.dto.LoginResponse;
import io.fittrack.app.dto.RegisterUserRequest;
import io.fittrack.app.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private UserService userService;
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserRequest registerUserRequest) {
        try{
            userService.registerUser(registerUserRequest);
            logger.info("User registered successfully");
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        }catch (Exception e){
            logger.severe("Error registering user: " + e.getMessage());
            return new ResponseEntity<>("Error registering user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> registerUser(@Valid @RequestBody LoginRequest loginRequest) {
        try{
            LoginResponse response = userService.login(loginRequest);
            logger.info("User logged in successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            logger.severe("Error logging in user: " + e.getMessage());
            return new ResponseEntity<>("Error logging in user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
