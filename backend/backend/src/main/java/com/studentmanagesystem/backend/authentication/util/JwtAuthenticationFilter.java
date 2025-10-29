package com.studentmanagesystem.backend.authentication.util;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.studentmanagesystem.backend.authentication.repo.UserRepository;
import com.studentmanagesystem.backend.authentication.model.User;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {

            Claims claims = jwtUtil.validateToken(token);
            String email = jwtUtil.extractEmail(claims);
            Optional<User> optionalUser = userRepo.findByEmail(email);

            UsernamePasswordAuthenticationToken authentication = null;

            if (optionalUser.isEmpty()) {
                authentication = new UsernamePasswordAuthenticationToken(null, null);
            } else {
                List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(optionalUser.get().role));
                authentication = new UsernamePasswordAuthenticationToken(optionalUser.get(), null, authorities);
            }

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }

}
