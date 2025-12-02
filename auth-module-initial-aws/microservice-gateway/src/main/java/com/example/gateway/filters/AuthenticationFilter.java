package com.example.gateway.filters;

import com.example.gateway.client.AuthWebClient;
import com.example.gateway.utils.RouterValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Component
public class AuthenticationFilter implements GlobalFilter {

    private final AuthWebClient authWebClient;
    private final RouterValidator routerValidator;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        if (routerValidator.isSecured(request)) {
            String token = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (token == null || !token.toLowerCase().startsWith("bearer ")) {
                return onError(exchange, "Token de autenticación faltante o inválido", HttpStatus.UNAUTHORIZED);
            }
            String cleanToken = token.substring(7);
            return authWebClient.validateToken(cleanToken)
                    .flatMap(isValid -> isValid ? chain.filter(exchange) : onError(exchange, "Token inválido", HttpStatus.UNAUTHORIZED))
                    .onErrorResume(e -> onError(exchange, "Error en autenticación", HttpStatus.UNAUTHORIZED));
        }
        return chain.filter(exchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, String message, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        return response.setComplete();
    }
}
