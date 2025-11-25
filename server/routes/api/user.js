import express from "express";
import { UserController } from "../../controllers/index.js";
import { StudentEnrollmentValidation } from "../../validation/index.js";

const router = express.Router();

router.post(
    "/student-enrollment",
    StudentEnrollmentValidation.validateEnrollment,
    UserController.createEnrollment
);

export default router;
