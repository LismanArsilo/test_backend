import { Router } from "express";
import indexCtrl from "../controllers/index.js";

const router = Router();

router.post("/", indexCtrl.incomesCtrl.countIncomeEmployee);

export default router;
