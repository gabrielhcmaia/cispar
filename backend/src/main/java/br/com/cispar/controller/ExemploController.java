package br.com.cispar.controller;

import br.com.cispar.dto.ExemploRequestDto;
import br.com.cispar.dto.ExemploResponseDto;
import br.com.cispar.service.ExemploService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// ⚠️ Controller de exemplo — descartável. Serve apenas como referência da arquitetura.
@RestController
@RequestMapping("/api/exemplos")
@RequiredArgsConstructor
public class ExemploController {

    private final ExemploService exemploService;

    @GetMapping
    public ResponseEntity<List<ExemploResponseDto>> findAll() {
        return ResponseEntity.ok(exemploService.findAll());
    }

    @PostMapping
    public ResponseEntity<ExemploResponseDto> create(@Valid @RequestBody ExemploRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(exemploService.create(request));
    }
}
