package com.studentmanagesystem.backend;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class Config {

    @Value("${app.server-origin:}")
    private String appServerOrigin;

    @Value("${app.webapp-origin:}")
    private String appWebappOrigin;

    public String getServerOrigin() {
        return getServerOrigin(null);
    }

    public String getWebappOrigin() {
        return appWebappOrigin;
    }

    public String getServerOrigin(HttpServletRequest request) {
        if (request != null) {
            return ServletUriComponentsBuilder
                    .fromRequestUri(request)
                    .replacePath(null)
                    .build()
                    .toUriString();
        }

        // fallback for async processes
        if (appServerOrigin != null && !appServerOrigin.isBlank()) {
            return appServerOrigin;
        }

        throw new IllegalStateException("Cannot determine base URL: no request and no `app.server-origin` configured");
    }

    @Bean
    public ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }
}
