package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepo extends JpaRepository<StudentProfile, Long> {

}
