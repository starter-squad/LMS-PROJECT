package com.starter_squad.lms.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.starter_squad.lms.entity.Course;

import java.util.UUID;


public interface CourseRepository extends JpaRepository<Course, UUID> {
}