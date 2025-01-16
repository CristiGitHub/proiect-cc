package com.fmi.demo.infra.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				// Disable cors and csrf
				.cors().disable()
				.csrf().disable()
				// Configure OAuth2 resource server with JWT authentication
				.oauth2ResourceServer(oauth2ResourceServer ->
						oauth2ResourceServer.jwt(jwt ->
								jwt.jwtAuthenticationConverter(grantedAuthoritiesExtractor())
						)
				)
				// authorization
				.authorizeRequests(authorizeRequests ->
						authorizeRequests
								.antMatchers(HttpMethod.GET, "/api/v1/admin/**").hasRole("administrator")
								.antMatchers(HttpMethod.GET, "/api/**").permitAll()
								.antMatchers(HttpMethod.GET, "/**").permitAll()
				);

		return http.build();
	}

	private Converter<Jwt, AbstractAuthenticationToken> grantedAuthoritiesExtractor() {
		JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
		jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new KeycloakRealmRoleConverter());
		return jwtAuthenticationConverter;
	}

}