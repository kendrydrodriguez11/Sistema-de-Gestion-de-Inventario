package com.example.auth.controller.required;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;


@Builder
public class UserDto {

    @NotNull
    private UUID id;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private String locationPhoto;

}
