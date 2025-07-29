package com.example.microservice_aws.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Duration;
import java.util.List;

@RequiredArgsConstructor
@Service
public class S3ServiceImpl implements S3Service {
    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private static final Logger logger = LoggerFactory.getLogger(S3ServiceImpl.class);




    @Override
    public String createBucket(String bucketName) {
        try {
            if (!checkIfBucketExist(bucketName)) {
                CreateBucketResponse response = s3Client.createBucket(bucketBuilder -> bucketBuilder.bucket(bucketName));
                logger.info("Bucket '{}' created successfully", bucketName);
                return "Bucket created successfully";
            }
            logger.warn("Bucket name '{}' already exists", bucketName);
            return "Bucket name already exists";
        } catch (Exception e) {
            logger.error("Error creating bucket '{}': {}", bucketName, e.getMessage(), e);
            return "Error creating bucket";
        }
    }



    @Override
    public Boolean checkIfBucketExist(String bucketName) {
        try {
            s3Client.headBucket( headBucket -> headBucket.bucket(bucketName) );
            return true;
        } catch(S3Exception exception){
            return  false;
        }
    }


    @Override
    public List<String> getAllBuckets() {
        ListBucketsResponse bucketsResponse = s3Client.listBuckets();

        if(bucketsResponse.hasBuckets()){
            return bucketsResponse.buckets()
                    .stream()
                    .map(Bucket::name)
                    .toList();
        } else {
            return List.of();
        }
    }


    @Override
    public String generatePresignedUrl(String bucketName, String key) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(r ->
                r.signatureDuration(Duration.ofMinutes(10))
                        .putObjectRequest(objectRequest)
        );

        return presignedRequest.url().toString();
    }

}
