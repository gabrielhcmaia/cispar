package br.com.cispar.modules.users.service.impl;

import br.com.cispar.modules.users.domain.UserModel;
import br.com.cispar.modules.users.repository.UserRepository;
import br.com.cispar.shared.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService extends CrudService<UserModel, Long> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected JpaRepository<UserModel, Long> getRespository() {
        return userRepository;
    }

    @Override
    public UserModel create(UserModel entity) {
        if (entity.getPassword() == null || entity.getPassword().isBlank()) {
            throw new IllegalArgumentException("Senha é obrigatória.");
        }
        LocalDateTime now = LocalDateTime.now();
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setCreatedAt(now);
        entity.setUpdatedAt(now);
        return super.create(entity);
    }

    @Override
    public UserModel update(Long id, UserModel entity) {
        UserModel existing = findById(id);
        if (entity.getPassword() == null || entity.getPassword().isBlank()) {
            entity.setPassword(existing.getPassword());
        } else {
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        }
        entity.setId(id);
        entity.setCreatedAt(existing.getCreatedAt());
        entity.setLastAccess(existing.getLastAccess());
        entity.setUpdatedAt(LocalDateTime.now());
        return super.update(id, entity);
    }
}
