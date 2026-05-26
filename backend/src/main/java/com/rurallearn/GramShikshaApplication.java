package com.rurallearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * GramShiksha — Digital Learning Platform for Rural Students Main Spring Boot
 * Application Entry Point
 */
@SpringBootApplication
public class GramShikshaApplication {

    public static void main(String[] args) {
        SpringApplication.run(GramShikshaApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("  GramShiksha Backend Started!");
        System.out.println("  API: http://localhost:8080/api");
        System.out.println("  H2 Console: http://localhost:8080/h2-console");
        System.out.println("========================================\n");
    }
}
