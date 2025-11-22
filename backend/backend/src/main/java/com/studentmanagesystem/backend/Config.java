package com.studentmanagesystem.backend;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class Config {

    @Value("${app.server-origin}")
    private String appServerOrigin;

    @Value("${app.webapp-origin}")
    private String appWebappOrigin;

    public String getServerOrigin() {
        if (appServerOrigin == null || appServerOrigin.isBlank()) {
            throw new IllegalStateException(
                    "Cannot determine base URL: no `app.server-origin` configured");
        }
        return appServerOrigin;
    }

    public String getWebappOrigin() {
        if (appWebappOrigin == null || appWebappOrigin.isBlank()) {
            throw new IllegalStateException(
                    "Cannot determine base URL: no `app.webapp-origin` configured");
        }
        return appWebappOrigin;
    }

    public String getServerOrigin(HttpServletRequest request) {
        if (request == null) {
            return getServerOrigin();
        }
        return ServletUriComponentsBuilder
                .fromRequestUri(request)
                .replacePath(null)
                .build()
                .toUriString();
    }

    @Bean
    public ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }
}
