package br.com.cispar.modules.tecnicos.dto;

import br.com.cispar.modules.tecnicos.domain.Cargo;
import br.com.cispar.modules.tecnicos.domain.Funcao;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TecnicoRequestDto(
        @NotBlank String nome,
        @NotNull Cargo cargo,
        @NotNull Funcao funcao,
        @NotBlank String telefone,
        @NotBlank @Email String email
) {
}
