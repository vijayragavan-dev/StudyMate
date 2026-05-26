package com.rurallearn.services;

import com.rurallearn.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.util.*;

/**
 * UserService — handles user registration, login, profile management
 */
@Service
public class UserService implements UserDetailsService {

    // Simple in-memory store for demo (replace with JPA Repository in production)
    private final Map<String, User> userStore = new HashMap<>();
    private long nextId = 1;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String name, String email, String password,
                          String classLevel, String village, String language) {
        User user = new User(name, email, passwordEncoder.encode(password),
                             classLevel, village, language);
        user.setId(nextId++);
        userStore.put(email.toLowerCase(), user);
        return user;
    }

    public boolean existsByEmail(String email) {
        return userStore.containsKey(email.toLowerCase());
    }

    public User findByEmail(String email) {
        return userStore.get(email.toLowerCase());
    }

    public Optional<User> findById(Long id) {
        return userStore.values().stream().filter(u -> u.getId().equals(id)).findFirst();
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(userStore.values());
    }

    public User updatePoints(String email, int pointsToAdd) {
        User user = findByEmail(email);
        if (user != null) {
            user.setPoints(user.getPoints() + pointsToAdd);
            user.setQuizzesTaken(user.getQuizzesTaken() + 1);
        }
        return user;
    }

    // Spring Security UserDetailsService implementation
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findByEmail(email);
        if (user == null) throw new UsernameNotFoundException("User not found: " + email);
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole().name())
            .build();
    }
}
