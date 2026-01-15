package com.starter_squad.lms.repository;

import com.starter_squad.lms.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import com.starter_squad.lms.entity.User;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

	User findByEmail(String email);

    boolean existsByRole(UserRole role);

	User findByEmailAndPassword(String email, String password);
}
