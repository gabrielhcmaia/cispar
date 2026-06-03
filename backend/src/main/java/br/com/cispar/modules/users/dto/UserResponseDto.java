package br.com.cispar.modules.users.dto;

import br.com.cispar.modules.users.domain.UserRole;

import java.time.LocalDateTime;

public record UserResponseDto(
        Long id,
        String name,
        String username,
        UserRole role,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
        ) {

}
