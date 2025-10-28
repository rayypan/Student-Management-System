package com.studentmanagesystem.backend.authentication.util;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.auth0.jwt.interfaces.Claim;

@Component
public class JwtUtil {

    private final Key secretkey;

    public JwtUtil() {
        byte[] KeyBytes = new byte[32];
        new SecureRandom().nextBytes(KeyBytes);
        this.secretkey = new SecretKeySpec(KeyBytes, "HmacSHA256");
        System.out.println("JWT Secret Key (Base64): " + Base64.getEncoder().encodeToString(KeyBytes));

    }

    public String generateTokens(String email, String role) {
        long expirationMillis = 1000 * 60 * 15;
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(secretkey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretkey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(String token) {

        return validateToken(token).getSubject();

    }

    public String extractRole(String token) {
        return validateToken(token).get("role", String.class);
    }

}
