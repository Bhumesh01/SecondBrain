import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { signup, login } from "../controllers/authControllers";
import { postContent, showContent, getLink, shareLink, deleteContent, getContentByType } from "../controllers/crudControllers";
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
router.get("/content/:id", authMiddleware,  (req, res, next) => {
    console.log("CONTENT TYPE ROUTE HIT");
    next();
},getContentByType);

export default router;