package io.fittrack.app.services;

import io.fittrack.app.dto.LoginRequest;
import io.fittrack.app.dto.LoginResponse;
import io.fittrack.app.dto.RegisterUserRequest;
import io.fittrack.app.dto.UserDTO;
import io.fittrack.app.entity.Customer;
import io.fittrack.app.entity.User;
import io.fittrack.app.exception.UserException;
import io.fittrack.app.jwt.JwtUtil;
import io.fittrack.app.repository.CustomerRepository;
import io.fittrack.app.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public void registerUser(RegisterUserRequest registerUserRequest) {
        try {
            User user = new User();
            user.setFullName(registerUserRequest.getFullName());
            user.setEmail(registerUserRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerUserRequest.getPassword()));
            user.setRole(registerUserRequest.getRole());
            if (userRepository.existsByEmail(registerUserRequest.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            User savedUser = userRepository.save(user);
            if (registerUserRequest.getRole().equals("USER")) {
                Customer customer = new Customer();
                customer.setUser(savedUser);
                customer.setGender(registerUserRequest.getGender());
                customer.setHeight(registerUserRequest.getHeight());
                customer.setWeight(registerUserRequest.getWeight());
                customer.setAge(registerUserRequest.getAge());
                customer.setFitnessLevel(registerUserRequest.getFitnessLevel());
                customer.setPrimaryGoal(registerUserRequest.getPrimaryGoal());
                customer.setSecondaryGoals(registerUserRequest.getSecondaryGoals());
                customer.setWorkoutsPerWeek(registerUserRequest.getWorkoutsPerWeek());
                customerRepository.save(customer);
            }
        }catch (Exception e) {
            logger.info("Error registering user: " + e.getMessage());
            throw new RuntimeException("Error registering user: " + e.getMessage());
        }
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try{
           authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                   loginRequest.getEmail(),loginRequest.getPassword())) ;
           UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
           if(userDetails == null){
               throw new RuntimeException("User not found");
           }
           String jwt = jwtUtil.generateToken(userDetails.getUsername());
           logger.info("User logged in successfully");
           LoginResponse response = new LoginResponse();
           response.setEmail(userDetails.getUsername());
           response.setRole(userDetails.getAuthorities().toString().replace("ROLE_", "").replaceAll("[\\[\\]]", ""));
           response.setToken(jwt);

           return response;
        }catch (Exception e){
            logger.info("Error logging in user: " + e.getMessage());
            throw new RuntimeException("Error logging in user: " + e.getMessage());
        }

    }

    @Override
    public UserDTO getUserByEmail(String email) {
        UserDTO  userDTO = new UserDTO();
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userDTO.setUserId(user.getUserId());
            userDTO.setFullName(user.getFullName());
            userDTO.setEmail(user.getEmail());
            userDTO.setRole(user.getRole());
            return userDTO;
        }
        logger.info("User not found with email: " + email);
        throw new RuntimeException("User not found with email: " + email);
    }

    @Override
    public List<UserDTO> getAllUsers() throws UserException{
        try {
            return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getUserId(), user.getEmail(), user.getFullName(), user.getRole(), user.isSuspended()))
                .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error getting all users: {}", e.getMessage(), e);
            throw new UserException("Failed to retrieve users");
        }
    }

    @Override
    public void suspendUser(Integer userId) throws UserException {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserException("User not found with ID: " + userId));
            user.setSuspended(true);
            userRepository.save(user);
            logger.info("User with ID {} suspended successfully", userId);
        } catch (UserException e) {
            logger.warn("Attempt to suspend non-existent user: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error suspending user with ID {}: {}", userId, e.getMessage(), e);
            throw new UserException("Failed to suspend user"); 
        }
    }
}
