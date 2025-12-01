import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

// Models
import Student from "../models/student.js";
import Admin from "../models/admin.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Certificate from "../models/Certificate.js";
import Submission from "../models/Submission.js";
import Leaderboard from "../models/Leaderboard.js";
import Referral from "../models/Referral.js";
import SupportQuery from "../models/SupportQuery.js";
import RefreshToken from "../models/RefreshToken.js";

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

// ============================================
// DUMMY DATA
// ============================================

const users = [
    {
        email: "admin@code2dbug.com",
        password: "admin123456",
        name: "Admin",
        lastName: "User",
        role: "admin",
        accountStatus: "verified",
        collegeName: "Code2Dbug Academy",
        courseName: "Administration",
        yearOfStudy: "N/A",
        courses: [], // Admin doesn't have enrolled courses
    },
    {
        email: "alex.johnson@example.com",
        password: "student123456",
        name: "Alex",
        lastName: "Johnson",
        role: "student",
        accountStatus: "verified",
        collegeName: "Indore Institute of Science & Technology",
        courseName: "B.Tech Computer Science",
        yearOfStudy: "3rd Year",
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson",
        xp: 5400,
        streak: 12,
        hoursLearned: 50,
        quizzesCompleted: 4,
        assignmentsCompleted: 3,
        lmsId: "LMS001",
        lmsPassword: "lmspass123",
        courses: [], // Will be populated after courses are created
    },
    {
        email: "sarah.connor@example.com",
        password: "student123456",
        name: "Sarah",
        lastName: "Connor",
        role: "student",
        accountStatus: "verified",
        collegeName: "MIT",
        courseName: "B.Tech AI & ML",
        yearOfStudy: "4th Year",
        xp: 12500,
        streak: 45,
        hoursLearned: 180,
        quizzesCompleted: 12,
        assignmentsCompleted: 10,
        lmsId: "LMS002",
        lmsPassword: "lmspass123",
        courses: [],
    },
    {
        email: "john.wick@example.com",
        password: "student123456",
        name: "John",
        lastName: "Wick",
        role: "student",
        accountStatus: "verified",
        collegeName: "Stanford University",
        courseName: "B.Tech Computer Science",
        yearOfStudy: "2nd Year",
        xp: 11200,
        streak: 30,
        hoursLearned: 160,
        quizzesCompleted: 10,
        assignmentsCompleted: 8,
        lmsId: "LMS003",
        lmsPassword: "lmspass123",
        courses: [],
    },
    {
        email: "tony.stark@example.com",
        password: "student123456",
        name: "Tony",
        lastName: "Stark",
        role: "student",
        accountStatus: "verified",
        collegeName: "Caltech",
        courseName: "B.Tech Electronics",
        yearOfStudy: "4th Year",
        xp: 10800,
        streak: 12,
        hoursLearned: 140,
        quizzesCompleted: 15,
        assignmentsCompleted: 12,
        lmsId: "LMS004",
        lmsPassword: "lmspass123",
        courses: [],
    },
    {
        email: "bruce.wayne@example.com",
        password: "student123456",
        name: "Bruce",
        lastName: "Wayne",
        role: "student",
        accountStatus: "verified",
        collegeName: "Princeton University",
        courseName: "B.Tech Computer Science",
        yearOfStudy: "3rd Year",
        xp: 9500,
        streak: 20,
        hoursLearned: 120,
        quizzesCompleted: 8,
        assignmentsCompleted: 6,
        lmsId: "LMS005",
        lmsPassword: "lmspass123",
        courses: [],
    },
    {
        // Unenrolled student (new status)
        email: "peter.parker@example.com",
        password: "student123456",
        name: "Peter",
        lastName: "Parker",
        role: "student",
        accountStatus: "unenrolled",
        collegeName: "Empire State University",
        courseName: "B.Tech Physics",
        yearOfStudy: "2nd Year",
        xp: 0,
        streak: 0,
        hoursLearned: 0,
        quizzesCompleted: 0,
        assignmentsCompleted: 0,
        courses: [],
    },
];

