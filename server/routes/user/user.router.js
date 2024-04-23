import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

/* GET users */
router.get('/', userController.index);
router.get('/?id=:id', userController.get);
/* POST users */
router.post('/', userController.post);

/* PATCH users */
router.patch('/', userController.patch);

export default router;