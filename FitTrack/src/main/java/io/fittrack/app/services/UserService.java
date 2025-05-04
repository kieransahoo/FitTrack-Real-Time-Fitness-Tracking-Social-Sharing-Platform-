package io.fittrack.app.services;

import java.util.List;

import io.fittrack.app.dto.LoginRequest;
import io.fittrack.app.dto.LoginResponse;
import io.fittrack.app.dto.RegisterUserRequest;
import io.fittrack.app.dto.UserDTO;
import io.fittrack.app.exception.UserException;

public interface UserService {

    void registerUser(RegisterUserRequest registerUserRequest);
    LoginResponse login(LoginRequest loginRequest);
    UserDTO getUserByEmail(String email);
    public List<UserDTO> getAllUsers() throws UserException;
    public void suspendUser(Integer userId) throws UserException;

}
