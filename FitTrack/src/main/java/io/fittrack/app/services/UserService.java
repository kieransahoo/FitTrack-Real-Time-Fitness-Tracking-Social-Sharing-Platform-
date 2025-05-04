package io.fittrack.app.services;

import io.fittrack.app.dto.LoginRequest;
import io.fittrack.app.dto.LoginResponse;
import io.fittrack.app.dto.RegisterUserRequest;
import io.fittrack.app.dto.UserDTO;

public interface UserService {

    void registerUser(RegisterUserRequest registerUserRequest);
    LoginResponse login(LoginRequest loginRequest);

    UserDTO getUserByEmail(String email);

}
