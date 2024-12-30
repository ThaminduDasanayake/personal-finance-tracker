import mongoose from "mongoose";

interface Expense {
  userId: string;
  description: string;
  amount: number;
  type: string;
  date: Date;
  category: string;
  paymentMethod: string;
}

const expenseSchema = new mongoose.Schema<Expense>(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      default: "Expense",
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ExpenseModel = mongoose.model<Expense>("Expense", expenseSchema);

export default ExpenseModel;
