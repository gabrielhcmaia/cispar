package br.com.cispar.shared.service;

import br.com.cispar.shared.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class CrudService<T, ID> {
    protected abstract JpaRepository<T, ID> getRespository();

    public List<T> findAll(){
        return getRespository().findAll();
    }

    public T findById(ID id){
        return getRespository().findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public T create(T entity){
        return getRespository().save(entity);
    }

    public T update(ID id, T entity){
            if(!getRespository().existsById(id)){
                throw new ResourceNotFoundException(id);
            }
            return getRespository().save(entity);
    }

    public void delete(ID id){
        if(!getRespository().existsById(id)){
            throw new ResourceNotFoundException(id);
        }
        getRespository().deleteById(id);
    }
}

