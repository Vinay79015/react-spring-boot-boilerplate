package com.assignment.project.controller;

import com.assignment.project.entity.Url;
import com.assignment.project.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UrlController {
    @Autowired
    private UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@RequestBody Url url) {
        if (!urlService.isValidUrl(url.getOriginalUrl())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid URL format"));
        }
        Url savedUrl = urlService.shortenUrl(url.getOriginalUrl());
        return ResponseEntity.ok(Map.of("shortUrl", "http://localhost:7070/api/" + savedUrl.getShortCode()));
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> redirect(@PathVariable String code) {
        Optional<Url> urlOpt = urlService.getOriginalUrl(code);
        if (urlOpt.isEmpty()) {
            return ResponseEntity.status(404).body("URL doesn't exist. Go back to create one.");
        }

        Url url = urlOpt.get();
        if (urlService.isExpired(url)) {
            return ResponseEntity.status(410).body("URL expired. Create a new short URL.");
        }

        String target = url.getOriginalUrl();
        if (!target.startsWith("http://") && !target.startsWith("https://")) {
            target = "http://" + target;
        }

        return ResponseEntity.status(302).location(URI.create(target)).build();
    }

}
