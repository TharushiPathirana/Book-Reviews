package com.book.book_review.service;

import com.book.book_review.model.Users;
import com.book.book_review.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users registerUser(Users user) {
        if (repo.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }
        user.setRole("Member");
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public String verify(Users user) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (auth.isAuthenticated()) {
                return jwtService.generateToken(user.getUsername());
            }
        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        throw new IllegalStateException("Unexpected authentication error");
    }

}
