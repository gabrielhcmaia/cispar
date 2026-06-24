package br.com.cispar.modules.users.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "username", length = 100)
    private String username;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "password", length = 60)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(name = "perfil", length = 20)
    private Perfil perfil;

    @Column(name = "cargo", length = 100)
    private String cargo;

    @Column(name = "active")
    private boolean active;

    @Column(name = "last_access")
    private LocalDateTime lastAccess;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "UserModel{"
                + "id=" + id
                + ", name='" + name + '\''
                + ", username='" + username + '\''
                + ", email='" + email + '\''
                + ", role=" + role
                + ", perfil=" + perfil
                + ", cargo='" + cargo + '\''
                + ", active=" + active
                + ", lastAccess=" + lastAccess
                + ", createdAt=" + createdAt
                + ", updatedAt=" + updatedAt
                + '}';
    }
}