const courses = [
    {
        title: "Full Stack Web Development",
        slug: "full-stack-web-development",
        description:
            "Master the art of building complete web applications from frontend to backend. Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.",
        thumbnail:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
        stream: "Web Development",
        level: "Beginner",
        price: 4999,
        discountedPrice: 2999,
        totalDuration: "12 weeks",
        isPublished: true,
        tags: ["web", "react", "nodejs", "mongodb", "javascript"],
        modules: [
            {
                title: "Module 1: HTML & CSS Fundamentals",
                timeline: "Week 1-2",
                description: "Learn the building blocks of web development",
                order: 1,
                lessons: [
                    {
                        title: "Introduction to HTML5",
                        type: "video",
                        contentUrls: ["https://example.com/video1"],
                        duration: 10,
                        isFreePreview: true,
                        notes: "HTML is the standard markup language for creating web pages.",
                    },
                    {
                        title: "CSS Box Model & Flexbox",
                        type: "video",
                        contentUrls: ["https://example.com/video2"],
                        duration: 25,
                        notes: "Understanding the CSS box model and flexbox layout.",
                    },
                    {
                        title: "Responsive Design with Media Queries",
                        type: "video",
                        contentUrls: ["https://example.com/video3"],
                        duration: 20,
                        notes: "Creating responsive layouts for all devices.",
                    },
                ],
                tasks: [
                    {
                        title: "Build a Landing Page",
                        description:
                            "Create a fully responsive landing page using HTML, CSS, and JavaScript. The page must include a header with navigation, a hero section, a features section, and a footer.",
                        dueInDays: 7,
                    },
                ],
                quizzes: [
                    {
                        title: "Frontend Basics Quiz",
                        questions: [
                            {
                                questionText:
                                    "Which HTML tag is used to define an internal style sheet?",
                                options: [
                                    "<css>",
                                    "<script>",
                                    "<style>",
                                    "<link>",
                                ],
                                correctAnswer: 2,
                                explanation:
                                    "The <style> tag is used to define internal CSS styles.",
                            },
                            {
                                questionText: "What does CSS stand for?",
                                options: [
                                    "Cascading Style Sheets",
                                    "Computer Style Sheets",
                                    "Creative Style Sheets",
                                    "Colorful Style Sheets",
                                ],
                                correctAnswer: 0,
                                explanation:
                                    "CSS stands for Cascading Style Sheets.",
                            },
                            {
                                questionText:
                                    "Which property is used to change the background color?",
                                options: [
                                    "color",
                                    "bgcolor",
                                    "background-color",
                                    "bg-color",
                                ],
                                correctAnswer: 2,
                                explanation:
                                    "The background-color property sets the background color of an element.",
                            },
                            {
                                questionText:
                                    'How do you select an element with id "demo"?',
                                options: ["#demo", ".demo", "demo", "*demo"],
                                correctAnswer: 0,
                                explanation:
                                    "In CSS, # is used to select elements by their ID.",
                            },
                            {
                                questionText:
                                    "Which HTML attribute is used to define inline styles?",
                                options: ["class", "style", "font", "styles"],
                                correctAnswer: 1,
                                explanation:
                                    "The style attribute is used for inline CSS.",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Module 2: JavaScript Essentials",
                timeline: "Week 3-4",
                description: "Master JavaScript programming fundamentals",
                order: 2,
                lessons: [
                    {
                        title: "Variables, Types & Functions",
                        type: "video",
                        contentUrls: ["https://example.com/video4"],
                        duration: 15,
                        notes: "Understanding JavaScript variables and functions.",
                    },
                    {
                        title: "DOM Manipulation",
                        type: "video",
                        contentUrls: ["https://example.com/video5"],
                        duration: 30,
                        notes: "Learn to manipulate the Document Object Model.",
                    },
                    {
                        title: "ES6+ Features",
                        type: "video",
                        contentUrls: ["https://example.com/video6"],
                        duration: 25,
                        notes: "Modern JavaScript features like arrow functions, destructuring, etc.",
                    },
                ],
                tasks: [
                    {
                        title: "Interactive To-Do List",
                        description:
                            "Build an interactive to-do list application with add, delete, and complete functionality.",
                        dueInDays: 7,
                    },
                ],
                quizzes: [
                    {
                        title: "JS Logic Quiz",
                        questions: [
                            {
                                questionText:
                                    "Which keyword is used to declare a constant in JavaScript?",
                                options: ["var", "let", "const", "constant"],
                                correctAnswer: 2,
                                explanation:
                                    "The const keyword is used to declare constants.",
                            },
                            {
                                questionText:
                                    "What is the output of typeof null?",
                                options: [
                                    "null",
                                    "undefined",
                                    "object",
                                    "string",
                                ],
                                correctAnswer: 2,
                                explanation:
                                    "typeof null returns 'object' due to a historical bug in JavaScript.",
                            },
                            {
                                questionText:
                                    "Which method adds an element to the end of an array?",
                                options: [
                                    "push()",
                                    "pop()",
                                    "shift()",
                                    "unshift()",
                                ],
                                correctAnswer: 0,
                                explanation:
                                    "The push() method adds elements to the end of an array.",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Module 3: React Framework",
                timeline: "Week 5-7",
                description: "Build modern user interfaces with React",
                order: 3,
                lessons: [
                    {
                        title: "React Components & JSX",
                        type: "video",
                        contentUrls: ["https://example.com/video7"],
                        duration: 20,
                        notes: "Introduction to React components and JSX syntax.",
                    },
                    {
                        title: "React Hooks: useState & useEffect",
                        type: "video",
                        contentUrls: ["https://example.com/video8"],
                        duration: 35,
                        notes: "Managing state and side effects in React.",
                    },
                    {
                        title: "React Router & Navigation",
                        type: "video",
                        contentUrls: ["https://example.com/video9"],
                        duration: 25,
                        notes: "Client-side routing with React Router.",
                    },
                ],
                tasks: [
                    {
                        title: "React Portfolio Website",
                        description:
                            "Create a personal portfolio website using React with multiple pages.",
                        dueInDays: 10,
                    },
                ],
                quizzes: [
                    {
                        title: "React Fundamentals Quiz",
                        questions: [
                            {
                                questionText: "What is the virtual DOM?",
                                options: [
                                    "A copy of the real DOM in memory",
                                    "A new HTML element",
                                    "A CSS framework",
                                    "A JavaScript library",
                                ],
                                correctAnswer: 0,
                                explanation:
                                    "The virtual DOM is a lightweight copy of the real DOM kept in memory.",
                            },
                            {
                                questionText:
                                    "Which hook is used to manage state in functional components?",
                                options: [
                                    "useEffect",
                                    "useState",
                                    "useContext",
                                    "useReducer",
                                ],
                                correctAnswer: 1,
                                explanation:
                                    "useState is the primary hook for managing local state.",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Module 4: Node.js & Express",
                timeline: "Week 8-9",
                description: "Server-side JavaScript with Node.js and Express",
                order: 4,
                lessons: [
                    {
                        title: "Introduction to Node.js",
                        type: "video",
                        contentUrls: ["https://example.com/video10"],
                        duration: 20,
                        notes: "Getting started with Node.js runtime.",
                    },
                    {
                        title: "Building REST APIs with Express",
                        type: "video",
                        contentUrls: ["https://example.com/video11"],
                        duration: 40,
                        notes: "Creating RESTful APIs using Express framework.",
                    },
                ],
                tasks: [
                    {
                        title: "Build a REST API",
                        description:
                            "Create a complete REST API for a blog application.",
                        dueInDays: 7,
                    },
                ],
                quizzes: [
                    {
                        title: "Backend Basics Quiz",
                        questions: [
                            {
                                questionText: "What is Express.js?",
                                options: [
                                    "A database",
                                    "A web framework for Node.js",
                                    "A CSS library",
                                    "A testing tool",
                                ],
                                correctAnswer: 1,
                                explanation:
                                    "Express.js is a minimal web framework for Node.js.",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Module 5: MongoDB & Mongoose",
                timeline: "Week 10-11",
                description: "NoSQL database with MongoDB",
                order: 5,
                lessons: [
                    {
                        title: "MongoDB Basics",
                        type: "video",
                        contentUrls: ["https://example.com/video12"],
                        duration: 25,
                        notes: "Introduction to NoSQL and MongoDB.",
                    },
                    {
                        title: "Mongoose ODM",
                        type: "video",
                        contentUrls: ["https://example.com/video13"],
                        duration: 30,
                        notes: "Object Data Modeling with Mongoose.",
                    },
                ],
                tasks: [
                    {
                        title: "Database Integration",
                        description:
                            "Connect your REST API to MongoDB and implement CRUD operations.",
                        dueInDays: 7,
                    },
                ],
                quizzes: [],
            },
        ],
        capstoneProjects: [
            {
                title: "Capstone: E-Commerce Platform",
                description:
                    "Build a complete e-commerce platform with user authentication, product listings, cart functionality, and payment integration.",
                requirements: [
                    "User authentication (signup/login)",
                    "Product catalog with search and filters",
                    "Shopping cart functionality",
                    "Checkout process",
                    "Admin dashboard for managing products",
                ],
                deliverables: [
                    "GitHub repository with source code",
                    "Live deployment link",
                    "Demo video walkthrough",
                    "Documentation",
                ],
                isLocked: true,
            },
        ],
    },
    {
        title: "Data Structures & Algorithms",
        slug: "data-structures-algorithms",
        description:
            "Master essential data structures and algorithms for coding interviews and competitive programming.",
        thumbnail:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        stream: "Computer Science",
        level: "Intermediate",
        price: 3999,
        discountedPrice: 1999,
        totalDuration: "10 weeks",
        isPublished: true,
        tags: ["dsa", "algorithms", "coding", "interviews"],
        modules: [
            {
                title: "Module 1: Introduction to DSA",
                timeline: "Week 1",
                description: "Understanding the importance of DSA",
                order: 1,
                lessons: [
                    {
                        title: "What is DSA?",
                        type: "video",
                        contentUrls: ["https://example.com/dsa1"],
                        duration: 20,
                        isFreePreview: true,
                        notes: "Introduction to Data Structures and Algorithms.",
                    },
                    {
                        title: "Time & Space Complexity",
                        type: "video",
                        contentUrls: ["https://example.com/dsa2"],
                        duration: 30,
                        notes: "Understanding Big O notation.",
                    },
                ],
                tasks: [
                    {
                        title: "Complexity Analysis",
                        description:
                            "Analyze the time and space complexity of given algorithms.",
                        dueInDays: 5,
                    },
                ],
                quizzes: [
                    {
                        title: "Complexity Quiz",
                        questions: [
                            {
                                questionText:
                                    "What is the time complexity of binary search?",
                                options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                                correctAnswer: 1,
                                explanation:
                                    "Binary search has O(log n) time complexity.",
                            },
                            {
                                questionText: "Which data structure uses LIFO?",
                                options: [
                                    "Queue",
                                    "Stack",
                                    "Array",
                                    "Linked List",
                                ],
                                correctAnswer: 1,
                                explanation:
                                    "Stack follows Last In First Out (LIFO) principle.",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Module 2: Arrays & Strings",
                timeline: "Week 2-3",
                description: "Master array and string manipulation",
                order: 2,
                lessons: [
                    {
                        title: "Array Operations",
                        type: "video",
                        contentUrls: ["https://example.com/dsa3"],
                        duration: 25,
                        notes: "Common array operations and techniques.",
                    },
                    {
                        title: "String Algorithms",
                        type: "video",
                        contentUrls: ["https://example.com/dsa4"],
                        duration: 30,
                        notes: "String manipulation and pattern matching.",
                    },
                ],
                tasks: [],
                quizzes: [],
            },
        ],
        capstoneProjects: [
            {
                title: "Capstone: Algorithm Visualizer",
                description:
                    "Build an interactive algorithm visualizer web application.",
                requirements: [
                    "Visualize sorting algorithms",
                    "Visualize pathfinding algorithms",
                ],
                deliverables: ["GitHub repository", "Live demo"],
                isLocked: true,
            },
        ],
    },
    {
        title: "Python for Data Science",
        slug: "python-data-science",
        description:
            "Learn Python programming for data analysis, visualization, and machine learning.",
        thumbnail:
            "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
        stream: "Data Science",
        level: "Beginner",
        price: 4499,
        discountedPrice: 2499,
        totalDuration: "8 weeks",
        isPublished: true,
        tags: ["python", "data-science", "pandas", "numpy", "machine-learning"],
        modules: [
            {
                title: "Module 1: Python Basics",
                timeline: "Week 1-2",
                description: "Python programming fundamentals",
                order: 1,
                lessons: [
                    {
                        title: "Getting Started with Python",
                        type: "video",
                        contentUrls: ["https://example.com/py1"],
                        duration: 15,
                        isFreePreview: true,
                        notes: "Setting up Python environment.",
                    },
                    {
                        title: "Python Data Types",
                        type: "video",
                        contentUrls: ["https://example.com/py2"],
                        duration: 25,
                        notes: "Understanding Python data types.",
                    },
                ],
                tasks: [
                    {
                        title: "Python Basics Exercise",
                        description:
                            "Complete basic Python programming exercises.",
                        dueInDays: 7,
                    },
                ],
                quizzes: [
                    {
                        title: "Python Basics Quiz",
                        questions: [
                            {
                                questionText:
                                    "Which of the following is NOT a Python data type?",
                                options: [
                                    "list",
                                    "tuple",
                                    "array",
                                    "dictionary",
                                ],
                                correctAnswer: 2,
                                explanation:
                                    "Array is not a built-in Python data type (use list instead).",
                            },
                        ],
                    },
                ],
            },
        ],
        capstoneProjects: [],
    },
];

// ============================================
// SEED FUNCTIONS
// ============================================

const seedUsers = async () => {
    console.log("🌱 Seeding Users...");
    await User.deleteMany({});
    await RefreshToken.deleteMany({}); // Clear refresh tokens when clearing users

    const createdUsers = [];
    for (const userData of users) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        console.log(`   ✓ Created user: ${user.email} (${user.accountStatus})`);
    }
    return createdUsers;
};

const seedCourses = async (adminUser) => {
    console.log("🌱 Seeding Courses...");
    await Course.deleteMany({});

    const createdCourses = [];
    for (const courseData of courses) {
        const course = await Course.create({
            ...courseData,
            instructor: adminUser._id,
        });
        createdCourses.push(course);
        console.log(`   ✓ Created course: ${course.title}`);
    }
    return createdCourses;
};

const seedEnrollments = async (students, courses) => {
    console.log("🌱 Seeding Enrollments...");
    await Enrollment.deleteMany({});

    const enrollments = [];

    // Enroll Alex in Full Stack Web Development
    const alex = students.find((s) => s.email === "alex.johnson@example.com");
    const fullStackCourse = courses.find(
        (c) => c.slug === "full-stack-web-development"
    );

    if (alex && fullStackCourse) {
        // Get first 2 lessons as completed
        const completedLessons = [];
        if (fullStackCourse.modules[0]?.lessons) {
            completedLessons.push(
                fullStackCourse.modules[0].lessons[0]._id,
                fullStackCourse.modules[0].lessons[1]._id
            );
        }

        const enrollment = await Enrollment.create({
            student: alex._id,
            course: fullStackCourse._id,
            checkoutDetails: {
                firstName: alex.name,
                lastName: alex.lastName,
                collegeName: alex.collegeName,
                degreeCourseName: alex.courseName,
                yearOfStudy: alex.yearOfStudy,
                email: alex.email,
                phoneNumber: "9876543210",
            },
            paymentStatus: "paid",
            amountPaid: fullStackCourse.discountedPrice,
            transactionId: "TXN_ALEX_001",
            completedLessons,
            progressPercentage: 40,
            lmsIssuedId: "LMS-ALEX-001",
            lmsIssuedPassword: "lms123456",
        });
        enrollments.push(enrollment);

        // Update user's courses array
        await User.findByIdAndUpdate(alex._id, {
            $addToSet: { courses: fullStackCourse._id },
        });

        console.log(`   ✓ Enrolled ${alex.name} in ${fullStackCourse.title}`);
    }

    // Enroll Alex in DSA
    const dsaCourse = courses.find(
        (c) => c.slug === "data-structures-algorithms"
    );
    if (alex && dsaCourse) {
        const enrollment = await Enrollment.create({
            student: alex._id,
            course: dsaCourse._id,
            checkoutDetails: {
                firstName: alex.name,
                lastName: alex.lastName,
                collegeName: alex.collegeName,
                degreeCourseName: alex.courseName,
                yearOfStudy: alex.yearOfStudy,
                email: alex.email,
                phoneNumber: "9876543210",
            },
            paymentStatus: "paid",
            amountPaid: dsaCourse.discountedPrice,
            transactionId: "TXN_ALEX_002",
            completedLessons: [],
            progressPercentage: 10,
        });
        enrollments.push(enrollment);

        // Update user's courses array
        await User.findByIdAndUpdate(alex._id, {
            $addToSet: { courses: dsaCourse._id },
        });

        console.log(`   ✓ Enrolled ${alex.name} in ${dsaCourse.title}`);
    }

    // Enroll Sarah in Full Stack
    const sarah = students.find((s) => s.email === "sarah.connor@example.com");
    if (sarah && fullStackCourse) {
        const enrollment = await Enrollment.create({
            student: sarah._id,
            course: fullStackCourse._id,
            checkoutDetails: {
                firstName: sarah.name,
                lastName: sarah.lastName,
                collegeName: sarah.collegeName,
                degreeCourseName: sarah.courseName,
                yearOfStudy: sarah.yearOfStudy,
                email: sarah.email,
                phoneNumber: "9876543211",
            },
            paymentStatus: "paid",
            amountPaid: fullStackCourse.discountedPrice,
            transactionId: "TXN_SARAH_001",
            completedLessons: [],
            progressPercentage: 85,
        });
        enrollments.push(enrollment);

        // Update user's courses array
        await User.findByIdAndUpdate(sarah._id, {
            $addToSet: { courses: fullStackCourse._id },
        });

        console.log(`   ✓ Enrolled ${sarah.name} in ${fullStackCourse.title}`);
    }

    return enrollments;
};

const seedLeaderboard = async (students, courses) => {
    console.log("🌱 Seeding Leaderboard...");
    await Leaderboard.deleteMany({});

    const studentUsers = students.filter((s) => s.role === "student");

    for (const student of studentUsers) {
        // Global leaderboard entry
        await Leaderboard.create({
            student: student._id,
            type: "global",
            xp: student.xp || 0,
            streak: student.streak || 0,
            hoursLearned: student.hoursLearned || 0,
            quizzesCompleted: student.quizzesCompleted || 0,
            assignmentsCompleted: student.assignmentsCompleted || 0,
        });
        console.log(`   ✓ Added ${student.name} to global leaderboard`);

        // Course leaderboard for Full Stack
        const fullStackCourse = courses.find(
            (c) => c.slug === "full-stack-web-development"
        );
        if (fullStackCourse) {
            await Leaderboard.create({
                student: student._id,
                course: fullStackCourse._id,
                type: "course",
                xp: Math.floor((student.xp || 0) * 0.6),
                streak: student.streak || 0,
                hoursLearned: Math.floor((student.hoursLearned || 0) * 0.6),
                quizzesCompleted: Math.floor(
                    (student.quizzesCompleted || 0) * 0.6
                ),
            });
        }
    }
};

const seedSubmissions = async (students, courses, enrollments) => {
    console.log("🌱 Seeding Submissions...");
    await Submission.deleteMany({});

    const alex = students.find((s) => s.email === "alex.johnson@example.com");
    const fullStackCourse = courses.find(
        (c) => c.slug === "full-stack-web-development"
    );
    const alexEnrollment = enrollments.find(
        (e) =>
            e.student.toString() === alex?._id.toString() &&
            e.course.toString() === fullStackCourse?._id.toString()
    );

    if (alex && fullStackCourse && alexEnrollment) {
        // Quiz submission
        const quizId = fullStackCourse.modules[0]?.quizzes[0]?._id;
        if (quizId) {
            await Submission.create({
                enrollment: alexEnrollment._id,
                student: alex._id,
                course: fullStackCourse._id,
                lessonId: quizId,
                type: "quiz",
                quizScore: 8,
                totalQuestions: 10,
                status: "graded",
            });
            console.log(`   ✓ Created quiz submission for ${alex.name}`);
        }

        // Assignment submission
        const taskId = fullStackCourse.modules[0]?.tasks[0]?._id;
        if (taskId) {
            await Submission.create({
                enrollment: alexEnrollment._id,
                student: alex._id,
                course: fullStackCourse._id,
                lessonId: taskId,
                type: "assignment",
                githubLink: "https://github.com/alexjohnson/landing-page",
                status: "submitted",
            });
            console.log(`   ✓ Created assignment submission for ${alex.name}`);
        }
    }
};

const seedCertificates = async (students, courses) => {
    console.log("🌱 Seeding Certificates...");
    await Certificate.deleteMany({});

    // Give Sarah a certificate for completing a course
    const sarah = students.find((s) => s.email === "sarah.connor@example.com");
    const fullStackCourse = courses.find(
        (c) => c.slug === "full-stack-web-development"
    );

    if (sarah && fullStackCourse) {
        await Certificate.create({
            student: sarah._id,
            course: fullStackCourse._id,
            studentNameSnapshot: `${sarah.name} ${sarah.lastName}`,
            courseNameSnapshot: fullStackCourse.title,
            pdfUrl: "https://example.com/certificates/sarah-fullstack.pdf",
        });
        console.log(`   ✓ Created certificate for ${sarah.name}`);
    }
};

const seedReferrals = async (students) => {
    console.log("🌱 Seeding Referrals...");
    await Referral.deleteMany({});

    const alex = students.find((s) => s.email === "alex.johnson@example.com");
    const john = students.find((s) => s.email === "john.wick@example.com");

    if (alex && john) {
        await Referral.create({
            referrer: alex._id,
            referee: john._id,
            referralCode: alex.myReferralCode,
            credited: true,
        });
        console.log(
            `   ✓ Created referral: ${alex.name} referred ${john.name}`
        );
    }
};

const seedSupportQueries = async (students) => {
    console.log("🌱 Seeding Support Queries...");
    await SupportQuery.deleteMany({});

    const alex = students.find((s) => s.email === "alex.johnson@example.com");

    if (alex) {
        await SupportQuery.create({
            student: alex._id,
            email: alex.email,
            category: "courses",
            message:
                "I am having trouble accessing the React module videos. They keep buffering.",
            status: "open",
            priority: "medium",
        });
        console.log(`   ✓ Created support query for ${alex.name}`);

        await SupportQuery.create({
            student: alex._id,
            email: alex.email,
            category: "certificates",
            message:
                "When will I receive my certificate after completing the course?",
            status: "resolved",
            priority: "low",
            adminResponse:
                "Certificates are issued within 48 hours of course completion.",
            resolvedAt: new Date(),
        });
        console.log(`   ✓ Created resolved support query for ${alex.name}`);
    }
};

// ============================================
// MAIN SEED FUNCTION
// ============================================

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log("\n🚀 Starting database seeding...\n");

        // Seed in order
        const createdUsers = await seedUsers();
        const adminUser = createdUsers.find((u) => u.role === "admin");
        const students = createdUsers.filter((u) => u.role === "student");

        const createdCourses = await seedCourses(adminUser);
        const enrollments = await seedEnrollments(students, createdCourses);

        await seedLeaderboard(students, createdCourses);
        await seedSubmissions(students, createdCourses, enrollments);
        await seedCertificates(students, createdCourses);
        await seedReferrals(students);
        await seedSupportQueries(students);

        console.log("\n✅ Database seeding completed successfully!\n");
        console.log("📋 Summary:");
        console.log(`   • Users: ${createdUsers.length}`);
        console.log(`   • Courses: ${createdCourses.length}`);
        console.log(`   • Enrollments: ${enrollments.length}`);
        console.log("\n🔑 Test Credentials:");
        console.log("   Admin:      admin@code2dbug.com / admin123456");
        console.log("   Student:    alex.johnson@example.com / student123456");
        console.log("   LMS Login:  LMS001 / lmspass123");
        console.log("   Unenrolled: peter.parker@example.com / student123456");
        console.log("");

        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error seeding database:", error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase();
