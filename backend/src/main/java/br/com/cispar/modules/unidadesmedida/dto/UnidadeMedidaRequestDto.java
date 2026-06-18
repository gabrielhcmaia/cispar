package br.com.cispar.modules.unidadesmedida.dto;

import br.com.cispar.modules.unidadesmedida.domain.Grandeza;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UnidadeMedidaRequestDto(
        @NotBlank String nome,
        @NotBlank String sigla,
        @NotNull Grandeza grandeza
) {
}
