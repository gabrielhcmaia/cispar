package br.com.cispar.modules.users.controller;

import br.com.cispar.modules.users.domain.Perfil;
import br.com.cispar.modules.users.domain.UserModel;
import br.com.cispar.modules.users.domain.UserRole;
import br.com.cispar.modules.users.dto.UserRequestDto;
import br.com.cispar.modules.users.dto.UserResponseDto;
import br.com.cispar.modules.users.service.impl.UserService;
import br.com.cispar.shared.controller.CrudController;
import br.com.cispar.shared.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController extends CrudController<UserModel, Long, UserRequestDto, UserResponseDto> {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected CrudService<UserModel, Long> getService() {
        return userService;
    }

    @Override
    protected UserModel toEntity(UserRequestDto dto) {
        UserModel user = new UserModel();
        user.setName(dto.nome());
        user.setEmail(dto.email());
        user.setUsername(dto.email());
        user.setPassword(dto.senha());
        user.setPerfil(dto.perfil());
        user.setRole(toRole(dto.perfil()));
        user.setCargo(dto.cargo());
        user.setActive(dto.ativo());
        return user;
    }

    @Override
    protected UserResponseDto toResponse(UserModel user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPerfil(),
                user.getCargo(),
                user.isActive(),
                user.getLastAccess(),
                user.getCreatedAt()
        );
    }

    @Override
    protected Long extractId(UserModel user) {
        return user.getId();
    }

    private UserRole toRole(Perfil perfil) {
        return perfil == Perfil.ADMINISTRADOR ? UserRole.ADMIN : UserRole.USER;
    }
}
