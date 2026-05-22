package br.com.cispar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// ⚠️ DTO de exemplo — descartável.
public record ExemploRequestDto(

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 255, message = "Nome deve ter no máximo 255 caracteres")
    String nome
) {}
