package br.com.cispar.modules.users.dto;

import br.com.cispar.modules.users.domain.Perfil;

import java.time.LocalDateTime;

public record UserResponseDto(
        Long id,
        String nome,
        String email,
        Perfil perfil,
        String cargo,
        boolean ativo,
        LocalDateTime ultimoAcesso,
        LocalDateTime dataCriacao
) {
}
