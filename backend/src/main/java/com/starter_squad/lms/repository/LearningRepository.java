package com.starter_squad.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.starter_squad.lms.entity.Course;
import com.starter_squad.lms.entity.Learning;
import com.starter_squad.lms.entity.User;

import java.util.UUID;

public interface LearningRepository extends JpaRepository<Learning, UUID> {

	Learning findByUserAndCourse(User user, Course course);
}