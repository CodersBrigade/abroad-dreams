package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface   StudentRepo extends JpaRepository<Student, Long> {
}
