package br.com.cispar.dto.mapper;

import br.com.cispar.domain.Exemplo;
import br.com.cispar.dto.ExemploRequestDto;
import br.com.cispar.dto.ExemploResponseDto;
import org.springframework.stereotype.Component;

// ⚠️ Mapper de exemplo — descartável.
@Component
public class ExemploMapper {

    public ExemploResponseDto toResponseDto(Exemplo exemplo) {
        return new ExemploResponseDto(exemplo.getId(), exemplo.getNome(), exemplo.getCriadoEm());
    }

    public Exemplo toEntity(ExemploRequestDto dto) {
        Exemplo exemplo = new Exemplo();
        exemplo.setNome(dto.nome());
        return exemplo;
    }
}
