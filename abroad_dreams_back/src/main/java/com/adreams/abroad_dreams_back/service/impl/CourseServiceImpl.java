package com.adreams.abroad_dreams_back.service.impl;

import com.adreams.abroad_dreams_back.entity.Course;
import com.adreams.abroad_dreams_back.pojo.CoursePojo;
import com.adreams.abroad_dreams_back.repo.CourseRepo;
import com.adreams.abroad_dreams_back.service.CourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;


    @Override
    public String save(CoursePojo coursePojo) {
        Course course;

        if (coursePojo.getCourseId() != null) {
            course = courseRepo.findById(coursePojo.getCourseId())
                    .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + coursePojo.getCourseId()));
        } else {
            course = new Course();
        }

        // Set values from CoursePojo to Course entity
        course.setCourseName(coursePojo.getCourseName());
        course.setCredits(coursePojo.getCredits());
        course.setDurationYears(coursePojo.getDurationYears());
        course.setCourseFee(coursePojo.getCourseFee());
        course.setAvailability(coursePojo.isAvailability());

        courseRepo.save(course);
        return "Saved Successfully!";
    }

    @Override
    public List<Course> getAll() {
        return courseRepo.findAll();
    }

    @Override
    public void deleteById(Long id) {
        courseRepo.deleteById(id);
    }

    @Override
    public Optional<Course> getById(Long id) {
        return courseRepo.findById(id);
    }

    @Override
    public String update(Long id, CoursePojo coursePojo) {
        Course existingCourse = courseRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with ID: " + id));

        // Update existingCourse with values from CoursePojo
        existingCourse.setCourseName(coursePojo.getCourseName());
        existingCourse.setCredits(coursePojo.getCredits());
        existingCourse.setDurationYears(coursePojo.getDurationYears());
        existingCourse.setCourseFee(coursePojo.getCourseFee());
        existingCourse.setAvailability(coursePojo.isAvailability());


        courseRepo.save(existingCourse);
        return "Updated Successfully!";
    }
}
