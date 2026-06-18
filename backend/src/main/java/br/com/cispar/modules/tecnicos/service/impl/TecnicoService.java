package br.com.cispar.modules.tecnicos.service.impl;

import br.com.cispar.modules.tecnicos.domain.TecnicoModel;
import br.com.cispar.modules.tecnicos.repository.TecnicoRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService extends CrudService<TecnicoModel, Integer> {

    private final TecnicoRepository tecnicoRepository;

    public TecnicoService(TecnicoRepository tecnicoRepository) {
        this.tecnicoRepository = tecnicoRepository;
    }

    @Override
    protected JpaRepository<TecnicoModel, Integer> getRespository() {
        return tecnicoRepository;
    }

    @Override
    public TecnicoModel update(Integer id, TecnicoModel entity) {
        entity.setId(id);
        return super.update(id, entity);
    }
}
