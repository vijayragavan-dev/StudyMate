package com.rurallearn.models;

import jakarta.persistence.*;

/**
 * QuizQuestion entity
 */
@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    private String option1;
    private String option2;
    private String option3;
    private String option4;

    @Column(name = "correct_answer")
    private int correctAnswer; // 0-indexed

    private String subject;

    @Column(name = "class_level")
    private String classLevel;

    private String difficulty = "Medium";

    // Constructors
    public QuizQuestion() {}

    public QuizQuestion(String question, String o1, String o2, String o3, String o4,
                         int answer, String subject, String classLevel) {
        this.question = question;
        this.option1 = o1; this.option2 = o2;
        this.option3 = o3; this.option4 = o4;
        this.correctAnswer = answer;
        this.subject = subject;
        this.classLevel = classLevel;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getOption1() { return option1; }
    public void setOption1(String option1) { this.option1 = option1; }

    public String getOption2() { return option2; }
    public void setOption2(String option2) { this.option2 = option2; }

    public String getOption3() { return option3; }
    public void setOption3(String option3) { this.option3 = option3; }

    public String getOption4() { return option4; }
    public void setOption4(String option4) { this.option4 = option4; }

    public int getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(int correctAnswer) { this.correctAnswer = correctAnswer; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getClassLevel() { return classLevel; }
    public void setClassLevel(String classLevel) { this.classLevel = classLevel; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    // Helper: return options as array
    public String[] getOptions() {
        return new String[]{option1, option2, option3, option4};
    }
}
