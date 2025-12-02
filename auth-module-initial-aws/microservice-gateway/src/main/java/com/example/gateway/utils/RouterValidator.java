package com.example.gateway.utils;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouterValidator {
    private static final List<String> OPEN_API_ENDPOINTS = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/validationToken",
            "/api/aws/create",
            "/api/aws/list",
            "/api/aws/presigned-url",
            "/ws",
            "/actuator",
            "/error"
    );

    public boolean isSecured(ServerHttpRequest request) {
        String path = request.getURI().getPath();
        System.out.println("este es el " + path);

        return OPEN_API_ENDPOINTS.stream()
                .noneMatch(path::contains);
    }
}