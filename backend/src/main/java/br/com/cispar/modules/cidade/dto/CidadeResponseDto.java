package br.com.cispar.modules.cidade.dto;

import br.com.cispar.modules.cidade.domain.Uf;

public record CidadeResponseDto(
        String nome,
        Uf uf,
        String regiao
) {
}
