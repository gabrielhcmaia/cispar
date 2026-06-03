package br.com.cispar.modules.users.service.impl;

import br.com.cispar.modules.users.domain.UserModel;
import br.com.cispar.modules.users.repository.UserRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends CrudService<UserModel, Long> {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected JpaRepository<UserModel, Long> getRespository() {
        return userRepository;
    }

}
