package com.studentmanagesystem.backend.authentication.util;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private final Key secretkey;

    public JwtUtil() {
        // byte[] KeyBytes = new byte[32];
        String secret = "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123";
        // new SecureRandom().nextBytes(KeyBytes);
        byte[] KeyBytes = secret.getBytes(StandardCharsets.UTF_8);
        this.secretkey = new SecretKeySpec(KeyBytes, "HmacSHA256");
        System.out.println("JWT Secret Key (Base64): " + Base64.getEncoder().encodeToString(KeyBytes));

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

    public String extractEmail(Claims claims) {
        return claims.getSubject();
    }

}
