package br.com.cispar.service;

import br.com.cispar.dto.ExemploRequestDto;
import br.com.cispar.dto.ExemploResponseDto;

import java.util.List;

public interface ExemploService {
    List<ExemploResponseDto> findAll();
    ExemploResponseDto create(ExemploRequestDto request);
}
