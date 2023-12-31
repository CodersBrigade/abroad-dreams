package com.adreams.abroad_dreams_back.repo;

import com.adreams.abroad_dreams_back.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProfileRepo extends JpaRepository<StudentProfile, Long> {
    // You can add custom query methods here if needed
}
