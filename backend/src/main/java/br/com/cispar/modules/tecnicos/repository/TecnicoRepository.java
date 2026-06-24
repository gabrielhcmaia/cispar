package br.com.cispar.modules.tecnicos.repository;

import br.com.cispar.modules.tecnicos.domain.TecnicoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TecnicoRepository extends JpaRepository<TecnicoModel, Integer> {
}
