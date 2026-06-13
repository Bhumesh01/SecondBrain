import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { signup, login } from "../controllers/authControllers";
import { postContent, showContent, getLink, shareLink, deleteContent, getContentByType, getSemanticSearch } from "../controllers/crudControllers";
const router = Router();

router.get("/", (req, res)=>{
    res.send("Backend is Running")
})
router.post("/signup", signup);
router.post("/signin", login);
router.post("/content", authMiddleware, postContent);
router.get("/content", authMiddleware, showContent);
router.delete("/content/:contentId", authMiddleware, deleteContent);
router.post("/brain/share", authMiddleware, shareLink);
router.get("/brain/:shareLink", getLink);
router.get("/content/:id", authMiddleware, getContentByType);
router.post("/content/search", authMiddleware, getSemanticSearch);
// router.post("/content/test", authMiddleware, migrate);
export default router;