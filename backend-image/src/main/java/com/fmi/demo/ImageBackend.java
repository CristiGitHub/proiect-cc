package com.fmi.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class ImageBackend {

    public static void main(String[] args) {


        SpringApplication.run(ImageBackend.class, args);
    }

}
