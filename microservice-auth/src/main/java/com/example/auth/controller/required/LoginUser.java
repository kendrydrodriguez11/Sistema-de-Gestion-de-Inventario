package com.example.auth.controller.required;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class LoginUser {
    @NotBlank
    private String username;


    @NotBlank
    private String password;
}
