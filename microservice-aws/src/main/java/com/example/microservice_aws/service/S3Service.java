package com.example.microservice_aws.service;

import java.io.IOException;
import java.util.List;
import java.io.InputStream;


public interface S3Service {
    String createBucket(String bucketName);
    Boolean checkIfBucketExist(String bucketName);
    List<String> getAllBuckets();
    String generatePresignedUrl(String bucketName, String key);
}
