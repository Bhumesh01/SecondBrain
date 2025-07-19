import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { signup, login } from "../controllers/authControllers";
import { postContent, showContent, getLink, shareLink, deleteContent } from "../controllers/crudControllers";
const router = Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/content", authMiddleware, postContent);
router.get("/content", authMiddleware, showContent);
router.delete("/content", authMiddleware, deleteContent);
router.post("/brain/share", authMiddleware, shareLink);
router.get("/brain/:shareLink", authMiddleware, getLink);

export default router;