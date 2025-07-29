package com.example.gateway.utils;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouterValidator {
    private static final List<String> Open_Api_ENDPOINTS = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/aws/create",
            "/api/aws/list"

    );

    public boolean isSecured (ServerHttpRequest request){
        return  Open_Api_ENDPOINTS.stream()
                .noneMatch(url -> request.getURI().getPath()
                        .contains(url));
    }
}
