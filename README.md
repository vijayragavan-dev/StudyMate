# 🌾 Studymate

A full-stack digital learning platform built with **HTML/CSS/JS (Frontend)** and **Java Spring Boot (Backend)**, designed to bring quality NCERT-aligned education to rural students across India.

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage with hero, features, subjects, testimonials |
| `courses.html` | Browse & filter all courses |
| `subjects.html` | Subject-wise lesson explorer |
| `quiz.html` | Interactive multi-subject quiz |
| `login.html` | Student login |
| `register.html` | Student registration |
| `about.html` | About, mission, team, contact |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5, CSS3, Vanilla JavaScript**
- Google Fonts (Sora, Space Mono)
- Fully responsive (mobile-first)
- Offline-ready design
- IntersectionObserver for scroll animations
- LocalStorage fallback for demo mode

### Backend (Java)
- **Spring Boot 3.1** — REST API framework
- **Spring Security** — Authentication
- **JWT (jjwt)** — Stateless token authentication
- **H2 Database** — In-memory DB for development
- **MySQL** — Production database (configured but optional)
- **BCrypt** — Password hashing

---

## 🗂️ Project Structure

```
digital-learning-platform/
├── frontend/
│   ├── index.html              # Homepage
│   ├── css/
│   │   └── main.css            # Global styles
│   ├── js/
│   │   └── main.js             # Interactivity + API calls
│   └── pages/
│       ├── courses.html        # All courses
│       ├── subjects.html       # Subject explorer
│       ├── quiz.html           # Quiz zone
│       ├── login.html          # Login
│       ├── register.html       # Register
│       └── about.html          # About us
│
└── backend/
    ├── pom.xml                 # Maven dependencies
    └── src/main/java/com/rurallearn/
        ├── GramShikshaApplication.java      # Entry point
        ├── models/
        │   ├── User.java                   # User entity
        │   ├── Course.java                 # Course entity
        │   └── QuizQuestion.java           # Quiz entity
        ├── controllers/
        │   ├── AuthController.java         # POST /api/auth/register, /login
        │   ├── CourseController.java       # GET/POST /api/courses
        │   └── QuizController.java         # GET/POST /api/quiz
        ├── services/
        │   ├── UserService.java            # User logic + UserDetailsService
        │   ├── CourseService.java          # Course CRUD
        │   └── QuizService.java            # Quiz logic + evaluation
        └── utils/
            ├── JwtUtil.java                # Token generation/validation
            ├── JwtRequestFilter.java       # JWT filter per request
            └── SecurityConfig.java         # Security configuration
```

---

## 🚀 How to Run

### Frontend
```bash
# Option 1: Open directly in browser
open frontend/index.html

# Option 2: Serve with VS Code Live Server or any HTTP server
cd frontend && python3 -m http.server 3000
# Visit: http://localhost:3000
```

### Backend
```bash
cd backend

# Build and run with Maven
mvn spring-boot:run

# Or build jar and run
mvn clean package
java -jar target/gramshiksha-backend-1.0.0.jar
```

Backend runs at: **http://localhost:8080**  
H2 Console: **http://localhost:8080/h2-console**

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new student |
| POST | `/api/auth/login` | Login, returns JWT token |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/subject/{subject}` | Filter by subject |
| GET | `/api/courses/class/{class}` | Filter by class |
| POST | `/api/courses/{id}/enroll` | Enroll in course |

### Quiz
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quiz?subject=math` | Get quiz questions |
| POST | `/api/quiz/submit` | Submit answers, get score |
| POST | `/api/quiz/questions` | Add question (teacher) |

---

## 📱 Sample API Requests

### Register
```json
POST /api/auth/register
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "password": "ravi1234",
  "classLevel": "Class 10",
  "village": "Chandpur, UP",
  "language": "Hindi"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "ravi@example.com",
  "password": "ravi1234"
}
```

### Submit Quiz
```json
POST /api/quiz/submit
Authorization: Bearer <token>
{
  "questionIds": [1, 2, 3, 4, 5],
  "selectedAnswers": [1, 2, 0, 1, 2]
}
```

---

## ✨ Key Features

- 🌐 **12 Indian Languages** — Hindi, Tamil, Telugu, Marathi, Bengali & more
- 📶 **Offline Ready** — Download and study without internet
- 🏆 **Gamified Quiz** — Earn points, badges, complete challenges
- 👩‍🏫 **Teacher Dashboard** — Monitor student progress
- 📱 **Mobile First** — Works on low-end Android phones
- 🆓 **100% Free** — NCERT-aligned, no hidden fees
- 🔒 **JWT Auth** — Secure stateless authentication
- 🗄️ **H2 / MySQL** — Works in dev and production

---

## 🔧 Production Setup (MySQL)

In `application.properties`, uncomment:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gramshiksha
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

Create MySQL database:
```sql
CREATE DATABASE gramshiksha;
```

---

Built with ❤️ for rural India | GramShiksha © 2024
