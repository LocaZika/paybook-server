import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

/* GET users */
router.get("/", userController.index);
router.get("/?id=:id", userController.get);
/* POST expense */
router.post("/", userController.addExpense);

/* PATCH expense */
router.patch("/", userController.updateExpense);

/* Remove expense */
router.delete("/", userController.removeExpense);

export default router;
