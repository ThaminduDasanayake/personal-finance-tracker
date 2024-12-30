import { Request, Response } from "express";
import IncomeModel from "../schema/income.model";

export const getIncomes = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const incomes = await IncomeModel.find({ userId: userId });
    if (incomes.length === 0) {
      res.status(404).send("No incomes found for the user.");
      return;
    }
    res.status(200).send(incomes);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const getSingleIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const income = await IncomeModel.findOne({ userId: userId, _id: id });
    if (!income) {
      res.status(404).send("No income found for the user.");
      return;
    }
    res.status(200).send(income);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const addIncome = async (req: Request, res: Response) => {
  try {
    const newIncome = req.body;
    const income = await IncomeModel.create(newIncome);
    res.status(200).send(income);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const updateIncome = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newIncome = req.body;
    const income = await IncomeModel.findByIdAndUpdate(id, newIncome, {
      new: true,
    });
    if (!income) {
      res.status(404).send();
      return;
    }
    res.status(200).send(income);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const income = await IncomeModel.findByIdAndDelete(id);
    if (!income) {
      res.status(404).send();
      return;
    }
    res.status(200).send(income);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
