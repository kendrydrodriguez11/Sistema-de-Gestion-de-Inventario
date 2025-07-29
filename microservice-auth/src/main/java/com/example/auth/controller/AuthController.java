package com.example.auth.controller;

import com.example.auth.controller.required.LoginUser;
import com.example.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("bucket") String bucketName) {
        try {
            Map<String, Object> urlCreated = authService.registerUser(username, email, password, bucketName);
            return ResponseEntity.ok(urlCreated);

        } catch (Exception e) {
            logger.error("Error in register: {} | Localized: {}", e.getMessage(), e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "bad request",
                    "error", e.getMessage()
            ));
        }
    }



    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody LoginUser user) {
        try {
            String token = authService.authenticateUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(response);

        } catch (Exception e) {
            logger.warn("Authentication failed for user {}: {}", user.getUsername(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciales inválidas"));
        }
    }


}
