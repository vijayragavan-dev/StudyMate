package com.rurallearn.controllers;

import com.rurallearn.models.User;
import com.rurallearn.services.UserService;
import com.rurallearn.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * AuthController — handles /api/auth/register and /api/auth/login
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    // ---- REGISTER ----
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (userService.existsByEmail(req.email)) {
                response.put("message", "Email already registered");
                return ResponseEntity.badRequest().body(response);
            }
            User user = userService.register(
                req.name, req.email, req.password,
                req.classLevel, req.village, req.language
            );
            response.put("message", "Registration successful");
            response.put("userId", user.getId());
            response.put("name", user.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // ---- LOGIN ----
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Map<String, Object> response = new HashMap<>();
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email, req.password)
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(req.email);
            String token = jwtUtil.generateToken(userDetails.getUsername());

            User user = userService.findByEmail(req.email);
            response.put("token", token);
            response.put("userId", user.getId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("classLevel", user.getClassLevel());
            response.put("role", user.getRole());
            response.put("points", user.getPoints());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        } catch (Exception e) {
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // ---- Inner request DTOs ----
    static class RegisterRequest {
        public String name, email, password, classLevel, village, language;
    }

    static class LoginRequest {
        public String email, password;
    }
}
