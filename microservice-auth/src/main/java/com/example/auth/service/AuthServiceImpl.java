package com.example.auth.service;

import com.example.auth.client.S3ClientApi;
import com.example.auth.controller.required.LoginUser;
import com.example.auth.model.EntityRoles;
import com.example.auth.model.EntityUser;
import com.example.auth.model.RolesE;
import com.example.auth.repository.AuthRepository;
import com.example.auth.service.jwt.JwtAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {


    private final AuthRepository authRepository;
    private final AuthenticationManager authenticationManager;
    private final DetailsUser detailsUser;
    private final JwtAuth jwtAuth;
    private final PasswordEncoder passwordEncoder;
    private final S3ClientApi s3ClientApi;
    private  final static Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);


    @Override
    public Map<String, Object> registerUser(String username, String email, String password, String bucketName) {
        String key = null;
        String uploadUrl = null;

        Set<EntityRoles> rol = Collections.singleton(EntityRoles.builder().name(RolesE.USER).build());

        EntityUser user = EntityUser.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .roles(rol)
                .build();
        try {

            if (bucketName != null && !bucketName.isEmpty()) {
                key = "profiles/" + user.getId();
                uploadUrl = s3ClientApi.getPresignedUrl(bucketName, key);
            }

            String finalFileUrl = key != null ? "https://" + bucketName + ".s3.amazonaws.com/" + key : null;
            user.setUrlPhotoAws(finalFileUrl);
            authRepository.save(user);

            return Map.of(
                    "message", "User registered successfully",
                    "uploadUrl", uploadUrl,
                    "fileUrl", finalFileUrl
            );

        } catch (Exception e) {
            logger.error("Error in register", e);
            throw new RuntimeException("Error registering user", e);
        }
    }






    @Override
    public String authenticateUser(LoginUser user) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        EntityUser userLogin = detailsUser.getDetailsUser(user.getUsername());
        return jwtAuth.CreatedToken(userLogin);
    }

}
