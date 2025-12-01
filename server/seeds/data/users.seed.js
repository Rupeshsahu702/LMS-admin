import { faker } from "@faker-js/faker";
import { Student, Admin } from "../../models/index.js";

const colleges = [
    "IIT Delhi",
    "IIT Bombay",
    "NIT Trichy",
    "BITS Pilani",
    "VIT Vellore",
    "Delhi University",
    "Mumbai University",
    "Anna University",
    "Pune University",
    "Manipal Institute of Technology",
    "SRM University",
    "Amity University",
];

const courses = [
    "B.Tech CSE",
    "B.Tech IT",
    "BCA",
    "MCA",
    "B.Sc Computer Science",
    "M.Tech",
    "B.Tech ECE",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year"];

export const seedUsers = async () => {
    // ⭐ SEED ADMIN
    const adminData = {
        email: "admin@example.com",
        password: "Admin@123",
        name: "Admin",
        middleName: faker.person.middleName(),
        lastName: "User",
        phoneNumber: faker.phone.number("+91##########"),
        avatar: faker.image.avatar(),
        lastLogin: faker.date.recent({ days: 1 }),
    };

    const admin = new Admin(adminData);
    await admin.save();
    console.log("✅ 1 admin seeded");

    // ⭐ SEED STUDENTS
    const students = [];

    // Test students with known LMS credentials
    const testStudents = [
        {
            lmsId: "LMS001",
            name: "Test",
            lastName: "Student1",
            email: "student1@example.com",
        },
        {
            lmsId: "LMS002",
            name: "Test",
            lastName: "Student2",
            email: "student2@example.com",
        },
        {
            lmsId: "LMS003",
            name: "Test",
            lastName: "Student3",
            email: "student3@example.com",
        },
    ];

    for (const testStudent of testStudents) {
        students.push({
            ...testStudent,
            lmsPassword: "Lms@123",
            phoneNumber: faker.phone.number("+91##########"),
            collegeName: faker.helpers.arrayElement(colleges),
            courseName: faker.helpers.arrayElement(courses),
            yearOfStudy: faker.helpers.arrayElement(years),
            avatar: faker.image.avatar(),
            accountStatus: "verified",
            xp: faker.number.int({ min: 100, max: 1000 }),
            streak: faker.number.int({ min: 1, max: 30 }),
            hoursLearned: faker.number.int({ min: 10, max: 100 }),
            lastLogin: faker.date.recent({ days: 7 }),
        });
    }

    // Random students
    const randomStudentCount = faker.number.int({ min: 15, max: 25 });

    for (let i = 0; i < randomStudentCount; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const accountStatus = faker.helpers.arrayElement([
            "pending",
            "verified",
            "verified",
            "verified",
            "blocked",
        ]);

        students.push({
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            name: firstName,
            middleName: faker.helpers.maybe(() => faker.person.middleName(), {
                probability: 0.4,
            }),
            lastName,
            phoneNumber: faker.phone.number("+91##########"),
            alternatePhone: faker.helpers.maybe(
                () => faker.phone.number("+91##########"),
                { probability: 0.2 }
            ),
            collegeName: faker.helpers.arrayElement(colleges),
            courseName: faker.helpers.arrayElement(courses),
            yearOfStudy: faker.helpers.arrayElement(years),
            avatar: faker.helpers.maybe(() => faker.image.avatar(), {
                probability: 0.6,
            }),
            linkedin: faker.helpers.maybe(
                () => `https://linkedin.com/in/${faker.internet.username()}`,
                { probability: 0.7 }
            ),
            github: faker.helpers.maybe(
                () => `https://github.com/${faker.internet.username()}`,
                { probability: 0.5 }
            ),
            portfolio: faker.helpers.maybe(() => faker.internet.url(), {
                probability: 0.3,
            }),
            isProfileLocked: faker.datatype.boolean(0.1),
            xp: faker.number.int({ min: 0, max: 3000 }),
            streak: faker.number.int({ min: 0, max: 50 }),
            lastStreakDate: faker.helpers.maybe(
                () => faker.date.recent({ days: 30 }),
                { probability: 0.8 }
            ),
            hoursLearned: faker.number.int({ min: 0, max: 200 }),
            quizzesCompleted: faker.number.int({ min: 0, max: 50 }),
            assignmentsCompleted: faker.number.int({ min: 0, max: 30 }),
            accountStatus,
            lmsId: `LMS${faker.string.alphanumeric(8).toUpperCase()}`,
            lmsPassword: "Lms@123",
            referredBy: faker.helpers.maybe(
                () => `REFER-${faker.string.alphanumeric(4).toUpperCase()}`,
                { probability: 0.3 }
            ),
            referralCount: faker.number.int({ min: 0, max: 10 }),
            isPremiumUnlocked: faker.datatype.boolean(0.2),
            lastLogin:
                accountStatus === "verified"
                    ? faker.date.recent({ days: 30 })
                    : undefined,
        });
    }

    // Google OAuth students
    const googleStudentCount = faker.number.int({ min: 5, max: 10 });

    for (let i = 0; i < googleStudentCount; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        students.push({
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            googleId: faker.string.numeric(21),
            name: firstName,
            lastName,
            avatar: faker.image.avatar(),
            phoneNumber: faker.helpers.maybe(
                () => faker.phone.number("+91##########"),
                { probability: 0.5 }
            ),
            collegeName: faker.helpers.arrayElement(colleges),
            courseName: faker.helpers.arrayElement(courses),
            yearOfStudy: faker.helpers.arrayElement(years),
            linkedin: faker.helpers.maybe(
                () => `https://linkedin.com/in/${faker.internet.username()}`,
                { probability: 0.6 }
            ),
            github: faker.helpers.maybe(
                () => `https://github.com/${faker.internet.username()}`,
                { probability: 0.4 }
            ),
            xp: faker.number.int({ min: 0, max: 2000 }),
            streak: faker.number.int({ min: 0, max: 30 }),
            hoursLearned: faker.number.int({ min: 0, max: 150 }),
            quizzesCompleted: faker.number.int({ min: 0, max: 40 }),
            assignmentsCompleted: faker.number.int({ min: 0, max: 25 }),
            accountStatus: "verified",
            isPremiumUnlocked: faker.datatype.boolean(0.15),
            lastLogin: faker.date.recent({ days: 15 }),
        });
    }

    // GitHub OAuth students
    const githubStudentCount = faker.number.int({ min: 3, max: 5 });

    for (let i = 0; i < githubStudentCount; i++) {
        const firstName = faker.person.firstName();
        const username = faker.internet.username({ firstName });

        students.push({
            email: faker.internet.email({ firstName }).toLowerCase(),
            githubId: faker.string.numeric(8),
            name: firstName,
            avatar: `https://github.com/${username}.png`,
            github: `https://github.com/${username}`,
            collegeName: faker.helpers.arrayElement(colleges),
            courseName: faker.helpers.arrayElement(courses),
            yearOfStudy: faker.helpers.arrayElement(years),
            xp: faker.number.int({ min: 0, max: 1500 }),
            streak: faker.number.int({ min: 0, max: 25 }),
            hoursLearned: faker.number.int({ min: 0, max: 100 }),
            accountStatus: "verified",
            lastLogin: faker.date.recent({ days: 10 }),
        });
    }

    // Save all students
    let savedCount = 0;
    for (const data of students) {
        const doc = new Student(data);
        await doc.save();
        savedCount++;
    }

    console.log(
        `✅ ${savedCount} students seeded (3 test + ${randomStudentCount} random + ${googleStudentCount} Google + ${githubStudentCount} GitHub)`
    );

    // Print test credentials
    console.log("\n📋 Test Credentials:");
    console.log("   Admin: admin@example.com / Admin@123");
    console.log("   LMS: LMS001, LMS002, LMS003 / Lms@123");
};
