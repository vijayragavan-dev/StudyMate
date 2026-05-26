package com.rurallearn.services;

import com.rurallearn.models.Course;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.atomic.AtomicLong;

/**
 * CourseService — manages courses (in-memory for demo)
 */
@Service
public class CourseService {

    private final Map<Long, Course> courseStore = new LinkedHashMap<>();
    private final AtomicLong idGen = new AtomicLong(1);

    public CourseService() {
        // Seed some demo courses
        seed("Mathematics Class 8", "Algebra, geometry, mensuration and statistics.", "math", "Class 8", 24, "📐", "Intermediate");
        seed("Science Class 10", "Physics, Chemistry and Biology board syllabus.", "science", "Class 10", 30, "🔬", "Advanced");
        seed("Hindi Grammar Class 6", "Vyakaran, kavita aur lekhan.", "hindi", "Class 6", 18, "📖", "Beginner");
        seed("English Grammar Class 5", "Tenses, vocabulary and comprehension.", "english", "Class 5", 15, "🔤", "Beginner");
        seed("Social Studies Class 7", "History, Geography and Civics.", "social", "Class 7", 20, "🌍", "Intermediate");
        seed("Computer Basics Class 9", "MS Office and introduction to programming.", "computer", "Class 9", 16, "💻", "Intermediate");
        seed("Mathematics Class 12", "Calculus, probability and vectors.", "math", "Class 12", 36, "📐", "Advanced");
        seed("Science Class 6", "Food, living things and motion.", "science", "Class 6", 22, "🔬", "Beginner");
        seed("Hindi Class 3", "Stories, poems and basic grammar.", "hindi", "Class 3", 12, "📖", "Beginner");
        seed("English Class 10", "Literature and grammar for board exams.", "english", "Class 10", 28, "🔤", "Advanced");
    }

    private void seed(String title, String desc, String subject, String cls, int lessons, String icon, String diff) {
        long id = idGen.getAndIncrement();
        Course c = new Course(title, desc, subject, cls, lessons, icon, diff);
        c.setId(id);
        c.setEnrolledCount((int)(Math.random() * 1000 + 100));
        courseStore.put(id, c);
    }

    public List<Course> getAllCourses() {
        return new ArrayList<>(courseStore.values());
    }

    public List<Course> getCoursesBySubject(String subject) {
        return courseStore.values().stream()
            .filter(c -> c.getSubject().equalsIgnoreCase(subject))
            .collect(Collectors.toList());
    }

    public List<Course> getCoursesByClass(String classLevel) {
        return courseStore.values().stream()
            .filter(c -> c.getClassLevel().equalsIgnoreCase(classLevel))
            .collect(Collectors.toList());
    }

    public Optional<Course> getCourseById(Long id) {
        return Optional.ofNullable(courseStore.get(id));
    }

    public Course saveCourse(Course course) {
        if (course.getId() == null) course.setId(idGen.getAndIncrement());
        courseStore.put(course.getId(), course);
        return course;
    }

    public void deleteCourse(Long id) {
        courseStore.remove(id);
    }
}
