package com.fmi.demo.exposition.services;

import com.fmi.demo.domain.model.ConfirmationDataSet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class ConfrimationRestSave {


	@Value("${admin-db.server-url}")
	String adminServerUrl;

	private final RestTemplate restTemplate;


	public ConfrimationRestSave(RestTemplateBuilder restTemplateBuilder) {
		this.restTemplate = restTemplateBuilder.build();
	}

	public void proxiConfirmation(ConfirmationDataSet confirmationDataSet,String userid){
		String fastApiUrl = adminServerUrl+"/api/save";
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Jwt jwt = (Jwt) authentication.getPrincipal();
		String accessToken = jwt.getTokenValue();
		confirmationDataSet.setConfirmed(false);
		confirmationDataSet.setAddedUserId(userid);
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		headers.setContentType(MediaType.APPLICATION_JSON);

		// Wrap the body and headers in an HttpEntity
		System.out.println(headers);

		HttpEntity<ConfirmationDataSet> requestEntity = new HttpEntity<>(confirmationDataSet, headers);
		System.out.println(requestEntity);

		System.out.println("-------------------------------------------------");
		System.out.println("-------------------------------------------------");
		// Make the POST request
		ResponseEntity<String> response = restTemplate.exchange(
				fastApiUrl,
				HttpMethod.POST,
				requestEntity,
				String.class
		);
		System.out.println(response);
		System.out.println("-------------------------------------------------");
		System.out.println("-------------------------------------------------");

	}
}
