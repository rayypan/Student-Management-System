package com.studentmanagesystem.backend.authentication.util;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.studentmanagesystem.backend.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final Key secretKey;

    public JwtUtil(@Autowired Config config) {
        String secret = config.getJwtServerSecret();
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateTokens(String email, String role) {
        return generateTokens(email, role, 15);
    }

    public String generateTokens(String email, String role, int timeInMin) {
        long expirationMillis = 1000 * 60 * timeInMin;
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(Claims claims) {
        return claims.getSubject();
    }

}
