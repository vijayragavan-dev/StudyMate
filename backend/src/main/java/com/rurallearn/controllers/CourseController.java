package com.rurallearn.controllers;

import com.rurallearn.models.Course;
import com.rurallearn.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CourseController — CRUD for courses
 */
@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // GET all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // GET courses by subject
    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Course>> getBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(courseService.getCoursesBySubject(subject));
    }

    // GET courses by class level
    @GetMapping("/class/{classLevel}")
    public ResponseEntity<List<Course>> getByClass(@PathVariable String classLevel) {
        return ResponseEntity.ok(courseService.getCoursesByClass(classLevel));
    }

    // GET single course
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourse(@PathVariable Long id) {
        return courseService.getCourseById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST create course (Admin only in real app)
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    // PUT update course
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course updated) {
        return courseService.getCourseById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setDescription(updated.getDescription());
            existing.setSubject(updated.getSubject());
            existing.setClassLevel(updated.getClassLevel());
            existing.setTotalLessons(updated.getTotalLessons());
            existing.setDifficulty(updated.getDifficulty());
            return ResponseEntity.ok(courseService.saveCourse(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE course
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }

    // POST enroll
    @PostMapping("/{id}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long id) {
        return courseService.getCourseById(id).map(course -> {
            course.setEnrolledCount(course.getEnrolledCount() + 1);
            courseService.saveCourse(course);
            return ResponseEntity.ok().body("Enrolled successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
}
