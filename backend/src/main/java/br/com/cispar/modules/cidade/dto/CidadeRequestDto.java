package br.com.cispar.modules.cidade.dto;

import br.com.cispar.modules.cidade.domain.Uf;
import jakarta.validation.constraints.NotBlank;

public record CidadeRequestDto(
        @NotBlank String nome,
        @NotBlank Uf uf,
        @NotBlank String regiao
) {
}
