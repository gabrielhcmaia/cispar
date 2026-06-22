package br.com.cispar.modules.users.dto;

import br.com.cispar.modules.users.domain.Perfil;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequestDto(
        @NotBlank String nome,
        @NotBlank @Email String email,
        String senha,
        @NotNull Perfil perfil,
        @NotBlank String cargo,
        boolean ativo
) {
}
