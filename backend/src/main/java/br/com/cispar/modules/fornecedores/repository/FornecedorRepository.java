package br.com.cispar.modules.fornecedores.repository;

import br.com.cispar.modules.fornecedores.domain.FornecedorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FornecedorRepository extends JpaRepository<FornecedorModel, Integer> {
}
