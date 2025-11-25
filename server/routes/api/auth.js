import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
    failureMessage: true,
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.OAUTH_SECRET,
        { expiresIn: "7d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      console.error("Google login error:", error);
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email", "read:user"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/",
    failureMessage: true,
  }),

  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.OAUTH_SECRET,
        { expiresIn: "7d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      console.error("Github login error:", error);
    }
  }
);


router.get("/me", isAuthenticated, (req, res) => {
  res.json({ success: true, user: req.user });
});
export default router;
