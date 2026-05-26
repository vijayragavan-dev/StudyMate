package com.rurallearn.controllers;

import com.rurallearn.models.QuizQuestion;
import com.rurallearn.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * QuizController — manages quiz questions and quiz submissions
 */
@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // GET questions by subject
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getQuizBySubject(
            @RequestParam(defaultValue = "general") String subject) {
        List<QuizQuestion> questions = quizService.getQuestionsBySubject(subject);
        // Map to safe response (hide correctAnswer for real quiz)
        List<Map<String, Object>> response = questions.stream().map(q -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", q.getId());
            map.put("question", q.getQuestion());
            map.put("options", q.getOptions());
            map.put("answer", q.getCorrectAnswer()); // In production, submit & validate server-side
            return map;
        }).toList();
        return ResponseEntity.ok(response);
    }

    // GET questions by class level
    @GetMapping("/class/{classLevel}")
    public ResponseEntity<List<QuizQuestion>> getQuizByClass(@PathVariable String classLevel) {
        return ResponseEntity.ok(quizService.getQuestionsByClass(classLevel));
    }

    // POST submit quiz answers
    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitQuiz(@RequestBody QuizSubmission submission) {
        int score = quizService.evaluateQuiz(submission.questionIds, submission.selectedAnswers);
        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("total", submission.questionIds.size());
        result.put("percentage", (score * 100) / submission.questionIds.size());
        result.put("passed", score >= (submission.questionIds.size() / 2));
        int points = score * 10;
        result.put("pointsEarned", points);
        result.put("message", score >= 4 ? "Excellent!" : score >= 3 ? "Good job!" : "Keep studying!");
        return ResponseEntity.ok(result);
    }

    // POST add question (Teacher/Admin)
    @PostMapping("/questions")
    public ResponseEntity<QuizQuestion> addQuestion(@RequestBody QuizQuestion question) {
        return ResponseEntity.ok(quizService.saveQuestion(question));
    }

    static class QuizSubmission {
        public List<Long> questionIds;
        public List<Integer> selectedAnswers;
    }
}
