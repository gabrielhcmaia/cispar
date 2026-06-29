package br.com.cispar.modules.pocos.service.impl;

import br.com.cispar.modules.pocos.domain.PocosModel;
import br.com.cispar.modules.pocos.repository.PocosRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class PocosService extends CrudService<PocosModel, Integer> {

    private final PocosRepository pocosRepository;

    public PocosService(PocosRepository pocosRepository) {
        this.pocosRepository = pocosRepository;
    }

    @Override
    protected JpaRepository<PocosModel, Integer> getRespository() {
        return pocosRepository;
    }

    @Override
    public PocosModel update(Integer id, PocosModel entity) {
        entity.setId(id);
        return super.update(id, entity);
    }
}
