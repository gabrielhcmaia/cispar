package br.com.cispar.modules.tecnicos.dto;

import br.com.cispar.modules.tecnicos.domain.Cargo;
import br.com.cispar.modules.tecnicos.domain.Funcao;

public record TecnicoResponseDto(
        Integer id,
        String nome,
        Cargo cargo,
        Funcao funcao,
        String telefone,
        String email
) {
}
