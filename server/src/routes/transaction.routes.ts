import express from "express";
import {
  getIncomes,
  getSingleIncome,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller";
import {
  getExpenses,
  getSingleExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller";

const router = express.Router();

router.get("/getIncomes/:userId", getIncomes);
router.get("/getSingleIncome/:userId/:id", getSingleIncome);
router.post("/addIncome", addIncome);
router.put("/updateIncome/:id", updateIncome);
router.delete("/deleteIncome/:id", deleteIncome);

router.get("/getExpenses/:userId", getExpenses);
router.get("/getSingleExpense/:userId/:id", getSingleExpense);
router.post("/addExpense", addExpense);
router.put("/updateExpense/:id", updateExpense);
router.delete("/deleteExpense/:id", deleteExpense);

export default router;
