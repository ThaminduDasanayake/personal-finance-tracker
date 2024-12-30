import { Request, Response } from "express";
import ExpenseModel from "../schema/expense.model";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const expenses = await ExpenseModel.find({ userId: userId });
    if (expenses.length === 0) {
      res.status(404).send("No expenses found for the user.");
      return;
    }
    res.status(200).send(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const getSingleExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const expense = await ExpenseModel.findOne({ userId: userId, _id: id });
    if (!expense) {
      res.status(404).send("No expense found for the user.");
      return;
    }
    res.status(200).send(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const newExpense = req.body;
    const expense = await ExpenseModel.create(newExpense);
    res.status(200).send(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newExpense = req.body;
    const expense = await ExpenseModel.findByIdAndUpdate(id, newExpense, {
      new: true,
    });
    if (!expense) {
      res.status(404).send();
      return;
    }
    res.status(200).send(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const expense = await ExpenseModel.findByIdAndDelete(id);
    if (!expense) {
      res.status(404).send();
      return;
    }
    res.status(200).send(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
