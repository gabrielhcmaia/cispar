package br.com.cispar.modules.unidadesmedida.dto;

import br.com.cispar.modules.unidadesmedida.domain.Grandeza;

public record UnidadeMedidaResponseDto(
        Integer id,
        String nome,
        String sigla,
        Grandeza grandeza
) {
}
