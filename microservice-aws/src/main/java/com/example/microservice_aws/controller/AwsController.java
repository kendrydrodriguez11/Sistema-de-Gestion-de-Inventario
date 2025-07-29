package com.example.microservice_aws.controller;


import com.example.microservice_aws.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/aws")
public class AwsController {
    private final S3Service s3Service;


    @PostMapping("/create")
    public ResponseEntity<String> createBucket(@RequestParam String bucketName){
        return ResponseEntity.ok(s3Service.createBucket(bucketName));
    }


    @GetMapping("/check/{bucketName}")
    public ResponseEntity<String> checkBucket(@PathVariable String bucketName){
        return  s3Service.checkIfBucketExist(bucketName)
                ? ResponseEntity.ok("not exist")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("no found");

    }

    @GetMapping("/list")
    public ResponseEntity<List<String>> listBuckets(){
        return ResponseEntity.ok(s3Service.getAllBuckets());
    }

    @GetMapping("/presigned-url")
    public ResponseEntity<String> generatePresignedUrl(
            @RequestParam String bucketName,
            @RequestParam String key) {
        return ResponseEntity.ok(s3Service.generatePresignedUrl(bucketName, key));
    }


}
