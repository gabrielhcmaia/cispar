package br.com.cispar.shared.controller;

import br.com.cispar.shared.service.CrudService;
import jakarta.validation.Valid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

public abstract class CrudController<T, ID , RequestDTO, ResponseDTO> {

    protected abstract CrudService<T, ID> getService();
    protected abstract T toEntity(RequestDTO dto);
    protected abstract ResponseDTO toResponse(T entity);

    @GetMapping
    public ResponseEntity<List<ResponseDTO>> findAll(){
        List<ResponseDTO> body = getService().findAll().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(body);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> findById(@PathVariable ID id){
        return ResponseEntity.ok(toResponse(getService().findById(id)));
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> create(@Valid @RequestBody RequestDTO dto){
        T saved = getService().create(toEntity(dto));
        ID id = extractId(saved);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).body(toResponse(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO> update(
            @PathVariable ID id,
            @Valid @RequestBody RequestDTO dto
            ){
        T entity = toEntity(dto);
        T updated = getService().update(id, entity);
        return ResponseEntity.ok(toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id){
        getService().delete(id);
        return ResponseEntity.noContent().build();
    }


    protected abstract ID extractId(T entity);
}
