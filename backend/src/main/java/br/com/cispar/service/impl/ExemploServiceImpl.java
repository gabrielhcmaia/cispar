package br.com.cispar.service.impl;

import br.com.cispar.dto.ExemploRequestDto;
import br.com.cispar.dto.ExemploResponseDto;
import br.com.cispar.dto.mapper.ExemploMapper;
import br.com.cispar.repository.ExemploRepository;
import br.com.cispar.service.ExemploService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExemploServiceImpl implements ExemploService {

    private final ExemploRepository exemploRepository;
    private final ExemploMapper exemploMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ExemploResponseDto> findAll() {
        return exemploRepository.findAll()
                .stream()
                .map(exemploMapper::toResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public ExemploResponseDto create(ExemploRequestDto request) {
        return exemploMapper.toResponseDto(
                exemploRepository.save(exemploMapper.toEntity(request))
        );
    }
}
