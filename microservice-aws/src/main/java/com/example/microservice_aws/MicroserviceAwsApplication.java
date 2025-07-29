package com.example.microservice_aws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceAwsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceAwsApplication.class, args);
	}

}
