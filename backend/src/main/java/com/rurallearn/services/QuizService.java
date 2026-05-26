package com.rurallearn.services;

import com.rurallearn.models.QuizQuestion;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * QuizService — manages quiz questions
 */
@Service
public class QuizService {

    private final Map<Long, QuizQuestion> questionStore = new LinkedHashMap<>();
    private final AtomicLong idGen = new AtomicLong(1);

    public QuizService() {
        // Seed Mathematics questions
        add("What is 7 × 8?", "54", "56", "64", "48", 1, "math", "Class 8");
        add("What is √144?", "11", "12", "13", "14", 1, "math", "Class 8");
        add("What is 25% of 200?", "25", "40", "50", "75", 2, "math", "Class 8");
        add("Area of circle with r=7? (π=22/7)", "44 cm²", "154 cm²", "176 cm²", "132 cm²", 1, "math", "Class 8");
        add("2x + 5 = 15. x = ?", "3", "4", "5", "6", 2, "math", "Class 9");

        // Science
        add("Water boils at?", "90°C", "95°C", "100°C", "110°C", 2, "science", "Class 8");
        add("Plants absorb which gas?", "Oxygen", "Nitrogen", "CO₂", "Hydrogen", 2, "science", "Class 8");
        add("Planet closest to Sun?", "Venus", "Mercury", "Earth", "Mars", 1, "science", "Class 8");
        add("Chemical formula of water?", "H₂O₂", "HO₂", "H₂O", "HO", 2, "science", "Class 7");
        add("What keeps planets in orbit?", "Magnetic", "Nuclear", "Gravity", "Friction", 2, "science", "Class 9");

        // GK
        add("Capital of India?", "Mumbai", "Kolkata", "New Delhi", "Chennai", 2, "general", "Class 6");
        add("National animal of India?", "Lion", "Elephant", "Tiger", "Peacock", 2, "general", "Class 6");
        add("Father of the Nation?", "Nehru", "Ambedkar", "Gandhi", "Bose", 2, "general", "Class 7");
        add("Longest river in India?", "Yamuna", "Ganga", "Godavari", "Brahmaputra", 3, "general", "Class 6");
        add("How many states in India?", "26", "27", "28", "29", 2, "general", "Class 6");
    }

    private void add(String q, String o1, String o2, String o3, String o4,
                     int ans, String subject, String cls) {
        long id = idGen.getAndIncrement();
        QuizQuestion qq = new QuizQuestion(q, o1, o2, o3, o4, ans, subject, cls);
        qq.setId(id);
        questionStore.put(id, qq);
    }

    public List<QuizQuestion> getQuestionsBySubject(String subject) {
        return questionStore.values().stream()
            .filter(q -> q.getSubject().equalsIgnoreCase(subject))
            .limit(10)
            .collect(Collectors.toList());
    }

    public List<QuizQuestion> getQuestionsByClass(String classLevel) {
        return questionStore.values().stream()
            .filter(q -> q.getClassLevel().equalsIgnoreCase(classLevel))
            .collect(Collectors.toList());
    }

    public Optional<QuizQuestion> getById(Long id) {
        return Optional.ofNullable(questionStore.get(id));
    }

    public QuizQuestion saveQuestion(QuizQuestion q) {
        if (q.getId() == null) q.setId(idGen.getAndIncrement());
        questionStore.put(q.getId(), q);
        return q;
    }

    public int evaluateQuiz(List<Long> questionIds, List<Integer> selectedAnswers) {
        int score = 0;
        for (int i = 0; i < questionIds.size(); i++) {
            QuizQuestion q = questionStore.get(questionIds.get(i));
            if (q != null && i < selectedAnswers.size()) {
                if (selectedAnswers.get(i) == q.getCorrectAnswer()) score++;
            }
        }
        return score;
    }
}
