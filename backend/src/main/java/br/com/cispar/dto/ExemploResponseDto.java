package br.com.cispar.dto;

import java.time.OffsetDateTime;

// ⚠️ DTO de exemplo — descartável.
public record ExemploResponseDto(Long id, String nome, OffsetDateTime criadoEm) {}
