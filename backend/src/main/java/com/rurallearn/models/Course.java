package com.rurallearn.models;

import jakarta.persistence.*;

/**
 * Course entity
 */
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String subject;

    @Column(name = "class_level")
    private String classLevel;

    private String language = "Hindi";

    @Column(name = "total_lessons")
    private int totalLessons;

    private String icon;

    private boolean free = true;

    private String difficulty; // Beginner, Intermediate, Advanced

    @Column(name = "enrolled_count")
    private int enrolledCount = 0;

    // Constructors
    public Course() {}

    public Course(String title, String description, String subject,
                  String classLevel, int totalLessons, String icon, String difficulty) {
        this.title = title;
        this.description = description;
        this.subject = subject;
        this.classLevel = classLevel;
        this.totalLessons = totalLessons;
        this.icon = icon;
        this.difficulty = difficulty;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getClassLevel() { return classLevel; }
    public void setClassLevel(String classLevel) { this.classLevel = classLevel; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public int getTotalLessons() { return totalLessons; }
    public void setTotalLessons(int totalLessons) { this.totalLessons = totalLessons; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public boolean isFree() { return free; }
    public void setFree(boolean free) { this.free = free; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getEnrolledCount() { return enrolledCount; }
    public void setEnrolledCount(int enrolledCount) { this.enrolledCount = enrolledCount; }
}
