package br.com.cispar.modules.users.controller;

import br.com.cispar.modules.users.domain.UserModel;
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
        user.setName(dto.name());
        user.setUsername(dto.username());
        user.setRole(dto.role());
        user.setActive(dto.active());
        user.setCreatedAt(dto.createdAt());
        user.setUpdatedAt(dto.updatedAt());
        return user;
    }

    @Override
    protected UserResponseDto toResponse(UserModel user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getUsername(), user.getRole(), user.isActive(), user.getCreatedAt(), user.getUpdatedAt());
    }

    @Override
    protected Long extractId(UserModel user) {
        return user.getId();
    }
}
