package br.com.cispar.modules.fornecedores.service.impl;

import br.com.cispar.modules.fornecedores.domain.FornecedorModel;
import br.com.cispar.modules.fornecedores.repository.FornecedorRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class FornecedorService extends CrudService<FornecedorModel, Integer> {

    private final FornecedorRepository fornecedorRepository;

    public FornecedorService(FornecedorRepository fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }

    @Override
    protected JpaRepository<FornecedorModel, Integer> getRespository() {
        return fornecedorRepository;
    }

    @Override
    public FornecedorModel update(Integer id, FornecedorModel entity) {
        entity.setId(id);
        return super.update(id, entity);
    }
}
