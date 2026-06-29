package br.com.cispar.modules.cidade.service.impl;

import br.com.cispar.modules.cidade.domain.CidadeModel;
import br.com.cispar.modules.cidade.repository.CidadeRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CidadeService extends CrudService<CidadeModel, Integer> {

    private final CidadeRepository cidadeRepository;

    public CidadeService(CidadeRepository cidadeRepository) {
        this.cidadeRepository = cidadeRepository;
    }

    @Override
    protected JpaRepository<CidadeModel, Integer> getRespository() {
        return cidadeRepository;
    }

    @Override
    public CidadeModel update(Integer id, CidadeModel entity) {
        entity.setId(id);
        return super.update(id, entity);
    }
}
