package com.studentmanagesystem.backend.authentication.security;

import com.studentmanagesystem.backend.model.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.studentmanagesystem.backend.authentication.util.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthfilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // backend side permissions
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/api/admin/**").hasAuthority(Constants.Roles.ADMIN)
                        .requestMatchers("/api/student/**").hasAuthority(Constants.Roles.STUDENT)
                        .requestMatchers("/static/**").permitAll()
                        // app side permissions
                        .requestMatchers("/app/**").permitAll()
                        .requestMatchers("/assets/**").permitAll()
                        // other permissions
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        httpSecurity.addFilterBefore(jwtAuthfilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();

    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
