package com.assignment.project.service;

import com.assignment.project.entity.Url;
import com.assignment.project.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class UrlService {

    @Autowired
    private UrlRepository repository;

    private final Pattern URL_PATTERN = Pattern.compile("^(https?://|www\\.)?([\\w\\-]+\\.)+[a-zA-Z]{2,6}(/.*)?$");

    public boolean isValidUrl(String url) {
        return URL_PATTERN.matcher(url).matches();
    }

    public Url shortenUrl(String originalUrl) {
        Optional<Url> existing = repository.findByOriginalUrl(originalUrl);
        if (existing.isPresent()) return existing.get();

        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortCode(generateShortCode());
        url.setCreatedAt(LocalDateTime.now());
        return repository.save(url);
    }

    public Optional<Url> getOriginalUrl(String code) {
            return repository.findByShortCode(code);
    }

    public boolean isExpired(Url url) {
        return url.getCreatedAt().plusMinutes(5).isBefore(LocalDateTime.now());
    }

    private String generateShortCode() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
